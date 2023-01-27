import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Box, Typography, makeStyles, Theme, Grid, Paper, Link, Avatar } from "@material-ui/core";
import Page from "components/layout/Page";
import { ConnectButton } from "components";
import { useModal } from "providers/modal";
import ReferralCard from "./components/ReferralCard";
import CopyLinkButton from "./components/CopyLinkButton";
import { ShareDiscord, ShareGithub, ShareMedium, ShareTelegram, ShareTwitter } from "components";
import copy from "copy-to-clipboard";

import { deployConfig } from "constants/deployConfig";
import { createReferrerDeltafiTokenAccount } from "utils/transactions/createReferrerDeltafiTokenAccount";
import { sendSignedTransaction } from "utils/transactions";
import loadingIcon from "components/gif/loading_white.gif";
import { useDispatch, useSelector } from "react-redux";
import { fecthTokenAccountInfoList } from "states/tokenAccountState";
import { DELTAFI_TOKEN_MINT } from "constants/index";
import { selectTokenAccountInfoByMint } from "states";
/*
 * mockup test data for reward page
 */
const referralIntroCard = [
  {
    caption: "Get a referral link",
    detail: "Connect a wallet and generate a referral link to share.",
    image: "/images/get_referral_link.png",
  },
  {
    caption: "Share with friends",
    detail: "Invite your friends to register via your referral link.",
    image: "/images/share_friends.png",
  },
  {
    caption: "Earn crypto",
    detail: "Get referral rewards from your friends’ earnings & swaps.",
    image: "/images/earn_crypto.png",
  },
];

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
  root: {
    padding: `${spacing(10)}px 0px`,
    maxWidth: 792,
    width: "100%",
    [breakpoints.down("md")]: {
      padding: "0 1rem",
    },
  },
  defaultWrapper: {
    [breakpoints.down("sm")]: {
      maxWidth: 248,
      margin: "0 auto",
    },
  },
  fontBold: {
    fontWeight: "bold",
  },
  subContent: {
    color: "#F7F7F7",
  },
  subContentMargin2: {
    marginBottom: spacing(2),
  },
  subContentMargin3: {
    marginBottom: spacing(3),
  },
  referralTitle: {
    fontWeight: 500,
    fontSize: 28,
  },
  mainComponentMargin: {
    marginBottom: spacing(8),
  },
  inviteComponentMargin: {
    marginTop: spacing(8),
    marginBottom: spacing(8),
  },
  sharePanelRow: {
    display: "flex",
  },
  shareLabel: {
    marginRight: spacing(3),
    [breakpoints.down("sm")]: {
      marginRight: spacing(1.5),
    },
  },
  sharePannel: {
    backgroundColor: "#1D1A27",
    padding: "40px 50px 40px 50px",
    borderRadius: "1rem",
    [breakpoints.down("sm")]: {
      padding: "2rem 1rem",
    },
  },
  shareButton: {
    width: 29,
    height: 29,
    [breakpoints.down("sm")]: {
      width: 24,
      height: 24,
    },
  },
  socialLinks: {
    "& a": {
      marginRight: spacing(3),
      [breakpoints.down("sm")]: {
        marginRight: spacing(1.5),
      },
    },
  },
  inputLink: {
    borderRadius: 12,
    background: "transparent",
    border: "1px solid #B7B4C7",
    padding: "16px 24px",
    color: "white",
    marginRight: "16px",
    flex: 1,
    outline: "none",
    [breakpoints.down("sm")]: {
      padding: "12px",
      marginRight: "8px",
      fontSize: "10px",
    },
  },
  SettingUpAccountButton: {
    width: 40,
    height: 40,
    marginTop: 4,
    marginBottom: 4,
  },
}));

