import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const [_, setToastText] = useState("");
  return (
    <ToastContext.Provider value={setToastText}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        closeButton={false}
        theme="light"
      />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
