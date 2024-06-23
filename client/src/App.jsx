import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Profile from "./pages/Profile";
import AddCar from "./pages/AddCar";
import { Context } from "./context/Context";
import AllCar from "./pages/AllCar";
import CarDetail from "./pages/CarDetail"
import Cart from "./pages/Cart"

const App = () => {
  const { token } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {token ? (
        <>
          <Route path="/update" element={<Update />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/allcars" element={<AllCar/>} />
          <Route path="/car/car/:id" element={<CarDetail/>} />
          <Route path="/cart" element={<Cart/>} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allcars" element={<AllCar/>} /> 
        </>
      )}
      <Route path="*" element={<Login/>}/>
    </Routes>
  );
};

export default App;
