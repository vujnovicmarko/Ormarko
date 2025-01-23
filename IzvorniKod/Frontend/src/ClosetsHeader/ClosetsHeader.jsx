import { Link } from "react-router-dom";
import ClosetSearchBar from "./ClosetSearchBar.jsx";
import { useState, useEffect, useRef } from "react";
import "./WeatherClothing.css";
import "../Header/Header.css";

export default function ClosetsHeader() {
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingData, setClothingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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

  const getWeather = async () => {
    setLoading(true);
    setDropdownVisible(true);
    setWeatherData(null);
    setClothingData([]);
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

    if (!bestLocation) {
      console.error("Unable to fetch weather.");
      setLoading(false);
      return;
    }

    setUserCoordinates(bestLocation);

    try {
      const { latitude, longitude } = bestLocation;
      const apiKey = "333649eca724a1a63375afe6bdec2ae2";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather from Weather API");
      }
      const data = await response.json();
      console.log("Weather fetched:", data);
      setWeatherData(data);

      const condition = data.weather[0].main.toLowerCase();
      const temperature = data.main.temp;
      console.log(condition, temperature);
      let ArticleOpen;

      if (
        condition.includes("rain") ||
        condition.includes("drizzle") ||
        condition.includes("snow")
      ) {
        ArticleOpen = "KIŠA_SNIJEG";
      } else if (temperature > 18) {
        ArticleOpen = "OTVORENO";
      } else if (temperature <= 18) {
        ArticleOpen = "ZATVORENO";
      } else {
        console.error("Error determining clothing based on weather.");
        return;
      }
      console.log("Weather filter:", ArticleOpen);
      const clothingResponse = await fetch(
        "/api/user/getCombinationBasedOnWeather",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleOpen: ArticleOpen }),
        }
      );

      if (!clothingResponse.ok) {
        throw new Error("Failed to fetch clothing data.");
      }

      const clothing = await clothingResponse.json();
      setClothingData(clothing);
    } catch (error) {
      console.error("Error fetching weather from Weather API:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="/OrmarkoLogo.png" alt="Logo" />
        </Link>
      </div>
      <div className="center-container">
        <ClosetSearchBar />
        <button className="get-weather" onClick={getWeather}>
          Prijedlog modne kombinacije
        </button>
      </div>
      <div className="headerbtndiv">
        <Link to="/closets">
          <button className="headerbtn">Moji Ormari</button>
        </Link>
        <Link to="/profile">
          <button className="headerbtn">Moj Profil</button>
        </Link>
      </div>
      {dropdownVisible && (
        <div ref={dropdownRef} className="weather-dropdown">
          {loading ? (
            <div className="loading">
              Učitavanje modne kombinacije, ovo može potrajati neko vrijeme...
            </div>
          ) : (
            <div className="weather-content">
              {weatherData && (
                <div className="weather-info">
                  <p>Vrijeme: {weatherData.weather[0].description}</p>
                  <p>Temperatura: {weatherData.main.temp}°C</p>
                </div>
              )}
              <div className="clothing-list">
                {clothingData.map((item, index) => (
                  <div key={index} className="clothing-item">
                    <img
                      src={`data:image/png;base64,${item.img}`}
                      alt={item.title}
                      className="modal-img"
                    />
                    <p>Naslov: {item.title}</p>
                    <p>Kategorija: {item.category}</p>
                    <p>Godišnje doba: {item.season}</p>
                    <p>Otvorenost: {item.openness}</p>
                    <p>Ležernost: {item.howCasual}</p>
                    <p>Glavna boja: {item.mainColor}</p>
                    <p>Sporedna boja: {item.sideColor}</p>
                    <p>Opis: {item.descript}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
