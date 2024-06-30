import { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Default isAdmin to false or null as per your application logic

  // Retrieve token and isAdmin from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedToken) {
      setToken(storedToken);
    }

    // Parse storedIsAdmin as boolean if it exists
    if (storedIsAdmin !== null) {
      setIsAdmin(JSON.parse(storedIsAdmin));
    }
  }, []);

  // Update localStorage when token or isAdmin change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  return (
    <Context.Provider
      value={{ token, setToken, cartItems, setCartItems, isAdmin, setIsAdmin }}
    >
      {children}
    </Context.Provider>
  );
};
