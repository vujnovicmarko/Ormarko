import React, { useState, useEffect } from "react";
import LoggedInHeader from "../Header/LoggedInHeader";
import "./ClosetsPage.css";

export default function ClosetsPage() {
    const [closets, setClosets] = useState([]);
    const [selectedCloset, setSelectedCloset] = useState(null);
    const [error, setError] = useState(null);

    // Fetch closets on component mount
    const fetchClosets = async () => {
        try {
            const response = await fetch("/api/user/profile/allClosets", {
                method: "GET",
                credentials: "include", // Include cookies for authentication
            });
            if (!response.ok) throw new Error("Failed to fetch closets");
            const data = await response.json();
            setClosets(data);
        } catch (err) {
            console.error("Error fetching closets:", err);
            setError("Failed to load closets.");
        }
    };

    // Add a new closet
    const handleAddCloset = async () => {
        try {
            const response = await fetch("/api/user/profile/addCloset", {
                method: "POST",
                credentials: "include", // Include cookies for authentication
            });
            if (!response.ok) throw new Error("Failed to create a new closet");

            // Fetch updated closet list after successful addition
            await fetchClosets();
        } catch (err) {
            console.error("Error creating closet:", err);
            setError("Failed to create a new closet.");
        }
    };

    // Select a closet
    const handleSelectCloset = (closet) => {
        setSelectedCloset(closet);
    };

    // Fetch closets on mount
    useEffect(() => {
        fetchClosets();
    }, []);

    return (
        <div className="closets-page">
            <LoggedInHeader />
            <div className="closets-container">
                {/* Navigation Bar */}
                <div className="closets-nav">
                    <h3>Moji Ormari</h3>
                    {error && <div className="error-message">{error}</div>}
                    {closets.length > 0 ? (
                        closets.map((closet, index) => (
                            <button
                                key={closet.closetId} // Use closetId from the backend
                                className={`closet-btn ${
                                    selectedCloset && selectedCloset.closetId === closet.closetId
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
        </div>
    );
}
