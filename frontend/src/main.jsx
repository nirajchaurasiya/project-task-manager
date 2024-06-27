import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { ToastContextProvider } from "./context/ToastContext.jsx";
import EditTaskContextProvider from "./context/EditProfileContext.jsx";
import TempSingleTaskProvider from "./context/TempSingleTask.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContextProvider>
        <TempSingleTaskProvider>
          <EditTaskContextProvider>
            <App />
          </EditTaskContextProvider>
        </TempSingleTaskProvider>
      </ToastContextProvider>
    </Provider>
  </React.StrictMode>
);
