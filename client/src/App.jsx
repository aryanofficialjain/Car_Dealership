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
import CarDetail from "./pages/CarDetail";
import Cart from "./pages/Cart";
import UpdateCar from "./pages/UpdateCar";
import CarList from "./pages/CarList";
import Dashboard from "./pages/Dashboard";
import Address from "./pages/Address";
import Pay from "./pages/Pay";
import Review from "./pages/Review";

const App = () => {
  const { token, isAdmin } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/address" element={<Address/>}/>
      <Route path="/pay" element={<Pay/>} />
      <Route path="/review" element={<Review/>}/>
      
      {/* Routes for non-user (not logged in) */}
      {!token && (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allcars" element={<AllCar />} />
          <Route path="/car/car/:id" element={<CarDetail />} />
        </>
      )}

      {/* Routes for normal logged-in user */}
      {token && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/car/car/:id" element={<CarDetail />} />
          <Route path="/allcars" element={<AllCar />} />
          <Route path="/update" element={<Update />} />

        </>
      )}

      {/* Routes for admin */}
      {isAdmin && (
        <>
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<Update />} />
          <Route path="/carlist" element={<CarList />} />
          <Route path="/update/:id" element={<UpdateCar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}

      {/* Default route if none of the above matches */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
