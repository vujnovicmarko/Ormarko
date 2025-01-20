import React from "react";

export default function ClosetList({
  closets,
  selectedCloset,
  handleSelectCloset,
  handleDeleteCloset,
  setClosetToDelete,
  setShowDeleteClosetModal,
  handleAddCloset,
}) {
  return (
    <div className="closets-nav">
      <h3>Moji Ormari</h3>
      {closets.length > 0 ? (
        closets.map((closet, index) => (
          <div key={closet.closetId} className="closet-item">
            <button
              className={`closet-btn ${
                selectedCloset && selectedCloset.closetId === closet.closetId
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelectCloset(closet)}
            >
              Ormar #{index + 1}
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setClosetToDelete(closet);
                setShowDeleteClosetModal(true);
              }}
            >
              X
            </button>
          </div>
        ))
      ) : (
        <p className="no-closets">Nema dodanih ormara</p>
      )}
      <button className="add-closet-btn" onClick={handleAddCloset}>
        + Dodaj novi ormar
      </button>
    </div>
  );
}
