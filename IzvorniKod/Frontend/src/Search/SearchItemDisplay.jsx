// SearchItemDisplay.jsx
import React from "react";
import "./SearchItemDisplay.css"; // Create and adjust styles as needed
import { useEffect, useState } from "react";
import Item from "../ItemDisplay/Item.jsx";
import Modal from "../ItemDisplay/Modal.jsx";

export default function SearchItemDisplay({ products, onItemClick }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!products || products.length === 0) {
        return <p>No products found matching your filters.</p>;
    }
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };
    return (
        <div>
        <div className="search-itemdisplay">
            {products.map((product) => (
                <div key={product.articleId} className="search-item" onClick={() => onItemClick && onItemClick(product)}>
                    <img
                        src={`data:image/png;base64,${product.img}`}
                        alt={product.title}
                        className="search-itemimg"
                    />
                    <h3 className="search-maintext">{product.title}</h3>
                </div>
            ))}
        </div>
        {isModalOpen && selectedItem && (
            <Modal item={selectedItem} onClose={handleCloseModal} />
        )}
        </div>

    );
}
