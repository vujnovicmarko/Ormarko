import { Link } from "react-router-dom";
import "../Header/Header.css";
import ClosetSearchBar from "./ClosetSearchBar.jsx";

export default function ClosetsHeader() {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="../OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <ClosetSearchBar />
      <div className="headerbtndiv">
        <Link to="/closets">
          <button className="headerbtn">Moji Ormari</button>
        </Link>
        <Link to="/profile">
          <button className="headerbtn">Moj Profil</button>
        </Link>
      </div>
    </div>
  );
}
