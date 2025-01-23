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
        const response = await fetch("/api/user/searchUsingGeolocation", {
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
