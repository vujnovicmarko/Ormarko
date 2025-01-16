import React from "react";
import "./ArticleModal.css";

export default function ArticleModal({ article, onClose }) {
    const {
        title,
        img,
        category,
        season,
        howCasual,
        mainColor,
        sideColor,
        descript,
    } = article || {};

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
                    <strong>Godisnje doba:</strong> {season}
                </p>
                <p>
                    <strong>Ležernost:</strong> {howCasual}
                </p>
                <p>
                    <strong>Glavna boja:</strong> {mainColor}
                </p>
                <p>
                    <strong>Sporedna boja:</strong> {sideColor}
                </p>
                <p>
                    <strong>Opis:</strong> {descript}
                </p>
            </div>
        </div>
    );
}
