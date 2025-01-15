import React, { useState, useEffect } from "react";
import LoggedInHeader from "../Header/LoggedInHeader";
import "./ClosetsPage.css";

export default function ClosetsPage() {
    const [closets, setClosets] = useState([]);
    const [selectedCloset, setSelectedCloset] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [articles, setArticles] = useState([]);
    const [showArticleModal, setShowArticleModal] = useState(false);
    const [newArticle, setNewArticle] = useState({
        sharing: false,
        title: "",
        img: null,
        category: "",
        season: "",
        openness: "",
        howCasual: "",
        mainColor: "",
        sideColor: "",
        descript: "",
    });
    const [error, setError] = useState(null);

    const categories = [
        "MAJICA", "KOŠULJA", "TRENIRKA_GORNJI_DIO", "TRENIRKA_DONJI_DIO", "TRAPERICE",
        "CIPELE", "TENISICE", "ČIZME", "ŠTIKLE", "HALJINA", "SUKNJA", "JAKNA", "KAPUT",
    ];
    const seasons = ["PROLJEĆE", "LJETO", "JESEN", "ZIMA"];
    const opennessOptions = ["OTVORENO", "ZATVORENO", "KIŠA_SNIJEG", null];
    const casualnessOptions = ["ZA_DOMA", "SPORTSKO", "LEŽERNO", "RADNO", "SVEČANO"];
    const colors = [
        "BIJELA", "SIVA", "CRNA", "CRVENA", "PLAVA", "ŽUTA", "ZELENA",
        "LJUBIČASTA", "NARANČASTA", "SMEĐA", "ROZA", "BEŽ",
    ];

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

    const fetchLocations = async (closetId) => {
        try {
            const response = await fetch(`/api/user/profile/closet${closetId}/allLocations`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to fetch locations");
            const data = await response.json();
            setLocations(data);
            console.log(data);
        } catch (err) {
            console.error("Error fetching locations:", err);
            setError("Failed to load locations.");
        }
    };

    const fetchArticles = async (locationId) => {
        try {
            const response = await fetch(`/api/user/profile/location${locationId}/allArticles`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to fetch articles");
            const data = await response.json();
            setArticles(data);
        } catch (err) {
            console.error("Error fetching articles:", err);
            setError("Failed to load articles.");
        }
    };
    const handleAddLocation = async (type) => {
        if (!selectedCloset) {
            setError("No closet selected!");
            return;
        }
        try {
            const response = await fetch(`/api/user/profile/closet${selectedCloset.closetId}/addLocation`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tipLokacije: type }),
            });
            console.log("Selected Closet:", selectedCloset);
            if (!response.ok) throw new Error("Failed to create a new location");
            await fetchLocations(selectedCloset.closetId);
        } catch (err) {
            console.error("Error adding location:", err);
            setError("Failed to create a new location.");
        }
    };

    const handleAddArticle = async () => {
        try {
            const response = await fetch(`/api/user/profile/location${selectedLocation.locationId}/addArticle`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newArticle),
            });
            if (!response.ok) throw new Error("Failed to add article");
            setShowArticleModal(false);
            fetchArticles(selectedLocation.locationId);
        } catch (err) {
            console.error("Error adding article:", err);
            setError("Failed to add article.");
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
        console.log("Selected Closet:", closet);
        setSelectedCloset(closet);
        setSelectedLocation(null);
        setArticles([]);
        fetchLocations(closet.closetId);
    };
    const handleSelectLocation = (location) => {
        console.log("Selected location:", location);
        setSelectedLocation(location);
        fetchArticles(location.locationId);
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

                {selectedCloset && (
                    <div className="locations-articles">
                        <div className="locations-nav">
                            <h3>Lokacije</h3>
                            <button onClick={() => handleAddLocation("POLICA")}>Dodaj Policu</button>
                            <button onClick={() => handleAddLocation("LADICA")}>Dodaj Ladicu</button>
                            <button onClick={() => handleAddLocation("ŠIPKA_ZA_ODJEĆU")}>Dodaj Šipku</button>
                            {locations.map((location) => (
                                <button
                                    key={location.locationId}
                                    className={`location-btn ${
                                        selectedLocation?.locationId === location.locationId ? "active" : ""
                                    }`}
                                    onClick={() => handleSelectLocation(location)}
                                >
                                    {location.typeLoc}
                                </button>
                            ))}
                        </div>

                        <div className="articles-section">
                            {selectedLocation ? (
                                <>
                                    <h3>Artikli</h3>
                                    <button onClick={() => setShowArticleModal(true)}>Dodaj Artikl</button>
                                    <ul>
                                        {articles.map((article) => (
                                            <li key={article.articleId}>{article.title}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <p>Odaberite lokaciju</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {showArticleModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Dodaj Artikl</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddArticle();
                            }}
                        >
                            <label>
                                Naslov:
                                <input
                                    type="text"
                                    value={newArticle.title}
                                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                                />
                            </label>
                            <label>
                                Slika:
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                setNewArticle({ ...newArticle, img: reader.result.split(",")[1] }); // Extract Base64 data
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                            <label>
                                Dijeli:
                                <input
                                    type="checkbox"
                                    checked={newArticle.sharing}
                                    onChange={(e) => setNewArticle({...newArticle, sharing: e.target.checked})}
                                />
                            </label>

                            <label>Kategorija:</label>
                            <select
                                value={newArticle.category}
                                onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                            >
                                <option value="">Odaberi kategoriju</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <label>Godisnje Doba:</label>
                            <select
                                value={newArticle.season}
                                onChange={(e) => setNewArticle({...newArticle, season: e.target.value})}
                            >
                                <option value="">Odaberi godišnje doba</option>
                                {seasons.map((season) => (
                                    <option key={season} value={season}>
                                        {season}
                                    </option>
                                ))}
                            </select>
                            <label>Otvorenost:</label>
                            <select
                                value={newArticle.openness}
                                onChange={(e) => setNewArticle({...newArticle, openness: e.target.value})}
                            >
                                <option value="">Odaberi otvorenost</option>
                                {opennessOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <label>Ležernost:</label>
                            <select
                                value={newArticle.howCasual}
                                onChange={(e) => setNewArticle({...newArticle, howCasual: e.target.value})}
                            >
                                <option value="">Odaberi ležernost</option>
                                {casualnessOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <label>Glavna Boja:</label>
                            <select
                                value={newArticle.mainColor}
                                onChange={(e) => setNewArticle({...newArticle, mainColor: e.target.value})}
                            >
                                <option value="">Odaberi glavnu boju</option>
                                {colors.map((color) => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                            <label>Sporedna Boja:</label>
                            <select
                                value={newArticle.sideColor}
                                onChange={(e) => setNewArticle({...newArticle, sideColor: e.target.value})}
                            >
                                <option value="">Odaberi sporednu boju</option>
                                {colors.map((color) => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                            <label>
                                Opis:
                                <input
                                    type="text"
                                    value={newArticle.descript}
                                    onChange={(e) => setNewArticle({...newArticle, descript: e.target.value})}
                                />
                            </label>
                            {/* Add other dropdowns similarly */}
                            <button type="submit">Dodaj</button>
                            <button onClick={() => setShowArticleModal(false)}>Zatvori</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
