import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(""); // Ensure default value is null

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedIsAdmin) {
      setIsAdmin(storedIsAdmin); // Ensure storedIsAdmin is parsed correctly
    }
  }, []); // Ensure this effect runs only once on mount

  useEffect(() => {
    localStorage.setItem("isAdmin",isAdmin); // Store isAdmin as a string
  }, [isAdmin]); // Update localStorage when isAdmin changes

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]); // Update localStorage when token changes

  return (
    <Context.Provider
      value={{ token, setToken, cartItems, setCartItems, isAdmin, setIsAdmin }}
    >
      {children}
    </Context.Provider>
  );
};


export default Context;
