import React, { useCallback, useMemo, useState } from "react";
import ReactCardFlip from "react-card-flip";
import {
  Typography,
  IconButton,
  makeStyles,
  Theme,
  Paper,
  Container,
  Box,
  Fab,
  Snackbar,
  SnackbarContent,
  Link,
  Avatar,
} from "@material-ui/core";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import SettingsIcon from "@material-ui/icons/Settings";
import SyncAlt from "@material-ui/icons/SyncAlt";
import CloseIcon from "@material-ui/icons/Close";

import Page from "components/layout/Page";
import { ConnectButton } from "components";
import SettingsPanel from "components/SettingsPanel/SettingsPanel";
import SwapCard from "./components/Card";
import { useModal } from "providers/modal";
import { exponentiate, exponentiatedBy } from "utils/decimal";
import { swap_v2 } from "utils/transactions/swap_v2";
import { DELTAFI_TOKEN_MINT, MARKET_CONFIG_ADDRESS, SOLSCAN_LINK } from "constants/index";
import { SWAP_DIRECTION } from "lib/instructions";
import { sendSignedTransaction } from "utils/transactions";
import { getSwapOutAmount } from "utils/swap";
import { SwapCard as ISwapCard } from "./components/types";
import { useCustomConnection } from "providers/connection";
import { SwapType } from "lib/state";
import loadingIcon from "components/gif/loading_white.gif";
import { PublicKey } from "@solana/web3.js";
import { useSelector, useDispatch } from "react-redux";
import {
  appSelector,
  selectPoolBySymbols,
  selectMarketPriceByPool,
  selectTokenAccountInfoByMint,
} from "states/selectors";
import { fetchPoolsThunk } from "states/poolState";
import { fetchReferrerThunk } from "states/appState";
import { fecthTokenAccountInfoList } from "states/tokenAccountState";
import {
  getTokenConfigBySymbol,
  marketConfig,
  poolConfigs,
  tokenConfigs,
} from "constants/deployConfig";
import BigNumber from "bignumber.js";
import { getTokenBalanceDiffFromTransaction } from "utils/transactions/utils";

interface TransactionResult {
  status: boolean | null;
  signature?: string;
  base?: ISwapCard;
  quote?: ISwapCard;
}

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  container: {
    maxWidth: 550,
    margin: "0 auto",
    flex: 1,
  },
  title: {
    textAlign: "start",
    marginBottom: spacing(4),
  },
  root: {
    background: palette.background.primary,
    borderRadius: spacing(2),
    padding: `${spacing(3)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(5)}px ${spacing(4)}px`,
      borderRadius: spacing(3),
    },
  },
  swapIcon: {
    transform: "rotate(90deg)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -16,
    marginBottom: -16,
    backgroundColor: palette.background.secondary,
    border: `3px solid ${palette.background.primary}`,
  },
  ratePanel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing(2.5),
    [breakpoints.up("sm")]: {
      marginBottom: spacing(3.5),
    },
  },
  marketCondition: {
    fontWeight: "bold",
  },
  snackBarContent: {
    maxWidth: 421,
    backgroundColor: palette.background.lightBlack,
    display: "flex",
    flexWrap: "unset",
    alignItems: "start",
  },
  snackBarLink: {
    color: palette.text.blue,
    cursor: "pointer",
    textDecoration: "none !important",
    marginLeft: spacing(1),
  },
  snackBarClose: {
    marginTop: 5,
  },
  snackBarIcon: {
    marginRight: spacing(2),
  },
  actionLoadingButton: {
    width: 50,
    height: 50,
    marginTop: 4,
    marginBottom: 4,
  },
}));

function getPossibleTokenToConfigs(tokenFrom: ISwapCard) {
  const possibleTokenToConfigs = [];
  for (const poolConfig of poolConfigs) {
    const { base, quote } = poolConfig;
    if (base === tokenFrom.token.symbol) {
      possibleTokenToConfigs.push(getTokenConfigBySymbol(quote));
    }
    if (quote === tokenFrom.token.symbol) {
      possibleTokenToConfigs.push(getTokenConfigBySymbol(base));
    }
  }
  return possibleTokenToConfigs;
}

