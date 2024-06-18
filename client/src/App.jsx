import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Profile from "./pages/Profile";
import AddCar from "./pages/AddCar";
import AllCars from "./pages/AllCars";
import EditCar from "./pages/EditCar";
import { Context } from "./context/Context";
import CarDetails from "./pages/CarDetails";

const App = () => {
  const { token } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allcars" element={<AllCars />} />
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
      {token && (
        <>
          <Route path="/update" element={<Update />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/allcars" element={<AllCars />} />
          <Route path="/editcar" element={<EditCar />} />
          <Route path="/car/:id" element={CarDetails} />
        </>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
