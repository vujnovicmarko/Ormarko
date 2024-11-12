import { useEffect, useState } from "react";
import LoggedInHeader from "../Header/LoggedInHeader";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile({ isLoggedIn, setIsLoggedIn }) {
  const [userInfo, setUserInfo] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/user/profile?t=${Date.now()}`, {
            credentials: "include",
            /*headers: {
                    "Content-Type": "application/json",
            },
            */
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Data fetched:", data); //sam za debug, obrisi poslje
            setUserInfo(data);
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error when fetching user info:", error);
        }
      };
      fetchUserInfo();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo([]);  // razrješiti čuvanja podataka o prošlom logiranom korisniku
    localStorage.removeItem("isLoggedIn");
    fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
    }).then(() => {
        navigate("/");
    });
  };



  return (
      <div className="profile-container">
        <LoggedInHeader />
        <h1 className="profile-heading">Moj profil</h1>
        {userInfo.googleUser ? (
          <div className="profile-details">
            <p>You are logged in with your Google account.</p>
            <p><strong>Gmail:</strong> {userInfo.email}</p>
          </div>
        ) : (
          <div className="profile-details">
            <p><strong>Korisničko ime:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Grad:</strong> {userInfo.city}</p>
            <p><strong>Država:</strong> {userInfo.country}</p>
          </div>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Odjavi se
        </button>
      </div>
    );
}