const Home: React.FC = (props) => {
  const dispatch = useDispatch();
  const appState = useSelector(appSelector);

  const classes = useStyles(props);
  const { connected: isConnectedWallet, publicKey: walletPubkey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [tokenFrom, setTokenFrom] = useState<ISwapCard>({
    token: getTokenConfigBySymbol("SOL"),
    amount: "",
    amountWithSlippage: "",
  });
  const [tokenTo, setTokenTo] = useState<ISwapCard>({
    token: getTokenConfigBySymbol("USDC"),
    amount: "",
    amountWithSlippage: "",
  });
  const config = marketConfig;

  const pool = useSelector(selectPoolBySymbols(tokenFrom.token.symbol, tokenTo.token.symbol));

  const sourceAccount = useSelector(selectTokenAccountInfoByMint(tokenFrom.token.mint));
  const destinationAccount = useSelector(selectTokenAccountInfoByMint(tokenTo.token.mint));

  const sourceBalance = useMemo(() => {
    if (sourceAccount && tokenFrom) {
      return exponentiatedBy(sourceAccount.amount, tokenFrom.token.decimals);
    }
    return null;
  }, [sourceAccount, tokenFrom]);

  const rewardsAccount = useSelector(selectTokenAccountInfoByMint(DELTAFI_TOKEN_MINT.toBase58()));

  const [isProcessing, setIsProcessing] = useState(false);
  const [priceImpact, setPriceImpact] = useState("2.0");
  const [isIncludeDecimal, setIsIncludeDecimal] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const { setMenu } = useModal();

  const { marketPrice, basePrice, quotePrice } = useSelector(selectMarketPriceByPool(pool));

  const exchangeRateLabel = useMemo(() => {
    if (basePrice && quotePrice && pool) {
      if (tokenFrom.token.symbol === pool?.baseTokenInfo.symbol) {
        return Number(basePrice / quotePrice).toFixed(pool.quoteTokenInfo.decimals);
      } else if (tokenFrom.token.symbol === pool?.quoteTokenInfo.symbol) {
        return Number(quotePrice / basePrice).toFixed(pool.baseTokenInfo.decimals);
      }
    }
    return "-";
  }, [basePrice, quotePrice, tokenFrom.token.symbol, pool]);
  const [state, setState] = useState<{
    open: boolean;
    vertical: "bottom" | "top";
    horizontal: "left" | "center" | "right";
  }>({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });
  const [transactionResult, setTransactionResult] = useState<TransactionResult>({
    status: null,
  });
  const { network } = useCustomConnection();

  const possibleTokenToConfigs = useMemo(() => getPossibleTokenToConfigs(tokenFrom), [tokenFrom]);

  const handleSwapDirectionChange = () => {
    const temp = Object.assign({}, tokenFrom);
    setTokenFrom(tokenTo);
    setTokenTo(temp);
  };

  const handleChangeImpact = (value) => {
    setPriceImpact(value);
  };

  const handleChangeInclude = () => {
    setIsIncludeDecimal(!isIncludeDecimal);
  };

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
  };

  const handleSnackBarClose = useCallback(() => {
    setState((_state) => ({ ..._state, open: false }));
  }, []);

  const handleTokenFromInput = (card: ISwapCard) => {
    let newTokenFrom = card.token;
    let newTokenTo = tokenTo.token;
    let amountOut = "";
    let amountOutWithSlippage = "";
    if (tokenTo.token.mint === newTokenFrom.mint) {
      newTokenTo = Object.assign({}, tokenFrom.token);
    }
    if (pool && priceImpact) {
      const { amountOut: quoteAmount, amountOutWithSlippage: quoteAmountWithSlippage } =
        getSwapOutAmount(
          pool,
          newTokenFrom.mint,
          newTokenTo.mint,
          card.amount ?? "0",
          parseFloat(priceImpact),
          marketPrice,
        );

      amountOut = isNaN(quoteAmount) ? "" : Number(quoteAmount).toString();
      amountOutWithSlippage = isNaN(quoteAmountWithSlippage)
        ? ""
        : Number(quoteAmountWithSlippage).toString();
    }
    setTokenFrom({ ...tokenFrom, token: newTokenFrom, amount: card.amount });
    setTokenTo({ token: newTokenTo, amount: amountOut, amountWithSlippage: amountOutWithSlippage });
  };

  const handleTokenToInput = (card: ISwapCard) => {
    let newTokenFrom = tokenFrom.token;
    let newTokenTo = card.token;
    let amountOut = "";
    let amountOutWithSlippage = "";
    if (tokenFrom.token.mint === newTokenTo.mint) {
      newTokenFrom = Object.assign({}, tokenTo.token);
    }
    if (pool && priceImpact) {
      const { amountOut: quoteAmount, amountOutWithSlippage: quoteAmountWithSlippage } =
        getSwapOutAmount(
          pool,
          newTokenFrom.mint,
          newTokenTo.mint,
          tokenFrom.amount ?? "0",
          parseFloat(priceImpact),
          marketPrice,
        );

      amountOut = isNaN(quoteAmount) ? "" : Number(quoteAmount).toString();
      amountOutWithSlippage = isNaN(quoteAmountWithSlippage)
        ? ""
        : Number(quoteAmountWithSlippage).toString();
    }
    setTokenFrom({ ...tokenFrom, token: newTokenFrom });
    setTokenTo({ token: newTokenTo, amount: amountOut, amountWithSlippage: amountOutWithSlippage });
  };

  const swapCallback = useCallback(async () => {
    if (!pool || !config || !sourceAccount || !walletPubkey) {
      return null;
    }

    if (sourceBalance.isLessThan(tokenFrom.amount)) {
      return null;
    }

    setIsProcessing(true);
    try {
      const isStable = pool.swapType === SwapType.Stable;
      const referrerPubkey: PublicKey | null =
        appState.isNewUser === undefined ? null : appState.referrerPublicKey;
      const enableReferral = appState.enableReferral;

      const amountIn = BigInt(
        exponentiate(tokenFrom.amount, tokenFrom.token.decimals).integerValue().toString(),
      );
      const minimumAmountOut = BigInt(
        exponentiate(tokenTo.amountWithSlippage, tokenTo.token.decimals).integerValue().toString(),
      );
      const swapDirection =
        tokenFrom.token.symbol === pool.baseTokenInfo.symbol
          ? SWAP_DIRECTION.SellBase
          : SWAP_DIRECTION.SellQuote;
      let { transaction, createAccountsCost, destinationRef } = await swap_v2({
        isStable,
        connection,
        walletPubkey,
        config,
        pool,
        source: sourceAccount,
        destinationRef: destinationAccount?.publicKey,
        rewardTokenRef: rewardsAccount?.publicKey,
        swapData: {
          amountIn,
          minimumAmountOut,
          swapDirection,
        },
        enableReferral,
        referrer: referrerPubkey,
      });

      transaction = await signTransaction(transaction);
      const signature = await sendSignedTransaction({ signedTransaction: transaction, connection });
      await connection.confirmTransaction(signature, "confirmed");
      // fetch account info and update record for from and to tokens
      // this process does not have to blocking because we no longer need its result anymore
      fecthTokenAccountInfoList(
        [tokenFrom.token.mint, tokenTo.token.mint],
        walletPubkey,
        connection,
        dispatch,
        "confirmed",
      )
        // in most case, getting account info with confirmed commitment
        // will update the balance correctly
        // but it does not guarantee the result is correct
        // we need to further wait for the transaction to finalize and then
        // fetch the finalized balance
        .then(() => connection.confirmTransaction(signature, "finalized"))
        .then(() =>
          fecthTokenAccountInfoList(
            [tokenFrom.token.mint, tokenTo.token.mint],
            walletPubkey,
            connection,
            dispatch,
            "finalized",
          ),
        );

      setTokenFrom((prevTokenFrom) => ({ ...prevTokenFrom, amount: "", lastUpdate: Date.now() }));
      setTokenTo((prevTokenTo) => ({ ...prevTokenTo, amount: "", lastUpdate: Date.now() }));

      // get the actual difference of source and base token account from the transaction record
      const { fromTokenBalanceDiff, toTokenBalanceDiff } = await getTokenBalanceDiffFromTransaction(
        connection,
        signature,
        sourceAccount,
        destinationAccount
          ? destinationAccount
          : {
              publicKey: destinationRef,
              amount: undefined,
              mint: new PublicKey(tokenTo.token.mint),
            },
      );

      // when calculating how much solana is actually swapped
      // we need to ignore the transaction fee and cost for creating new token/referral accounts

      // get transaction fee function of this transaction
      const getTransactionFee = async () =>
        (await connection.getFeeForMessage(transaction.compileMessage(), "confirmed")).value;

      // get total "process fee" that should be ignored in the token balance difference
      // if the token is not SOL, this value is always 0 because we only have transaction fee
      // and account creation cost in SOL
      let fromProcessFee = 0;
      let toProcessFee = 0;
      if (tokenFrom.token.symbol === "SOL") {
        fromProcessFee = (await getTransactionFee()) + createAccountsCost;
      } else if (tokenTo.token.symbol === "SOL") {
        toProcessFee = (await getTransactionFee()) + createAccountsCost;
      }

      const actualAmountFrom = new BigNumber(-fromTokenBalanceDiff - fromProcessFee);
      const actualAmountTo = new BigNumber(toTokenBalanceDiff + toProcessFee);

      setTransactionResult({
        status: true,
        signature,
        base: {
          ...tokenFrom,
          amount: exponentiatedBy(actualAmountFrom, tokenFrom.token.decimals).toString(),
        },
        quote: {
          ...tokenTo,
          amount: exponentiatedBy(actualAmountTo, tokenTo.token.decimals).toString(),
        },
      });
      setState((_state) => ({ ..._state, open: true }));
    } catch (e) {
      console.error(e);
      setTransactionResult({ status: false });
      setState((_state) => ({ ..._state, open: true }));
    } finally {
      setIsProcessing(false);
      dispatch(
        fetchReferrerThunk({
          connection,
          config: MARKET_CONFIG_ADDRESS,
          walletAddress: walletPubkey,
        }),
      );
      dispatch(fetchPoolsThunk({ connection }));
    }
  }, [
    pool,
    config,
    sourceAccount,
    walletPubkey,
    sourceBalance,
    tokenFrom,
    tokenTo,
    // priceImpact,
    connection,
    destinationAccount,
    rewardsAccount,
    signTransaction,
    appState,
    dispatch,
  ]);

  const handleSwap = useCallback(async () => {
    if (tokenFrom.amount) {
      setMenu(true, "confirm-swap", undefined, {
        tokenFrom,
        tokenTo,
        slippage: parseFloat(priceImpact),
        callback: swapCallback,
      });
    }
  }, [tokenFrom, tokenTo, priceImpact, swapCallback, setMenu]);

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

    const { base, quote, signature } = transactionResult;

    return (
      <Box display="flex" alignItems="center">
        <img
          src={"/images/snack-success.svg"}
          alt="snack-status-icon"
          className={classes.snackBarIcon}
        />
        <Box>
          <Typography variant="body1" color="primary">
            {`Swap ${Number(base.amount).toFixed(base.token.decimals)} ${
              base.token.symbol
            } to ${Number(quote.amount).toFixed(quote.token.decimals)} ${quote.token.symbol} for ${
              base.token.symbol
            }-${quote.token.symbol} Pool`}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary">
              View Transaction:
            </Typography>
            <Link
              className={classes.snackBarLink}
              target="_blank"
              href={`${SOLSCAN_LINK}/tx/${signature}?cluster=${network}`}
            >
              {signature.slice(0, 7) + "..." + signature.slice(-7)}
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }, [transactionResult, classes, network]);

  const snackAction = useMemo(() => {
    return (
      <IconButton size="small" onClick={handleSnackBarClose} className={classes.snackBarClose}>
        <CloseIcon />
      </IconButton>
    );
  }, [handleSnackBarClose, classes]);

  const actionButton = useMemo(() => {
    if (isConnectedWallet) {
      const unavailable = !pool;
      const sourceAccountNonExist = !sourceBalance;
      const isInsufficientBalance = sourceBalance?.isLessThan(tokenFrom.amount);
      const isInsufficientLiquidity =
        pool &&
        exponentiatedBy(
          tokenFrom.token.symbol === pool.baseTokenInfo.symbol
            ? pool?.poolState.quoteReserve
            : pool?.poolState.baseReserve,
          tokenTo.token.decimals,
        ).isLessThan(tokenTo.amount);

      return (
        <ConnectButton
          fullWidth
          size="large"
          variant="outlined"
          disabled={
            unavailable ||
            sourceAccountNonExist ||
            isInsufficientBalance ||
            isInsufficientLiquidity ||
            isProcessing
          }
          onClick={handleSwap}
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Swap, target: EnterAmount"
        >
          {unavailable ? (
            "unavailable"
          ) : sourceAccountNonExist ? (
            "No " + tokenFrom.token.symbol + " Account in Wallet"
          ) : isInsufficientBalance ? (
            "Insufficient Balance"
          ) : isInsufficientLiquidity ? (
            "Insufficient Liquidity"
          ) : isProcessing ? (
            <Avatar className={classes.actionLoadingButton} src={loadingIcon} />
          ) : (
            "Swap"
          )}
        </ConnectButton>
      );
    }

    return (
      <ConnectButton fullWidth size="large" onClick={() => setMenu(true, "connect")}>
        Connect Wallet
      </ConnectButton>
    );
  }, [
    isConnectedWallet,
    handleSwap,
    setMenu,
    sourceBalance,
    pool,
    tokenFrom,
    tokenTo.amount,
    tokenTo.token.decimals,
    isProcessing,
    classes.actionLoadingButton,
  ]);

  const { open, vertical, horizontal } = state;

  return (
    <Page>
      <Container className={classes.container}>
        <Typography variant="h5" color="primary" align="center" paragraph className={classes.title}>
          Swap
        </Typography>
        <Paper className={classes.root}>
          <Box className={classes.ratePanel}>
            <Typography color="primary" variant="body1" className={classes.marketCondition}>
              {`1 ${tokenFrom.token.symbol} = ${exchangeRateLabel} ${tokenTo.token.symbol}`}
            </Typography>
            <IconButton
              onClick={handleOpenSettings}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Swap, target: Settings"
            >
              <SettingsIcon color="primary" />
            </IconButton>
          </Box>
          <ReactCardFlip
            isFlipped={openSettings}
            containerStyle={{ position: "relative", zIndex: 2 }}
          >
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <SwapCard
                card={tokenFrom}
                tokens={tokenConfigs}
                handleChangeCard={handleTokenFromInput}
              />
              {!openSettings && (
                <Fab
                  color="secondary"
                  size="small"
                  className={classes.swapIcon}
                  onClick={handleSwapDirectionChange}
                >
                  <SyncAlt />
                </Fab>
              )}
              <SwapCard
                card={tokenTo}
                tokens={possibleTokenToConfigs}
                handleChangeCard={handleTokenToInput}
                disabled={true}
              />
            </Box>
            <SettingsPanel
              isOpen={openSettings}
              priceImpact={priceImpact}
              isIncludeDecimal={isIncludeDecimal}
              handleChangeImpact={handleChangeImpact}
              handleChangeInclude={handleChangeInclude}
              handleClose={handleOpenSettings}
            />
          </ReactCardFlip>
          <Box marginTop={2} width="100%" position="relative" zIndex={1}>
            {actionButton}
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

export default Home;
