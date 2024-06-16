import { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Retrieve token from local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Store token in local storage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Context.Provider value={{ token, setToken }}>
      {children}
    </Context.Provider>
  );
};