const Home: React.FC = (props) => {
  const classes = useStyles(props);
  const { setMenu } = useModal();
  const { connected: isConnectedWallet, publicKey: walletPubkey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const dispatch = useDispatch();

  const deltafiTokenAccount = useSelector(
    selectTokenAccountInfoByMint(deployConfig.deltafiTokenMint),
  );

  const [referralLinkState, setReferralLinkState] = useState<
    "Unavailable" | "Ready" | "Copied" | "Processing"
  >(deltafiTokenAccount ? "Ready" : "Unavailable");

  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    setReferralLinkState(deltafiTokenAccount?.publicKey ? "Ready" : "Unavailable");
    if (!deltafiTokenAccount?.publicKey) {
      return;
    }
    setReferralLink(
      process.env.REACT_APP_LOCAL_HOST + "?referrer=" + deltafiTokenAccount?.publicKey.toBase58(),
    );
  }, [isConnectedWallet, deltafiTokenAccount?.publicKey]);

  return (
    <Page>
      <Box className={classes.root}>
        <Box className={classes.defaultWrapper}>
          <Typography
            variant="h4"
            color="primary"
            align="center"
            className={classes.fontBold}
            paragraph
          >
            Invite friends, earn crypto together
          </Typography>

          {/* Connect Wallet */}
          {!isConnectedWallet && (
            <Box
              flexDirection="column"
              display="flex"
              alignItems="center"
              className={classes.mainComponentMargin}
            >
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.subContent}
                paragraph
              >
                Before referral, you need to connect your wallet
              </Typography>
              <ConnectButton onClick={() => setMenu(true, "connect")}>Connect Wallet</ConnectButton>
            </Box>
          )}
        </Box>

        {/* Send Invitations */}
        {isConnectedWallet && (
          <>
            <Box className={classes.inviteComponentMargin}>
              <Typography variant="h5" color="primary" align="center" paragraph>
                Send Invitations
              </Typography>

              <Paper className={classes.sharePannel}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  className={classes.subContentMargin2}
                >
                  My Referral Link
                </Typography>
                <Box className={`${classes.subContentMargin3} ${classes.sharePanelRow}`}>
                  {referralLinkState === "Unavailable" ? (
                    <input
                      disabled={true}
                      placeholder={"Please Create A DELFI Token Account Before Referring Others!"}
                      className={classes.inputLink}
                    />
                  ) : (
                    <input
                      placeholder={referralLink}
                      disabled={referralLinkState === "Processing"}
                      className={classes.inputLink}
                    />
                  )}
                  {(() => {
                    switch (referralLinkState) {
                      case "Unavailable": {
                        return (
                          <CopyLinkButton
                            onClick={async () => {
                              try {
                                setReferralLinkState("Processing");
                                let transaction = await createReferrerDeltafiTokenAccount({
                                  connection,
                                  walletPubkey,
                                });
                                transaction = await signTransaction(transaction);
                                const hash = await sendSignedTransaction({
                                  signedTransaction: transaction,
                                  connection,
                                });
                                await connection.confirmTransaction(hash, "confirmed");
                                await fecthTokenAccountInfoList(
                                  [DELTAFI_TOKEN_MINT.toBase58()],
                                  walletPubkey,
                                  connection,
                                  dispatch,
                                );

                                setReferralLinkState("Ready");
                              } catch (e) {
                                console.error(e);
                                setReferralLinkState("Unavailable");
                              }
                            }}
                          >
                            {"Wallet Set Up"}
                          </CopyLinkButton>
                        );
                      }
                      case "Ready": {
                        return (
                          <CopyLinkButton
                            onClick={() => {
                              copy(referralLink);
                              setReferralLinkState("Copied");
                              setTimeout(() => setReferralLinkState("Ready"), 5000);
                            }}
                          >
                            {"Copy Link"}
                          </CopyLinkButton>
                        );
                      }
                      case "Copied": {
                        return <CopyLinkButton>{"Copied"}</CopyLinkButton>;
                      }
                      case "Processing": {
                        return (
                          <CopyLinkButton disabled={true}>
                            <Avatar className={classes.SettingUpAccountButton} src={loadingIcon} />
                          </CopyLinkButton>
                        );
                      }
                    }
                  })()}
                </Box>
                <Box className={classes.sharePanelRow}>
                  <Typography variant="subtitle1" color="primary" className={classes.shareLabel}>
                    Share
                  </Typography>
                  <Box display="flex" className={classes.socialLinks}>
                    <Link
                      href="https://twitter.com/deltafi_ai"
                      target="_blank"
                      rel="noreferrer noopener"
                      data-amp-analytics-on="click"
                      data-amp-analytics-name="click"
                      data-amp-analytics-attrs="page: Reward, target: Twitter"
                    >
                      <ShareTwitter className={classes.shareButton} />
                    </Link>

                    <Link
                      href="https://discord.gg/deltafi"
                      target="_blank"
                      rel="noreferrer noopener"
                      data-amp-analytics-on="click"
                      data-amp-analytics-name="click"
                      data-amp-analytics-attrs="page: Reward, target: Discord"
                    >
                      <ShareDiscord className={classes.shareButton} />
                    </Link>
                    <Link
                      href="https://github.com/delta-fi"
                      target="_blank"
                      rel="noreferrer noopener"
                      data-amp-analytics-on="click"
                      data-amp-analytics-name="click"
                      data-amp-analytics-attrs="page: Reward, target: Github"
                    >
                      <ShareGithub className={classes.shareButton} />
                    </Link>
                    <Link
                      href="https://medium.com/deltafi"
                      target="_blank"
                      rel="noreferrer noopener"
                      data-amp-analytics-on="click"
                      data-amp-analytics-name="click"
                      data-amp-analytics-attrs="page: Reward, target: Medium"
                    >
                      <ShareMedium className={classes.shareButton} />
                    </Link>
                    <Link
                      href="https://t.me/deltafi_ai"
                      target="_blank"
                      rel="noreferrer noopener"
                      data-amp-analytics-on="click"
                      data-amp-analytics-name="click"
                      data-amp-analytics-attrs="page: Reward, target: Telegram"
                    >
                      <ShareTelegram className={classes.shareButton} />
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </>
        )}

        {/* How to invite friends */}
        <Box className={classes.defaultWrapper}>
          <Typography variant="h5" color="primary" align="center" paragraph>
            How to invite friends
          </Typography>
          <Grid container spacing={2} style={{ width: "100%", margin: 0 }}>
            {referralIntroCard.map((item, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <ReferralCard caption={item.caption} detail={item.detail} image={item.image} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};
export default Home;
