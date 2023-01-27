import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Providers from "./providers";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./states";

// save referral information before first rendering
const referrer: string = new URLSearchParams(window.location.search).get("referrer");
if (!!referrer) window.localStorage.setItem("referrer", referrer);
const enableReferralStr: string = new URLSearchParams(window.location.search).get("enableReferral");
if (!!enableReferralStr) window.localStorage.setItem("enableReferralStr", enableReferralStr);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Providers>
        <App />
      </Providers>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
