import React from "react";

export default function ArticleList({ articles, setShowArticleModal }) {
    return (
        <div className="articles-section">
            <h3>Artikli</h3>
            <button className="add-article-btn" onClick={() => setShowArticleModal(true)}>Dodaj Artikl</button>
            <ul>
                {articles.map((article) => (
                    <li key={article.articleId}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
}
