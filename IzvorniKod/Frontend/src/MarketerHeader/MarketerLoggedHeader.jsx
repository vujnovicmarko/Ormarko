import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MarketerLoggedHeader({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch("/logout", { method: "POST", credentials: "include" })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/marketer-profile">
          <img className="logo" src="../OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <div className="headerbtndiv">
        <Link to="/marketer-gallery">
          <button className="headerbtn">Moja galerija</button>
        </Link>
        <button className="headerbtn" onClick={handleLogout}>
          Odjavi se
        </button>
      </div>
    </div>
  );
}
