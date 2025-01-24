import React, { useState } from "react";
import "../ItemDisplay/ItemDisplay.css";
import Modal from "../ItemDisplay/Modal.jsx";
import { Link } from "react-router-dom";

export default function ClosetSearchItemDisplay({
  products,
  onJumpToLocation,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (!products || products.length === 0) {
    return (
      <div className="no-articles">
        <p>Nisu ponađeni artikli sa navedenim filterima</p>
        <Link to="/closets">
          <button className="closet-button">Vrati se na moje ormare</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="itemdisplay">
        {products.map((product) => {
          const closetIndex = product.closetPosition ?? "Unknown";
          const locationType = product.locationData.locationType || "Unknown";
          const locationIndex = product.locationData.locationIndex ?? "Unknown";

          return (
            <div
              key={product.articleId}
              className="item-search"
              onClick={() => handleItemClick(product)}
            >
              <img
                src={`data:image/png;base64,${product.img}`}
                alt={product.title}
                className="itemimg"
              />
              <h3 className="maintext">{product.title}</h3>
              <p>Ormar: {closetIndex + 1}</p>
              <p>
                Tip lokacije: {locationType} {locationIndex + 1}
              </p>
              <button
                className="jump-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onJumpToLocation(
                    closetIndex,
                    locationIndex,
                    product.articleId
                  );
                }}
              >
                Pronađi u ormaru
              </button>
            </div>
          );
        })}
      </div>
      {isModalOpen && selectedItem && (
        <Modal
          item={selectedItem}
          onClose={handleCloseModal}
          showContact={false}
        />
      )}
    </div>
  );
}
