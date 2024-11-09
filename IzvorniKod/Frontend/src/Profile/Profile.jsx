import LoggedInHeader from "../Header/LoggedInHeader";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div>
      <LoggedInHeader />
      <h1>Moj profil</h1>
      <p className="welcome-text">Dobrodošli na vašu profilnu stranicu!</p>
      <button className="logout-button" onClick={handleLogout}>Odjavi se</button>
    </div>
  );
}