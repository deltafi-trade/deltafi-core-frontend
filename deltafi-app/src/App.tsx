import React, { lazy, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
// import Amplify, { Analytics } from 'aws-amplify'

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import SuspenseWithChunkError from "./components/SuspenseWithChunkError";
import PageLoader from "components/PageLoader";
import Header from "components/Header";
import Footer from "components/Footer";
import { FilterCountry } from "utils/checkJurisdiction";

// import awsconfig from './aws-exports'
import { DELTAFI_TOKEN_MINT, MARKET_CONFIG_ADDRESS } from "./constants";
import { useCustomConnection } from "providers/connection";
import { deployConfig, deployMode } from "constants/deployConfig";

import { useDispatch } from "react-redux";
import { fetchFarmPoolsThunk } from "states/farmPoolState";
import { fetchFarmUsersThunk } from "states/farmUserState";
import { fetchPoolsThunk } from "states/poolState";
import { fetchPythDataThunk } from "states/pythState";
import { fetchSerumDataThunk } from "states/serumState";
import { setReferrerAction, fetchReferrerThunk } from "states/appState";

import { PublicKey } from "@solana/web3.js";
import { fetchTokenAccountsThunk } from "states/tokenAccountState";
import { scheduleWithInterval } from "utils";
import { deployConfigV2 } from "constants/deployConfigV2";
import { getClusterApiUrl } from "anchor/anchor_utils";
import { AccountLayout } from "@solana/spl-token";
import { web3 } from "@project-serum/anchor";
import { fetchSwapsV2Thunk } from "states/v2/swapV2State";
import { fetchFarmsV2Thunk } from "states/v2/farmV2State";
import { fetchLiquidityProvidersV2Thunk } from "states/v2/liqudityProviderV2State";
import { fetchUserV2Thunk } from "states/v2/userV2State";

// Amplify.configure(awsconfig)
// Analytics.autoTrack('event', {
//   enable: true,
//   events: ['click'],
//   selectorPrefix: 'data-amp-analytics-',
//   provider: 'AWSPinpoint',
//   attributes: {
//     page: 'page',
//   },
// })
// Analytics.record({ name: 'App' })

const Farm = lazy(() => import("./views/Farm"));
const Swap = lazy(() => import("./views/Swap"));
const Pool = lazy(() => import("./views/Pool"));
const Reward = lazy(() => import("./views/Reward"));
const Deposit = lazy(() => import("./views/Deposit"));
const Stake = lazy(() => import("./views/Stake"));
const Unavailable = lazy(() => import("./views/Unavailable"));
const Terms = lazy(() => import("./views/Terms"));

// This is hack is needed to resolve the bigint json serialization in redux.
// eslint-disable-next-line
BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const disableIpBlocker = true;
const App: React.FC = () => {
  const dispatch = useDispatch();
  const { setNetwork } = useCustomConnection();
  const validCountry =
    disableIpBlocker || window.location.origin.includes("localhost") || FilterCountry();
  const { publicKey: walletAddress } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    // Only enable it for mainnet-test
    if (deployMode !== "mainnet-test") {
      return;
    }

    const clustApiUrl = getClusterApiUrl(deployConfigV2.network);
    const connection = new web3.Connection(clustApiUrl, "confirmed");
    dispatch(fetchSwapsV2Thunk({ connection, walletAddress }));
    dispatch(fetchFarmsV2Thunk({ connection, walletAddress }));
    if (walletAddress != null) {
      dispatch(fetchLiquidityProvidersV2Thunk({ connection, walletAddress }));
      dispatch(fetchUserV2Thunk({ connection, walletAddress }));
    }
  }, [walletAddress, dispatch]);

  useEffect(() => {
    if (!walletAddress) {
      return;
    }

    // refresh every 1 minute
    return scheduleWithInterval(
      () => dispatch(fetchTokenAccountsThunk({ connection, walletAddress })),
      60 * 1000,
    );
  }, [connection, walletAddress, dispatch]);

  useEffect(() => {
    // Refresh the pyth data every 2 seconds.
    return scheduleWithInterval(() => dispatch(fetchPythDataThunk(connection)), 2 * 1000);
  }, [connection, dispatch]);

  useEffect(() => {
    // Refresh the serum data every 2 seconds.
    return scheduleWithInterval(() => dispatch(fetchSerumDataThunk(connection)), 2 * 1000);
  }, [connection, dispatch]);

  useEffect(() => {
    if (walletAddress) {
      dispatch(fetchFarmUsersThunk({ connection, walletAddress }));
    }
  }, [connection, walletAddress, dispatch]);

  useEffect(() => {
    // Refresh the farm pool every 1 minute.
    return scheduleWithInterval(() => dispatch(fetchFarmPoolsThunk({ connection })), 60 * 1000);
  }, [connection, dispatch]);

  useEffect(() => {
    // Refresh the farm pool every 1 minute.
    return scheduleWithInterval(() => dispatch(fetchPoolsThunk({ connection })), 60 * 1000);
  }, [connection, dispatch]);

  useEffect(() => {
    // Enable referral feature explicitly
    const enableReferral: boolean = true;
    // wrap the logic with an async function because we have to to await async function here
    (async () => {
      if (!enableReferral || !walletAddress) {
        return;
      }
      const referrer: string = window.localStorage.getItem("referrer");
      // test is the referrer string is a valid public key
      // if the referrer string is invalid, the referrer public key is undefined
      let referrerPublicKey: PublicKey | null = null;
      if (referrer !== null && referrer !== "") {
        try {
          // creating public key will fail and throw and execption
          // if the referrer address is not a valid public key
          referrerPublicKey = new PublicKey(referrer);
          const referrerAccountInfo = await connection.getAccountInfo(referrerPublicKey);
          // the referrer must be a valid spl token account
          const { mint, owner } = AccountLayout.decode(referrerAccountInfo.data);
          const mintPublicKey = new PublicKey(mint);
          const ownerPublicKey = new PublicKey(owner);
          // the referrer account cannot be owned by the user's wallet
          if (ownerPublicKey.equals(walletAddress)) {
            throw Error("Referrer token account is owned by current the user");
          }
          // the referrer's mint must be the DELFI
          if (!mintPublicKey.equals(DELTAFI_TOKEN_MINT)) {
            throw Error("Referrer token account has wrong mint");
          }
        } catch (e) {
          console.warn(e);
          // if the referrer address is invalid, the referrer public key is set to null
          referrerPublicKey = null;
          // also clear the referrer data in the local storage because it is invalid
          window.localStorage.removeItem("referrer");
        }
      }

      dispatch(setReferrerAction({ referrerPublicKey, enableReferral }));
      dispatch(fetchReferrerThunk({ connection, config: MARKET_CONFIG_ADDRESS, walletAddress }));
    })();
  }, [dispatch, walletAddress, connection]);

  useEffect(() => {
    setNetwork(deployConfig.network);
  }, [setNetwork]);

  return (
    <BrowserRouter>
      <Header />
      <SuspenseWithChunkError fallback={<PageLoader />}>
        {validCountry ? (
          <Switch>
            <Redirect exact from="/" to="/swap" />
            <Route path="/swap" exact component={Swap} />
            <Route path="/pools" exact component={Pool} />
            <Route path="/deposit/:poolAddress" exact component={Deposit} />
            <Route path="/farms" exact component={Farm} />
            <Route path="/rewards" exact component={Reward} />
            <Route path="/stake/:id" exact component={Stake} />
            <Route path="/terms" exact component={Terms} />
            <Redirect from="*" to="/swap" />
          </Switch>
        ) : (
          <Switch>
            <Redirect exact from="/" to="/unavailable" />
            <Route path="/unavailable" exact component={Unavailable} />
            <Redirect from="*" to="/unavailable" />
          </Switch>
        )}
      </SuspenseWithChunkError>
      <Footer />
    </BrowserRouter>
  );
};

export default React.memo(App);
