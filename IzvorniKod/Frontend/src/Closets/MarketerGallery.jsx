import React, { useState, useEffect } from "react";
import "./MarketerGallery.css";

export default function MarketerGallery() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", description: "" });

    // Fetch items on component mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("/api/marketer/items", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                } else {
                    console.error("Failed to fetch items");
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    // Handle input change for new item
    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    // Add a new item
    const handleAddItem = async () => {
        try {
            const response = await fetch("/api/marketer/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
                credentials: "include",
            });
            if (response.ok) {
                const addedItem = await response.json();
                setItems([...items, addedItem]);
                setNewItem({ name: "", description: "" });
            } else {
                console.error("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    // Delete an item
    const handleDeleteItem = async (id) => {
        try {
            const response = await fetch(`/api/marketer/items/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                setItems(items.filter((item) => item.id !== id));
            } else {
                console.error("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="gallery-container">
            <h2>Galerija artikala</h2>
            <div className="add-item-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Naziv artikla"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Opis artikla"
                    value={newItem.description}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddItem}>Dodaj artikl</button>
            </div>
            <div className="items-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="item-card">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => handleDeleteItem(item.id)}>Obriši</button>
                        </div>
                    ))
                ) : (
                    <p>Trenutno nema artikala.</p>
                )}
            </div>
        </div>
    );
}
