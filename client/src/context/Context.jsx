import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  console.log(token);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);



  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Context.Provider value={{ token, setToken, cartItems, setCartItems }}>
      {children}
    </Context.Provider>
  );
};
