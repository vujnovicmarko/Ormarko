import React from "react";
import "./ArticleList.css"; // Ensure to create or update the CSS file

export default function ArticleList({
  articles,
  setShowArticleModal,
  onArticleClick,
  highlightedArticle,
}) {
  return (
    <div className="articles-section">
      <h3>Artikli</h3>
      <button
        className="add-article-btn"
        onClick={() => setShowArticleModal(true)}
      >
        Dodaj Artikl
      </button>
      <div className="article-display">
        {articles.map((article) => (
          <div
            key={article.articleId}
            className={`article-item ${
              article.articleId === highlightedArticle ? "highlight" : ""
            }`}
            onClick={() => onArticleClick(article)}
          >
            <img
              src={`data:image/png;base64,${article.img}`}
              alt={article.title}
              className="article-img"
            />
            <h4 className="article-title">{article.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
