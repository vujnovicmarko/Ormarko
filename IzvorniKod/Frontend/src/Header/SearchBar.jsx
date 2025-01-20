import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
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
    } catch (error) {
      console.error("Error during search:", error);
    }
    setShowFilters(false);
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
          <img src="../SearchIcon.png" alt="Search" />
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
