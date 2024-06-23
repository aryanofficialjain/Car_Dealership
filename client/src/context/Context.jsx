import { createContext, useState, useEffect } from "react";

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

  // useEffect(() => {
  //   const fetchCartItems = async () = {
  //   };

  //   fetchCartItems();
  // }, []);


  const addToCart = async (cardata) => {
    console.log(cardata);

  };


  const removeFromCart = async (carId) => {
  };



  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Context.Provider value={{ token, setToken, cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </Context.Provider>
  );
};
