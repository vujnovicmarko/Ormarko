import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdvertiserGallery.css";

export default function AdvertiserGallery() {
    const { username } = useParams();
    const [articles, setArticles] = useState([]);
    const [advertiserInfo, setAdvertiserInfo] = useState({ name: "", email: "" });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`/api/marketers/${username}/gallery`);
                if (response.ok) {
                    const data = await response.json();
                    setArticles(data);
                } else {
                    console.error("Failed to fetch articles");
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        const fetchAdvertiserInfo = async () => {
            try {
                const response = await fetch(`/api/marketers/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setAdvertiserInfo({ name: data.name, email: data.email });
                } else {
                    console.error("Failed to fetch advertiser info");
                }
            } catch (error) {
                console.error("Error fetching advertiser info:", error);
            }
        };

        fetchArticles();
        fetchAdvertiserInfo();
    }, [username]);

    return (
        <div className="advertiser-gallery-container">
            <header className="gallery-header">
                <Link to="/advertisers" className="back-button">
                    Natrag
                </Link>
                <h1 className="advertiser-name">{advertiserInfo.name || username}</h1>
            </header>
            <p className="advertiser-email">Email: {advertiserInfo.email}</p>
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
