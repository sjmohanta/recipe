import React, { createContext, useState, useContext } from "react";

const ErrorContextType = {
    errorMessage: "",
    setError: (msg) => {}
}

const ErrorContext = createContext(ErrorContextType);

export function ErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState("");

  const setError = (msg) => {
    setErrorMessage(msg);
  }

  return (
    <ErrorContext.Provider value={{ errorMessage, setError }}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {children}
    </ErrorContext.Provider>
  );
}

export const useError = () => useContext(ErrorContext);