import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null); // Ensure default value is null
  const [BuyerToken, setBuyerToken] = useState(null);
  const [buyCarId, setbuyCarId] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    const storeduserId = localStorage.getItem("userId");
    const storedusername = localStorage.getItem("username");

    if (storedToken) {
      setToken(storedToken);
    }

    if(storeduserId){
      setUserId(storeduserId);
    }

    if(storedusername){
      setUsername(storedusername);
    }

    if (storedIsAdmin !== null) {
      setIsAdmin(JSON.parse(storedIsAdmin)); // Parse storedIsAdmin from string to boolean
    }
  }, []); // Ensure this effect runs only once on mount

  useEffect(() => {
    if (isAdmin !== null) {
      localStorage.setItem("isAdmin", isAdmin.toString()); // Store isAdmin as a string
    }
  }, [isAdmin]); // Update localStorage when isAdmin changes

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        cartItems,
        setCartItems,
        isAdmin,
        setIsAdmin,
        setbuyCarId,
        buyCarId,
        setBuyerToken,
        BuyerToken,
        setUserId, 
        userId,
        username,
        setUsername,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
