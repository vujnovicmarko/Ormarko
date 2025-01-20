import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function LoggedInHeader() {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="../OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <SearchBar></SearchBar>
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
