import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Koristi postojeće stilove za header

export default function MarketerGalleryHeader() {
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" src="../OrmarkoLogo.png" alt="Logo" />
                </Link>
            </div>
            <div className="headerbtndiv">
                <Link to="/add-article">
                    <button className="headerbtn">Dodaj</button>
                </Link>
                <Link to="/marketer-profile">
                    <button className="headerbtn">Moj Profil</button>
                </Link>
            </div>
        </div>
    );
}
