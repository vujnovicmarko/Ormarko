import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdvertisersList.css";
import AdvertisersListHeader from "../MarketerHeader/AdvertisersListHeader.jsx";

export default function AdvertisersList() {
    const [advertisers, setAdvertisers] = useState([]);

    useEffect(() => {
        const fetchAdvertisers = async () => {
            try {
                const response = await fetch("/api/marketers");
                if (response.ok) {
                    const data = await response.json();
                    setAdvertisers(data);
                } else {
                    console.error("Failed to fetch advertisers");
                }
            } catch (error) {
                console.error("Error fetching advertisers:", error);
            }
        };

        fetchAdvertisers();
    }, []);

    return (
        <div className="advertisers-list-page">
            {/* Header Component */}
            <AdvertisersListHeader/>



            {/* Advertisers Grid */}
            <div className="go-back">

            <Link to="/" className="back-button">
             Natrag

             </Link>
            </div>
            <div className="advertisers-list-container">

                <div className="advertisers-grid">
                    {advertisers.map((advertiser, index) => (
                        <Link
                            to={`/advertisers/${advertiser.username}/gallery`}
                            className="advertiser-card"
                            key={index}
                        >
                            <img
                                src={`data:image/jpeg;base64,${advertiser.logo}`}
                                alt={`${advertiser.username} logo`}
                                className="advertiser-logo"
                            />
                            <p className="advertiser-username">
                                {advertiser.username}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
