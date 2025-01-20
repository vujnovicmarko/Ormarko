import { Link } from "react-router-dom";
import "./Header.css";

export default function MinimalHeaderLog() {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="/OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <div className="headerbtndiv">
        <Link to="/register">
          <button className="headerbtn">Registracija</button>
        </Link>
      </div>
    </div>
  );
}
