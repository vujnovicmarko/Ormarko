import { useEffect, useState } from "react";
import ClosetsHeader from "../ClosetsHeader/ClosetsHeader.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile({ isLoggedIn, setIsLoggedIn }) {
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api/user/profile?t=${Date.now()}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched:", data);
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

  useEffect(() => {
    const fetchUserCoordinates = async () => {
      if (userInfo) {
        const browserCoordinates = await getGeolocationFromBrowser().catch(
          () => null
        );
        const googleCoordinates = await getGeolocationFromGoogle().catch(
          () => null
        );
        const [browserResult, googleResult] = await Promise.all([
          browserCoordinates,
          googleCoordinates,
        ]);
        let bestLocation = null;
        if (browserResult) {
          bestLocation = browserResult;
          console.log("BROWSER");
        } else {
          bestLocation = googleResult;
          console.log("GOOGLE");
        }
        if (bestLocation) setUserCoordinates(bestLocation);
        else {
          setError("Unable to fetch geolocation.");
        }
      }
    };
    fetchUserCoordinates();
  }, [userInfo]);

  useEffect(() => {
    if (userCoordinates) {
      const fetchAddress = async (latitude, longitude) => {
        const apiKey = "AIzaSyDt7HBawUA_F4Nm8VGBbjh3Q67CKz_niSg";
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&result_type=country&result_type&key=${apiKey}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const location = data.results[0].formatted_address.split(",");
            console.log("Address fetched:", location);
            console.log("Address fetched:", location[0], location[1]);
            console.log("Coordinates fetched:", { latitude, longitude });
            updateLocation(location[0], location[1]);
          } else {
            console.error("No address found for the coordinates");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };

      fetchAddress(userCoordinates.latitude, userCoordinates.longitude);
    }
  }, [userCoordinates]);

  function updateLocation(newCity, newCountry) {
    fetch("/api/user/updateGeolocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: newCity,
        country: newCountry,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated user:", data);
      })
      .catch((error) => {
        console.error("Error updating location:", error);
      });
  }

  const getGeolocationFromGoogle = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDt7HBawUA_F4Nm8VGBbjh3Q67CKz_niSg`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location from Google API");
      }

      const data = await response.json();
      return {
        latitude: data.location.lat,
        longitude: data.location.lng,
      };
    } catch (error) {
      console.error("Error fetching geolocation from Google API:", error);
      return null;
    }
  };

  const getGeolocationFromBrowser = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          resolve({ latitude, longitude, accuracy });
        },
        (error) => {
          reject("Error fetching geolocation from browser:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo([]);
    localStorage.removeItem("isLoggedIn");
    fetch("/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <ClosetsHeader />
      <div className="profile-container">
        <h1 className="profile-heading">Moj profil</h1>
        <div className="profile-details">
          <p>
            <strong>Korisničko ime:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Grad:</strong> {userInfo.city}
          </p>
          <p>
            <strong>Država:</strong> {userInfo.country}
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Odjavi se
        </button>
      </div>
    </div>
  );
}
