import React, { useState, useEffect } from "react";
import LoggedInHeader from "../Header/LoggedInHeader";
import "./ClosetsPage.css";

export default function ClosetsPage() {
    const [closets, setClosets] = useState([]);
    const [selectedCloset, setSelectedCloset] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch existing closets from the backend when the page loads
        async function fetchClosets() {
            try {
                const response = await fetch("/api/closets", {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch closets");
                const data = await response.json();
                setClosets(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load closets.");
            }
        }
        fetchClosets();
    }, []);

    const handleAddCloset = async () => {
        try {
            const response = await fetch("/api/closets", {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to create a new closet");
            const newCloset = await response.json();
            setClosets((prev) => [...prev, newCloset]);
        } catch (err) {
            console.error(err);
            setError("Failed to create a new closet.");
        }
    };

    const handleSelectCloset = (closet) => {
        setSelectedCloset(closet);
    };

    return (
        <div className="closets-page">
            <LoggedInHeader />
            <div className="closets-container">
                {/* Navigation Bar */}
                <div className="closets-nav">
                    <h3>Moji Ormari</h3>
                    {closets.length > 0 ? (
                        closets.map((closet, index) => (
                            <button
                                key={closet.id}
                                className={`closet-btn ${
                                    selectedCloset && selectedCloset.id === closet.id
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => handleSelectCloset(closet)}
                            >
                                Ormar #{index + 1}
                            </button>
                        ))
                    ) : (
                        <p className="no-closets">Nema dodanih ormara</p>
                    )}
                    <button className="add-closet-btn" onClick={handleAddCloset}>
                        + Dodaj novi ormar
                    </button>
                </div>

                {/* Main Content */}
                <div className="closets-content">
                    {selectedCloset ? (
                        <div>
                            <h2>Ormar #{closets.indexOf(selectedCloset) + 1}</h2>
                            <p>Detalji ormara ovdje...</p>
                        </div>
                    ) : (
                        <p>Odaberi ormar</p>
                    )}
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
