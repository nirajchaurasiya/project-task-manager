import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { ToastContextProvider } from "./context/ToastContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </Provider>
  </React.StrictMode>
);
