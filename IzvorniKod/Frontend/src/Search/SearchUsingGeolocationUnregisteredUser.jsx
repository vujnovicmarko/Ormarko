import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import LoggedInHeader from "../Header/LoggedInHeader";
import SearchItemDisplay from "./SearchItemDisplay.jsx";
import Loader from "./Loader.jsx";

export default function SearchPage({ isLoggedIn }) {
  const location = useLocation();
  const filters = location.state?.filters || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        setLoading(true);
        let userCoordinates = null;
        let location = null;
        userCoordinates = await fetchUserLocationCoordinates();
        const { latitude, longitude } = userCoordinates;
        location = await fetchLocation(latitude, longitude);
        const response = await fetch(`/api/user/searchUUG?UUlocation=${encodeURIComponent(location)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const combinedData = data.first.map((article, index) => ({
          ...article,
          email: data.second[index].email,
        }));
        setProducts(combinedData);
      } catch (err) {
        console.error("Error searching products:", err);
        setError("Error loading search results.");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [filters]);


  const fetchLocation = async (latitude, longitude) => {
    const apiKey = "AIzaSyDt7HBawUA_F4Nm8VGBbjh3Q67CKz_niSg";
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&result_type=country&result_type&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].formatted_address.split(",");
        return location[0];
      } else {
        console.error("No address found for the coordinates");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const fetchUserLocationCoordinates = async () => {
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
    } else {
      bestLocation = googleResult;
    }
    if (bestLocation) return bestLocation;
    else {
      setError("Unable to fetch geolocation.");
    }
  };

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

  return (
    <div className="search-page">
      {isLoggedIn ? <LoggedInHeader /> : <Header />}
      <div className="search-results">
        <h2>Search Results</h2>
        {loading ? <Loader /> : null}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && <SearchItemDisplay products={products} />}
      </div>
    </div>
  );
}
