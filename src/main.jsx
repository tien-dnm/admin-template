import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { GlobalContextProvider } from "./global/context/global";
import { LoadingProvider } from "./global/custom_hooks/loading";
import { ConfirmDialog } from "primereact/confirmdialog";
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true);
  },
  onOfflineReady() {},
  onRegisteredSW() {},
  immediate: true,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalContextProvider>
    <LoadingProvider>
      <App />
      <ConfirmDialog />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme={"colored"}
        pauseOnFocusLoss={false}
        enableMultiContainer={true}
      />
    </LoadingProvider>
  </GlobalContextProvider>
);
