import React, {useState} from "react";
import "./ArticleModal.css";

export default function ArticleModal({ article, onClose, onDelete }) {
  const {
    articleId,
    title,
    img,
    category,
    season,
    howCasual,
    mainColor,
    sideColor,
    descript,
    openness,
      sharing
  } = article || {};

  const [isVisible, setIsVisible] = useState(sharing);
  const toggleVisibility = async () => {
    const newVisibility = !isVisible;

    try {
      const response = await fetch(`/api/user/profile/updateArticle${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visibility: newVisibility }),
      });

      if (response.ok) {
        setIsVisible(newVisibility);
        console.log(`Article ${articleId} visibility updated to ${newVisibility}`);
      } else {
        console.error("Failed to update visibility:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };
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
        <button
            className={`toggle-visibility-btn ${isVisible ? "visible" : "hidden"}`}
            onClick={toggleVisibility}
        >
          {isVisible ? "Ukloni iz dijeljenja" : "Dijeli"}
        </button>
      </div>
    </div>
  );
}
