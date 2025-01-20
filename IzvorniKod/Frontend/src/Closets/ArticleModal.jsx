import React from "react";
import "./ArticleModal.css";

export default function ArticleModal({ article, onClose, onDelete }) {
  const {
    title,
    img,
    category,
    season,
    howCasual,
    mainColor,
    sideColor,
    descript,
    openness,
  } = article || {};

  const handleDelete = () => {
    onDelete(article.articleId);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={`data:image/png;base64,${img}`}
          alt={title}
          className="modal-img"
        />
        <h2>{title}</h2>
        <p>
          <strong>Kategorija:</strong> {category}
        </p>
        <p>
          <strong>Godišnje doba:</strong> {season}
        </p>
        <p>
          <strong>Ležernost:</strong> {howCasual}
        </p>
        {openness && (
          <p>
            <strong>Otvorenost:</strong> {openness}
          </p>
        )}
        <p>
          <strong>Glavna boja:</strong> {mainColor}
        </p>
        <p>
          <strong>Sporedna boja:</strong> {sideColor}
        </p>
        <p>
          <strong>Opis stanja:</strong> {descript}
        </p>
        <button className="delete-btn" onClick={handleDelete}>
          Obriši
        </button>
      </div>
    </div>
  );
}
