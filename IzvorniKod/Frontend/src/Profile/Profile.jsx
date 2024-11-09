import LoggedInHeader from "../Header/LoggedInHeader";
import { useNavigate } from "react-router-dom";

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
      <p>Welcome to your profile page!</p>
      <button onClick={handleLogout}>Odjavi se</button>
    </div>
  );
}
