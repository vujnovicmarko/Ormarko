import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [filters, setFilters] = useState({
    kategorija: [],
    godisnjeDoba: [],
    otvorenost: [],
    lezernost: [],
    boja: [],
  });

  const categories = {
    kategorija: {
      Majica: "MAJICA",
      Košulja: "KOŠULJA",
      "Trenirka gornji dio": "TRENIRKA_GORNJI_DIO",
      "Trenirka donji dio": "TRENIRKA_DONJI_DIO",
      Traperice: "TRAPERICE",
      Cipele: "CIPELE",
      Tenisice: "TENISICE",
      Čizme: "ČIZME",
      Štikle: "ŠTIKLE",
      Haljina: "HALJINA",
      Suknja: "SUKNJA",
      Jakna: "JAKNA",
      Kaput: "KAPUT",
    },
    godisnjeDoba: {
      Proljeće: "PROLJEĆE",
      Ljeto: "LJETO",
      Jesen: "JESEN",
      Zima: "ZIMA",
    },
    otvorenost: {
      Otvoreno: "OTVORENO",
      Zatvoreno: "ZATVORENO",
      "Kiša/Snijeg": "KIŠA_SNIJEG",
    },
    lezernost: {
      "Za doma": "ZA_DOMA",
      Sportsko: "SPORTSKO",
      Ležerno: "LEŽERNO",
      Radno: "RADNO",
      Svečano: "SVEČANO",
    },
    boja: {
      Bijela: "BIJELA",
      Siva: "SIVA",
      Crna: "CRNA",
      Crvena: "CRVENA",
      Plava: "PLAVA",
      Žuta: "ŽUTA",
      Zelena: "ZELENA",
      Ljubičasta: "LJUBIČASTA",
      Narančasta: "NARANČASTA",
      Smeđa: "SMEĐA",
      Roza: "ROZA",
      Bež: "BEŽ",
    },
  };

  const categoryHeaders = {
    kategorija: "Kategorija",
    godisnjeDoba: "Godišnje doba",
    otvorenost: "Otvorenost",
    lezernost: "Ležernost",
    boja: "Boja",
  };

  const handleInputChange = (category, label) => {
    const value = categories[category][label]; // Get backend-compatible value
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Filters applied:", filters);
    try {
      if (isLoggedIn) {
        const endpoint = useGeolocation
          ? "/api/user/searchUsingGeolocation"
          : "/api/user/search";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = await response.json();
        const targetPage = useGeolocation ? "/search-geolocation" : "/search";
        navigate(targetPage, { state: { filters, products: data.first } });
      } else {
        let userCoordinates = null;
        let location = null;
        if (useGeolocation) {
          userCoordinates = await fetchUserLocationCoordinates();
          const { latitude, longitude } = userCoordinates;
          location = await fetchLocation(latitude, longitude);
          
        }
        console.log("User coordinates:", location);
        const endpoint = useGeolocation
          ? `/api/user/searchUUG?UUlocation=${encodeURIComponent(location)}`
          : "/api/user/search";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        });
        
        if (!response.ok) {
          
          throw new Error("Search request failed");
        }
        
        const data = await response.json();
        const targetPage = "/search";
        navigate(targetPage, { state: { filters, products: data.first } });
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
    setShowFilters(false);
  };

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

  const closeFilters = () => {
    setShowFilters(false);
  };
  return (
    <div className="searchbar-container">
      <form className="searchbar" onSubmit={handleSearch}>
        <input
          className="searchinput"
          type="text"
          placeholder="Pretraži artikle"
          onClick={() => setShowFilters(!showFilters)}
        />
        <button className="searchbtn" type="submit">
          <img src="/SearchIcon.png" alt="Search" />
        </button>
      </form>
      {showFilters && (
        <>
          <div className="filter-overlay" onClick={closeFilters}></div>
          <div className="filter-dropdown">
            {Object.keys(categories).map((category) => (
              <div key={category} className="filter-category">
                <h4>{categoryHeaders[category]}</h4>
                {Object.keys(categories[category]).map((label) => (
                  <label key={label} className="filter-option">
                    <input
                      type="checkbox"
                      value={label}
                      checked={filters[category].includes(
                        categories[category][label]
                      )}
                      onChange={() => handleInputChange(category, label)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            ))}
            <div className="filter-category">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={useGeolocation}
                  onChange={() => setUseGeolocation(!useGeolocation)}
                />
                Pretraži u odnosu na geolokaciju
              </label>
            </div>
            <button className="pretrazi-btn" onClick={handleSearch}>
              Pretraži
            </button>
          </div>
        </>
      )}
    </div>
  );
}
