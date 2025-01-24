import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClosetsHeader from "../ClosetsHeader/ClosetsHeader.jsx";
import ClosetSearchItemDisplay from "./ClosetSearchItemDisplay.jsx";
import Loader from "../Search/Loader.jsx";

export default function ClosetSearchPage() {
  const location = useLocation();
  const filters = location.state?.filters || {};
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClosetSearchResults() {
      try {
        setLoading(true);
        const response = await fetch("/api/user/profile/localSearch", {
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
          closetPosition: data.second[index]?.first ?? null,
          locationData: data.second[index]?.second || {},
        }));

        setProducts(combinedData);
      } catch (err) {
        console.error("Error fetching closet search results:", err);
        setError("Error loading search results.");
      } finally {
        setLoading(false);
      }
    }

    fetchClosetSearchResults();
  }, [filters]);

  const handleJumpToLocation = (closetIndex, locationIndex, articleId) => {
    navigate("/closets", { state: { closetIndex, locationIndex, articleId } });
  };

  return (
    <div className="search-page">
      <ClosetsHeader />
      <div className="search-results">
        <h2>Rezultati pretraživanja ormara</h2>
        {loading ? <Loader /> : null}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <ClosetSearchItemDisplay
            products={products}
            onJumpToLocation={handleJumpToLocation}
          />
        )}
      </div>
    </div>
  );
}
