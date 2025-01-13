import { useEffect, useState } from "react";
import MarketerLoggedHeader from "../Header/MarketerLoggedHeader"; // Ispravan naziv komponente
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function MarketerProfile({ setIsLoggedIn }) {
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
                    console.log("Data fetched:", data); // Debugging
                    setMarketerInfo(data);
                } else {
                    console.error("Failed to fetch marketer info");
                }
            } catch (error) {
                console.error("Error when fetching marketer info:", error);
            }
        };
        fetchMarketerInfo();
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setMarketerInfo([]); // Reset marketer info
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
            <MarketerLoggedHeader /> {/* Header specifičan za marketera */}
            <h1 className="profile-heading">Moj profil oglašivača</h1>
            <div className="profile-details">
                <p>
                    <strong>Korisničko ime:</strong> {marketerInfo.username}
                </p>
                <p>
                    <strong>Email:</strong> {marketerInfo.email}
                </p>
                <p>
                    <strong>Grad:</strong> {marketerInfo.city}
                </p>
                <p>
                    <strong>Država:</strong> {marketerInfo.country}
                </p>


            </div>
        </div>
    );
}
