import { useEffect, useState } from "react";
import LoggedInHeader from "../Header/LoggedInHeader";
import { useNavigate } from "react-router-dom";
import "./MarketerProfile.css";

export default function MarketerProfile({ isLoggedIn, setIsLoggedIn }) {
    const [marketerInfo, setMarketerInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarketerInfo = async () => {
            try {
                const response = await fetch(`/api/marketer/profile?t=${Date.now()}`, {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Marketer Data fetched:", data); // Debugging
                    setMarketerInfo(data);
                } else {
                    console.error("Failed to fetch marketer info");
                }
            } catch (error) {
                console.error("Error fetching marketer info:", error);
            }
        };
        fetchMarketerInfo();
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setMarketerInfo([]); // Reset marketer data
        localStorage.removeItem("isLoggedIn");
        fetch("/logout", {
            method: "POST",
            credentials: "include",
        }).then(() => {
            navigate("/");
        });
    };

    return (
        <div className="profile-container">
            <LoggedInHeader />
            <h1 className="profile-heading">Moj profil oglašivača</h1>
            <div className="profile-details">
                <p><strong>Korisničko ime:</strong> {marketerInfo.username}</p>
                <p><strong>Email:</strong> {marketerInfo.email}</p>
                <p><strong>Grad:</strong> {marketerInfo.city}</p>
                <p><strong>Država:</strong> {marketerInfo.country}</p>
                <p><strong>Galerija artikala:</strong></p>
                <ul>
                    {marketerInfo.items && marketerInfo.items.length > 0 ? (
                        marketerInfo.items.map((item, index) => (
                            <li key={index}>{item.name} - {item.description}</li>
                        ))
                    ) : (
                        <p>Trenutno nema artikala u galeriji.</p>
                    )}
                </ul>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Odjavi se
            </button>
        </div>
    );
}
