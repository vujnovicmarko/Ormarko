import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function ClosetSearchBar() {
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        kategorija: [],
        godisnjeDoba: [],
        otvorenost: [],
        lezernost: [],
        boja: [],
    });

    const categories = {
        kategorija: [
            "MAJICA",
            "KOŠULJA",
            "TRENIRKA_GORNJI_DIO",
            "TRENIRKA_DONJI_DIO",
            "TRAPERICE",
            "CIPELE",
            "TENISICE",
            "ČIZME",
            "ŠTIKLE",
            "HALJINA",
            "SUKNJA",
            "JAKNA",
            "KAPUT",
        ],
        godisnjeDoba: ["PROLJEĆE", "LJETO", "JESEN", "ZIMA"],
        otvorenost: ["OTVORENO", "ZATVORENO", "KIŠA_SNIJEG"],
        lezernost: ["ZA_DOMA", "SPORTSKO", "LEŽERNO", "RADNO", "SVEČANO"],
        boja: [
            "BIJELA",
            "SIVA",
            "CRNA",
            "CRVENA",
            "PLAVA",
            "ŽUTA",
            "ZELENA",
            "LJUBIČASTA",
            "NARANČASTA",
            "SMEĐA",
            "ROZA",
            "BEŽ",
        ],
    };

    const handleInputChange = (category, value) => {
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
            // Make a POST request to your backend endpoint:
            const response = await fetch("/api/user/profile/localSearch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filters),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Search request failed");
            }

            // Assume the backend returns { products: [...] }
            const data = await response.json();

            // Navigate to the search page and pass the retrieved products (and filters, if needed)
            navigate("/closet-search", { state: { filters, products: data.products } });
        } catch (error) {
            console.error("Error during search:", error);
            // Optionally, display an error message.
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
                                <h4>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </h4>
                                {categories[category].map((option) => (
                                    <label key={option} className="filter-option">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={filters[category].includes(option)}
                                            onChange={() => handleInputChange(category, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ))}
                        {/* "Pretraži" button is now inside the dropdown */}
                        <button className="pretrazi-btn" onClick={handleSearch}>
                            Pretraži
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
