import { Link } from "react-router-dom";
import "../Header/Header.css";
import ClosetSearchBar from "./ClosetSearchBar.jsx";
import { useState } from "react";

export default function ClosetsHeader() {
    const [userCoordinates, setUserCoordinates] = useState(null);

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
        const browserCoordinates = await getGeolocationFromBrowser().catch(() => null);
        const googleCoordinates = await getGeolocationFromGoogle().catch(() => null);
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
            requestWeatherCombination(ArticleOpen);
        } catch (error) {
            console.error("Error fetching weather from Weather API:", error);
        }
    };

    const requestWeatherCombination = (ArticleOpen) => {
        fetch("/api/user/getCombinationBasedOnWeather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                articleOpen: ArticleOpen,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched user combination based on weather:", data);
            })
            .catch((error) => {
                console.error("Error fetching weather combination:", error);
            });
    };

    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" src="/OrmarkoLogo.png" alt="Logo"/>
                </Link>
            </div>
            <div className="center-container">
                <ClosetSearchBar/>
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
            </div>
            );
            }
