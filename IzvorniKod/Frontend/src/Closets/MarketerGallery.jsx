import React, { useState, useEffect } from "react";
import MarketerGalleryHeader from "../Header/MarketerGalleryHeader";
import "./MarketerGallery.css";

export default function MarketerGallery() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Dohvat artikala
        const fetchArticles = async () => {
            try {
                const response = await fetch("/api/marketer/gallery", {
                    credentials: "include",
                });
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

        fetchArticles();
    }, []);

    const handleDeleteArticle = async (articleId) => {
        try {
            const response = await fetch(`/api/marketer/gallery/${articleId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                setArticles((prevArticles) =>
                    prevArticles.filter((article) => article.id !== articleId)
                );
            } else {
                console.error("Failed to delete article");
            }
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    return (
        <div>
            <MarketerGalleryHeader />
            <div className="gallery-container">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div className="gallery-item" key={article.id}>
                            {/*dok ne nađemo način prikazivanja slika  <img src={`data:image/jpeg;base64,${article.img}`} alt={article.title} />*/}
                            <h3>{article.title}</h3>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteArticle(article.id)}
                            >
                                &#x2716; {/* Unicode za X */}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Trenutno nema artikala u galeriji.</p>
                )}
            </div>
        </div>
    );
}
