import React, { useState } from "react";
import "../ItemDisplay/ItemDisplay.css"; // Reuse the same CSS file as ItemDisplay
import Modal from "../ItemDisplay/Modal";

export default function SearchItemDisplay({ products }) {
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
        return <p>No products found matching your filters.</p>;
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
                    </div>
                ))}
            </div>
            {isModalOpen && selectedItem && (
                <Modal item={selectedItem} onClose={handleCloseModal} />
            )}
        </div>
    );
}
