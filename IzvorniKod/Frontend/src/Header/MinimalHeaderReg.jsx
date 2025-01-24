import { Link } from "react-router-dom";
import "./Header.css";

export default function MinimalHeaderReg() {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="/OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <div className="headerbtndiv">
        <Link to="/login">
          <button className="headerbtn">Prijava</button>
        </Link>
      </div>
    </div>
  );
}
