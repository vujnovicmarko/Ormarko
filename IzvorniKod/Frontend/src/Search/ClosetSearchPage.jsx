import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ClosetsHeader from "../Header/ClosetsHeader";
import SearchItemDisplay from "./SearchItemDisplay.jsx";

export default function ClosetSearchPage() {
    const location = useLocation();
    const filters = location.state?.filters || {};
    const [products, setProducts] = useState([]);
    const [positions, setPositions] = useState([]);
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

                const combinedData = Array.isArray(data.first) && Array.isArray(data.second)
                    ? data.first.map((article, index) => ({
                        ...article,
                        closetPosition: data.second[index]?.first || 0, // Fallback for missing data
                        locationPosition: data.second[index]?.second || 0,
                    }))
                    : [];


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

    return (
        <div className="search-page">
            <ClosetsHeader />
            <div className="search-results">
                <h2>Search Results in Your Closet</h2>
                {loading && <p>Loading products...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && <SearchItemDisplay products={products} />}
            </div>
        </div>
    );
}
