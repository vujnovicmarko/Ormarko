import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdvertiserGallery.css";

export default function AdvertiserGallery() {
    const { username } = useParams();
    const [articles, setArticles] = useState([]);
    const [advertiserInfo, setAdvertiserInfo] = useState({ name: "", email: "" });

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const response = await fetch(`/api/marketers/${username}/gallery`);
                if (response.ok) {
                    const data = await response.json();
                    setArticles(data.articles);
                    setAdvertiserInfo({ username: data.username, email: data.email });
                } else {
                    console.error("Failed to fetch gallery data for this advertiser.");
                }
            } catch (error) {
                console.error("Error fetching gallery data:", error);
            }
        };

        fetchGalleryData();

    }, [username]);

    return (
        <div className="advertiser-gallery-container">
            <header className="gallery-header">
                <Link to="/advertisers" className="back-button">
                    Natrag
                </Link>
                <h1 className="advertiser-name">{advertiserInfo.name || username}</h1>
            </header>
            <p className="advertiser-email">Kontakt: {advertiserInfo.email}</p>
            <div className="articles-grid">
                {articles.map((article, index) => (
                    <div className="article-card" key={index}>
                        <img
                            src={`data:image/jpeg;base64,${article.img}`}
                            alt={article.title}
                            className="article-image"
                        />
                        <h3>{article.title}</h3>
                        <p>{article.price} HRK</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
