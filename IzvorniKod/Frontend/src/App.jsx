import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import ItemDisplay from "./ItemDisplay/ItemDisplay";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";

/*const items = [
  ["Naziv1", "kategorija1", "../public/OrmarkoIcon.png"],
  ["Naziv2", "kategorija2", "../public/OrmarkoIcon.png"],
  ["Naziv3", "kategorija3", "../public/OrmarkoIcon.png"],
  ["Naziv4", "kategorija4", "../public/OrmarkoIcon.png"],
  ["Naziv5", "kategorija5", "../public/OrmarkoIcon.png"],
  ["Naziv6", "kategorija6", "../public/OrmarkoIcon.png"],
  ["Naziv7", "kategorija7", "../public/OrmarkoIcon.png"],
  ["Naziv8", "kategorija8", "../public/OrmarkoIcon.png"],
  ["Naziv9", "kategorija9", "../public/OrmarkoIcon.png"],
  ["Naziv10", "kategorija10", "../public/OrmarkoIcon.png"],
  ["Naziv11", "kategorija11", "../public/OrmarkoIcon.png"],
  ["Naziv12", "kategorija12", "../public/OrmarkoIcon.png"],
  ["Naziv13", "kategorija13", "../public/OrmarkoIcon.png"],
  ["Naziv14", "kategorija14", "../public/OrmarkoIcon.png"],
  ["Naziv15", "kategorija15", "../public/OrmarkoIcon.png"],
  ["Naziv16", "kategorija16", "../public/OrmarkoIcon.png"],
  ["Naziv17", "kategorija17", "../public/OrmarkoIcon.png"],
  ["Naziv18", "kategorija18", "../public/OrmarkoIcon.png"],
  ["Naziv19", "kategorija19", "../public/OrmarkoIcon.png"],
  ["Naziv20", "kategorija20", "../public/OrmarkoIcon.png"],
  ["Naziv21", "kategorija21", "../public/OrmarkoIcon.png"],
  ["Naziv22", "kategorija22", "../public/OrmarkoIcon.png"],
  ["Naziv23", "kategorija23", "../public/OrmarkoIcon.png"],
  ["Naziv24", "kategorija24", "../public/OrmarkoIcon.png"],
  ["Naziv25", "kategorija25", "../public/OrmarkoIcon.png"],
  ["Naziv26", "kategorija26", "../public/OrmarkoIcon.png"],
  ["Naziv27", "kategorija27", "../public/OrmarkoIcon.png"],
  ["Naziv28", "kategorija28", "../public/OrmarkoIcon.png"],
  ["Naziv29", "kategorija29", "../public/OrmarkoIcon.png"],
  ["Naziv30", "kategorija30", "../public/OrmarkoIcon.png"],
];*/

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
      </Routes>
    </BrowserRouter>
  );
}
