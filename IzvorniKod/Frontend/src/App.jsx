import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import ItemDisplay from "./ItemDisplay/ItemDisplay";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import SearchPage from "./Search/SearchPage.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    return storedLoginStatus === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={
            <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/items" element={<ItemDisplay />} />
        <Route path="/search"
               element={
                 <SearchPage isLoggedIn={isLoggedIn}/>
               }
        />
      </Routes>
    </BrowserRouter>
  );
}

import { useLocation } from "react-router-dom";
function SearchPageWrapper() {
  const location = useLocation();
  const filters = location.state?.filters || {};
  return <SearchPage filters={filters} />;
}