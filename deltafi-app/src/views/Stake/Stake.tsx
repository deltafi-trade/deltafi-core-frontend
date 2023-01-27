import { ReactElement, useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import clx from "classnames";
import {
  Snackbar,
  SnackbarContent,
  Box,
  Typography,
  Paper,
  Button as MUIButton,
  IconButton,
  Link,
  Container,
  Avatar,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import BigNumber from "bignumber.js";

import StakeCard from "views/Stake/components/Card";
import { StakeCard as IStakeCard } from "views/Stake/components/types";
import Page from "components/layout/Page";
import { ConnectButton, LinkIcon } from "components";

import useStyles from "./styles";
import { useModal } from "providers/modal";
import { sendSignedTransaction, claim, stake, unstake } from "utils/transactions";
import { exponentiate, exponentiatedBy } from "utils/decimal";
import { DELTAFI_TOKEN_MINT, SOLSCAN_LINK, DELTAFI_TOKEN_DECIMALS } from "constants/index";
import { useCustomConnection } from "providers/connection";
import Slider from "./components/Slider";
import loadingIcon from "components/gif/loading_white.gif";
import { useSelector, useDispatch } from "react-redux";
import {
  appSelector,
  selectFarmUserByFarmPoolKey,
  selectFarmPoolByFarmPoolKey,
  selectTokenAccountInfoByMint,
} from "states/selectors";
import { toFarmUserPosition, fetchFarmUsersThunk } from "states/farmUserState";
import { fecthTokenAccountInfoList } from "states/tokenAccountState";
import {
  getPoolConfigByFarmPoolKey,
  getTokenConfigByMint,
  getTokenConfigBySymbol,
  lpTokenConfigs,
  marketConfig,
} from "constants/deployConfig";

interface TransactionResult {
  status: boolean | null;
  action?: "stake" | "unstake" | "claim";
  hash?: string;
  stake?: IStakeCard;
}

const SECONDS_OF_YEAR = 31556926;

const getUnclaimedReward = (
  apr: BigNumber,
  lastUpdateTs: BigNumber,
  nextClaimTs: BigNumber,
  rewardsOwed: BigNumber,
  rewardEstimated: BigNumber,
  depositBalance: BigNumber,
  deltafiTokenDecimals: number,
) => {
  const currentTs: BigNumber = new BigNumber(Date.now()).div(new BigNumber(1000));
  if (currentTs <= nextClaimTs) {
    return exponentiatedBy(rewardsOwed, deltafiTokenDecimals);
  }
  const unTrackedReward: BigNumber = currentTs
    .minus(lastUpdateTs)
    .div(new BigNumber(SECONDS_OF_YEAR))
    .multipliedBy(depositBalance)
    .multipliedBy(apr);

  return exponentiatedBy(
    unTrackedReward.plus(rewardsOwed).plus(rewardEstimated),
    deltafiTokenDecimals,
  );
};

const Stake = (): ReactElement => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();

  const appState = useSelector(appSelector);

  const farmPoolId = location.pathname.split("/").pop();
  const farmPool = useSelector(selectFarmPoolByFarmPoolKey(farmPoolId));

  const { baseTokenInfo, quoteTokenInfo } = useMemo(() => {
    const poolConfig = getPoolConfigByFarmPoolKey(farmPoolId);
    const baseTokenInfo = getTokenConfigBySymbol(poolConfig.base);
    const quoteTokenInfo = getTokenConfigBySymbol(poolConfig.quote);
    return {
      baseTokenInfo,
      quoteTokenInfo,
    };
  }, [farmPoolId]);

  const farmUserFlat = useSelector(selectFarmUserByFarmPoolKey(farmPoolId));
  const farmUser = toFarmUserPosition(farmUserFlat);

  const { connected: isConnectedWallet, publicKey: walletPubkey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { network } = useCustomConnection();
  const token = getTokenConfigBySymbol(farmPool?.name);
  const tokenAccount = useSelector(selectTokenAccountInfoByMint(token?.mint));

  const [isProcessingStake, setIsProcessingStake] = useState(false);
  const [isProcessingClaim, setIsProcessingClaim] = useState(false);

  const { setMenu } = useModal();
  const [state, setState] = useState<{
    open: boolean;
    vertical: "bottom" | "top";
    horizontal: "left" | "center" | "right";
  }>({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });

  const config = marketConfig;
  const lpToken = useSelector(selectTokenAccountInfoByMint(farmPool?.poolMintKey.toBase58()));
  const lpTokenConfig = getTokenConfigByMint(farmPool?.poolMintKey.toBase58());

  const rewardsAccount = useSelector(selectTokenAccountInfoByMint(DELTAFI_TOKEN_MINT.toBase58()));
  const [transactionResult, setTransactionResult] = useState<TransactionResult>({
    status: null,
  });

  const tokenBalance = useMemo(() => {
    return tokenAccount ? exponentiatedBy(tokenAccount.amount, token.decimals) : new BigNumber(0);
  }, [tokenAccount, token]);

  const totalStaked = useMemo(() => {
    return farmPool && lpTokenConfig
      ? exponentiatedBy(farmPool.reservedAmount.toString(), lpTokenConfig.decimals)
      : new BigNumber(0);
  }, [farmPool, lpTokenConfig]);

  let position = farmUser?.positions[farmPoolId];
  const apr = new BigNumber(farmPool?.aprNumerator.toString()).div(
    new BigNumber(farmPool?.aprDenominator.toString()),
  );
  const depositAmount = useMemo(() => {
    return position && lpTokenConfig
      ? exponentiatedBy(position.depositBalance, lpTokenConfig.decimals)
      : new BigNumber(0);
  }, [position, lpTokenConfig]);

  const [staking, setStaking] = useState({
    isStake: true,
    token: token,
    balance: tokenBalance,
    amount: "",
    percentage: 0,
  });

  const percentage = staking.percentage;
  const setStakePercentage = useCallback(
    (percentage: number) => {
      const realAmount = staking.balance
        .multipliedBy(new BigNumber(percentage))
        .dividedBy(new BigNumber(100));
      const amount = realAmount.toNumber() < 1e-6 ? "0.000000" : realAmount.toString();
      setStaking({ ...staking, percentage, amount });
    },
    [setStaking, staking],
  );

  const setStakeAmount = useCallback(
    (value: string) => {
      let percentage = new BigNumber(0);
      let amount = value !== "" ? value : "0";
      if (staking.balance) {
        percentage = new BigNumber(amount).multipliedBy(100).dividedBy(staking.balance);
        if (percentage === new BigNumber(NaN)) {
          percentage = new BigNumber(0);
        } else if (percentage.comparedTo(new BigNumber(100)) > 0) {
          percentage = new BigNumber(100);
          amount = staking.balance.toString();
        }
      }
      setStaking({ ...staking, percentage: Number(percentage.toFixed(2)), amount });
    },
    [setStaking, staking],
  );

  useEffect(() => {
    const balance = staking.balance;
    if (staking.isStake) {
      if (balance === null || balance.toString() !== tokenBalance.toString()) {
        setStaking({ ...staking, balance: tokenBalance });
      }
    } else {
      if (balance == null || balance.toString() !== depositAmount.toString()) {
        setStaking({ ...staking, balance: depositAmount });
      }
    }
  }, [staking, tokenBalance, depositAmount]);

  const unclaimedReward = (() => {
    if (position) {
      return getUnclaimedReward(
        apr,
        position.lastUpdateTs,
        position.nextClaimTs,
        position.rewardsOwed,
        position.rewardEstimated,
        position.depositBalance,
        DELTAFI_TOKEN_DECIMALS,
      );
    }
    return new BigNumber(0);
  })();

  const poolRateByDay = useMemo(() => {
    if (farmPool && totalStaked && token) {
      return exponentiatedBy(
        exponentiate(totalStaked.multipliedBy(apr).dividedBy(365), token.decimals),
        DELTAFI_TOKEN_DECIMALS,
      ).toFixed(6);
    }
    return "--";
  }, [farmPool, totalStaked, apr, token]);

  const rewardRateByDay = useMemo(() => {
    if (depositAmount && token) {
      return exponentiatedBy(
        exponentiate(depositAmount.multipliedBy(apr).dividedBy(365), token.decimals),
        DELTAFI_TOKEN_DECIMALS,
      ).toFixed(6);
    }
    return "--";
  }, [depositAmount, apr, token]);

  const handleSwitchMethod = (method: "stake" | "unstake") => {
    setStaking((staking) => ({
      ...staking,
      isStake: method === "stake" ? true : false,
      balance: method === "stake" ? tokenBalance : depositAmount,
      amount: "0",
      percentage: 0,
    }));
  };

  const handleStake = useCallback(async () => {
    if (!connection || !farmPool || !walletPubkey || !lpTokenConfig || !lpToken) {
      return null;
    }
    if (staking.isStake) {
      if (staking.amount === "" || new BigNumber(lpToken.amount).lt(staking.amount)) {
        return null;
      }

      setIsProcessingStake(true);
      try {
        const transaction = await stake({
          connection,
          walletPubkey,
          config,
          farmPool,
          farmUser: farmUser?.publicKey,
          poolTokenAccount: lpToken,
          stakeData: {
            amount: BigInt(
              exponentiate(staking.amount, lpTokenConfig.decimals).integerValue().toString(),
            ),
          },
        });

        const signedTransaction = await signTransaction(transaction);
        const hash = await sendSignedTransaction({
          signedTransaction,
          connection,
        });

        await connection.confirmTransaction(hash, "confirmed");

        await fecthTokenAccountInfoList(
          [farmPool?.poolMintKey.toBase58()],
          walletPubkey,
          connection,
          dispatch,
        );
        setStaking((prevStaking) => ({
          ...prevStaking,
          amount: "0",
          percentage: 0,
        }));
        setTransactionResult({
          status: true,
          action: "stake",
          hash,
          stake: staking,
        });
      } catch (e) {
        setStaking((prevStaking) => ({
          ...prevStaking,
          amount: "0",
          percentage: 0,
        }));
      } finally {
        setState((state) => ({ ...state, open: true }));
        setIsProcessingStake(false);
        dispatch(
          fetchFarmUsersThunk({
            connection,
            walletAddress: walletPubkey,
          }),
        );
      }
    } else {
      if (staking.amount === "" || !position || depositAmount.lt(staking.amount)) {
        return null;
      }

      setIsProcessingStake(true);
      try {
        const transaction = await unstake({
          connection,
          walletPubkey,
          config,
          farmPool,
          farmUser: farmUser?.publicKey,
          poolTokenAccount: lpToken,
          unstakeData: {
            amount: BigInt(
              exponentiate(staking.amount, lpTokenConfig.decimals).integerValue().toString(),
            ),
          },
        });

        const signedTransaction = await signTransaction(transaction);
        const hash = await sendSignedTransaction({
          signedTransaction,
          connection,
        });

        await connection.confirmTransaction(hash, "confirmed");
        await fecthTokenAccountInfoList(
          [farmPool?.poolMintKey.toBase58()],
          walletPubkey,
          connection,
          dispatch,
        );
        setStaking((prevStaking) => ({
          ...prevStaking,
          amount: "0",
          percentage: 0,
        }));
        setTransactionResult({
          status: true,
          action: "unstake",
          hash,
          stake: staking,
        });
      } catch (e) {
        setStaking((prevStaking) => ({
          ...prevStaking,
          amount: "0",
          percentage: 0,
        }));
        setTransactionResult({ status: false });
      } finally {
        setState((state) => ({ ...state, open: true }));
        setIsProcessingStake(false);
        dispatch(
          fetchFarmUsersThunk({
            connection,
            walletAddress: walletPubkey,
          }),
        );
      }
    }
  }, [
    connection,
    walletPubkey,
    config,
    farmPool,
    farmUser,
    staking,
    lpTokenConfig,
    lpToken,
    signTransaction,
    position,
    depositAmount,
    dispatch,
  ]);

  const handleClaim = useCallback(async () => {
    if (!connection || !farmPool || !walletPubkey || !lpTokenConfig || !lpToken) {
      return null;
    }

    const referrerPubkey = appState.referrerPublicKey;
    const enableReferral = appState.enableReferral;

    setIsProcessingClaim(true);
    try {
      const transaction = await claim({
        connection,
        config,
        walletPubkey,
        farmPool,
        farmUser: farmUser.publicKey,
        claimDestination: rewardsAccount?.publicKey,
        referrer: referrerPubkey,
        enableReferral,
      });
      const signedTransaction = await signTransaction(transaction);

      const hash = await sendSignedTransaction({
        signedTransaction,
        connection,
      });

      await connection.confirmTransaction(hash, "confirmed");
      await fecthTokenAccountInfoList(
        [DELTAFI_TOKEN_MINT.toBase58()],
        walletPubkey,
        connection,
        dispatch,
      );
      setTransactionResult({
        status: true,
        action: "claim",
        hash,
      });
    } catch (e) {
      setTransactionResult({ status: false });
    } finally {
      setState((state) => ({ ...state, open: true }));
      setIsProcessingClaim(false);
      dispatch(
        fetchFarmUsersThunk({
          connection,
          walletAddress: walletPubkey,
        }),
      );
    }
  }, [
    config,
    connection,
    farmPool,
    farmUser,
    lpTokenConfig,
    lpToken,
    signTransaction,
    walletPubkey,
    rewardsAccount,
    dispatch,
    appState,
  ]);

  const handleSnackBarClose = useCallback(() => {
    setState((state) => ({ ...state, open: false }));
  }, []);

  const snackAction = useMemo(() => {
    return (
      <IconButton size="small" onClick={handleSnackBarClose} className={classes.snackBarClose}>
        <CloseIcon />
      </IconButton>
    );
  }, [handleSnackBarClose, classes]);

  const snackMessasge = useMemo(() => {
    if (!transactionResult.status) {
      return (
        <Box display="flex" alignItems="center">
          <img
            src={"/images/snack-fail.svg"}
            alt="snack-status-icon"
            className={classes.snackBarIcon}
          />
          <Box>
            <Typography variant="h6" color="primary">
              Transaction failed(try again later)
            </Typography>
            <Box>
              <Typography variant="body1" color="primary">
                failed to send transaction: Transaction simulation failed: Blockhash not found
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }

    const { hash, action, stake } = transactionResult;

    return (
      <Box display="flex" alignItems="center">
        <img
          src={"/images/snack-success.svg"}
          alt="snack-status-icon"
          className={classes.snackBarIcon}
        />
        <Box>
          {stake && (
            <Typography variant="body1" color="primary">
              {`${action.charAt(0).toUpperCase() + action.slice(1)} ${Number(stake?.amount).toFixed(
                6,
              )} ${stake.token.symbol} LP`}
            </Typography>
          )}
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary">
              View Transaction:
            </Typography>
            <Link
              className={classes.snackBarLink}
              target="_blank"
              href={`${SOLSCAN_LINK}/tx/${hash}?cluster=${network}`}
            >
              {hash.slice(0, 7) + "..." + hash.slice(-7)}
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }, [transactionResult, classes, network]);

  if (!farmPool) return null;

  const { vertical, horizontal, open } = state;

  return (
    <Page>
      <Container className={classes.root}>
        <Box display="flex" justifyContent="space-between" pb={2}>
          <Typography variant="h6">{farmPool.name} LP Token Staking</Typography>
          <Box className={classes.iconGroup}>
            <img
              src={baseTokenInfo.logoURI}
              alt="staking-coin"
              className={clx(classes.coinIcon, classes.firstCoin)}
            />
            <img src={quoteTokenInfo.logoURI} alt="earning-coin" className={classes.coinIcon} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" pb={4}>
          <Box>
            <Typography>Total Staked</Typography>
            <Typography>{`${totalStaked.toFixed(2).toString()} ${farmPool.name}`}</Typography>
          </Box>
          <Box>
            <Typography>Pool Rate</Typography>
            <Typography>{poolRateByDay} DELFI / day</Typography>
          </Box>
        </Box>

        {isConnectedWallet && (
          <Box className={classes.desc}>
            <Typography variant="h6" paragraph>
              About {farmPool.name} LP Tokens
            </Typography>
            <Typography variant="subtitle2">
              LP tokens represents a share of the liquidity provided to a swap pool. You may obtain{" "}
              {farmPool.name} LP tokens by depositing {farmPool.name.split("-")[0]} and{" "}
              {farmPool.name.split("-")[1]} into the {farmPool.name} pool.
            </Typography>
            <Box display="flex" alignItems="center" mt={3}>
              <Link
                href={"/deposit/" + farmPool?.poolAddress.toBase58()}
                target="_blank"
                rel="noreferrer noopener"
                underline="always"
                className={classes.link}
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Farms, target: DELFI"
              >
                Deposit into the {farmPool.name} Pool
                <LinkIcon className={classes.linkIcon} isDark width="15px" />
              </Link>
            </Box>
          </Box>
        )}

        <Box className={classes.liquidityStaked}>
          <Typography className={classes.title}>Your Liquidity Staked</Typography>
          <Box className={classes.cardBottom}>
            <Typography className={classes.amount}>{depositAmount.toString()}</Typography>
            <Typography className={classes.amount}>{farmPool.name}</Typography>
          </Box>
          <Box className={classes.cardBottom}>
            <Typography className={classes.amount}>{rewardRateByDay} / Day</Typography>
            <Typography className={classes.amount}>DELFI</Typography>
          </Box>
        </Box>
        <Box className={classes.unclaimedToken}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography className={classes.title}>Your Unclaimed Token</Typography>
            {isProcessingClaim ? (
              <ConnectButton variant="contained" disabled={true}>
                <Avatar className={classes.claimLoadingButton} src={loadingIcon} />
              </ConnectButton>
            ) : (
              <ConnectButton
                variant="contained"
                onClick={handleClaim}
                disabled={!unclaimedReward.gt(0)}
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Farms, target: Claim"
              >
                CLAIM
              </ConnectButton>
            )}
          </Box>
          <Box className={classes.cardBottom}>
            <Typography className={classes.amount}>
              {unclaimedReward.toFixed(DELTAFI_TOKEN_DECIMALS)}
            </Typography>
          </Box>
        </Box>
        <Paper className={classes.minting}>
          <Box className={classes.ratePanel}>
            <Typography color="primary" variant="body1" className={classes.marketCondition}>
              LIQUIDITY MINING
            </Typography>
            <div className={classes.divider} />
            <Box className={classes.tabs}>
              <Box>
                <MUIButton
                  className={staking.isStake ? classes.activeBtn : classes.btn}
                  onClick={() => handleSwitchMethod("stake")}
                >
                  Stake
                </MUIButton>
                &nbsp;
                <MUIButton
                  className={!staking.isStake ? classes.activeBtn : classes.btn}
                  onClick={() => handleSwitchMethod("unstake")}
                >
                  Unstake
                </MUIButton>
              </Box>
            </Box>
          </Box>
          <Box mb={1}>
            <Slider value={percentage} onChange={setStakePercentage} />
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <StakeCard
              card={staking}
              handleChangeCard={setStakeAmount}
              tokens={lpTokenConfigs}
              disableDrop
              percentage={percentage < 0.02 ? 0 : percentage}
            />
          </Box>
          <Box marginTop={2} width="100%">
            {isProcessingStake ? (
              <ConnectButton size="large" fullWidth variant="contained" disabled={true}>
                <Avatar className={classes.actionLoadingButton} src={loadingIcon} />
              </ConnectButton>
            ) : isConnectedWallet ? (
              <ConnectButton
                fullWidth
                size="large"
                variant="contained"
                onClick={handleStake}
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Deposit, target: Deposit"
              >
                {staking.isStake ? "Stake" : "Unstake"}
              </ConnectButton>
            ) : (
              <ConnectButton size="large" fullWidth onClick={() => setMenu(true, "connect")}>
                Connect Wallet
              </ConnectButton>
            )}
          </Box>
        </Paper>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleSnackBarClose}
        key={vertical + horizontal}
      >
        <SnackbarContent
          aria-describedby="message-id2"
          className={classes.snackBarContent}
          message={snackMessasge}
          action={snackAction}
        />
      </Snackbar>
    </Page>
  );
};

export default Stake;
