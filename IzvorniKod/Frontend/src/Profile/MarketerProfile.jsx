import { useEffect, useState } from "react";
import MarketerLoggedHeader from "../Header/MarketerLoggedHeader";
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
                    console.log("Data fetched:", data);
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
        setMarketerInfo([]);
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
            <MarketerLoggedHeader setIsLoggedIn={setIsLoggedIn} />
            <h1 className="profile-heading">Moj profil oglašivača</h1>
            <div className="profile-details">
                <p>
                    <strong>Korisničko ime:</strong> {marketerInfo.username}
                </p>
                <p>
                    <strong>Email:</strong> {marketerInfo.email}
                </p>
            </div>
        </div>
    );
}
