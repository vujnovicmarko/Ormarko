import React, { useState } from "react";
import "../ItemDisplay/ItemDisplay.css";
import Modal from "../ItemDisplay/Modal";

export default function ClosetSearchItemDisplay({ products, onJumpToLocation }) {
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
            </div>
        );
    }

    return (
        <div>
            <div className="itemdisplay">
                {products.map((product) => (
                    <div
                        key={product.articleId}
                        className="item"
                        onClick={() => handleItemClick(product)}
                    >
                        <img
                            src={`data:image/png;base64,${product.img}`}
                            alt={product.title}
                            className="itemimg"
                        />
                        <h3 className="maintext">{product.title}</h3>
                        <p>Closet: {product.closetPosition + 1}</p>
                        <p>Location: {product.locationType} {product.locationPosition + 1}</p>
                        <button
                            className="jump-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the modal
                                onJumpToLocation(product.closetPosition, product.locationPosition);
                            }}
                        >
                            Jump to Location
                        </button>
                    </div>
                ))}
            </div>
            {isModalOpen && selectedItem && (
                <Modal item={selectedItem} onClose={handleCloseModal} />
            )}
        </div>
    );
}
