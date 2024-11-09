import { useEffect, useState } from "react";
import Item from "./Item";
import Modal from "./Modal";
import "./ItemDisplay.css";

export default function ItemDisplay() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/default/getAll"
        );
        if (response.ok) {
          const data = await response.json();
          setItems(data);
          if (
            Array.isArray(data) &&
            data.every((item) => item && typeof item === "object")
          ) {
            setItems(data);
          } else {
            console.error("Unexpected data format:", data);
            setError("Unexpected data format received from server.");
          }
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  return (
    <div>
      <div className="itemdisplay">
        {items.length > 0 ? (
          items.map((content, index) => (
            <Item content={content} key={index} onItemClick={handleItemClick} />
          ))
        ) : (
          <p>Loading items...</p>
        )}
      </div>
      {isModalOpen && selectedItem && (
        <Modal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}
