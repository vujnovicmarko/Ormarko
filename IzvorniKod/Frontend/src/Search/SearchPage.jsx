// SearchPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import LoggedInHeader from "../Header/LoggedInHeader";
import ItemDisplay from "../ItemDisplay/ItemDisplay"; // You can reuse this or create a specialized one

export default function SearchPage({ filters, onClearFilters, isLoggedIn }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSearchResults() {
            try {
                setLoading(true);
                const response = await fetch("/api/user/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(filters),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                // Assume that the returned object has a "products" array.
                setProducts(data.products || []);
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
                {loading && <p>Loading products...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                    <>
                        {products.length > 0 ? (
                            <ItemDisplay products={products} />
                        ) : (
                            <p>No products found matching your filters.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
