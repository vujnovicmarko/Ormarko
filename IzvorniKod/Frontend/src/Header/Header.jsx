import { Link } from "react-router-dom";
import LoginRegisterButtons from "./LoginRegisterButtons";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="../public/OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <SearchBar></SearchBar>
      <LoginRegisterButtons
        className="headerbtndiv"
        buttons={["Registracija", "Prijava"]}
        btnClassName="headerbtn"
      />
    </div>
  );
}
