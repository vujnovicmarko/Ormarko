import { useEffect, useState } from "react";
import Item from "./Item";
import Modal from "./Modal";
import Loader from "../Search/Loader";
import "./ItemDisplay.css";

export default function ItemDisplay() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/default/getAll");
        if (response.ok) {
          const data = await response.json();
          const combinedData = data.first.map((article, index) => ({
            ...article,
            email: data.second[index].email,
          }));
          setItems(combinedData);
        } else {
          console.error("Failed to fetch items");
          setError("Failed to fetch items.");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
        <div className="loader-container">
          <Loader />
        </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  return (
    <div>
      <div className="itemdisplay">
        {items.map((content, index) => (
            <Item content={content} key={index} onItemClick={handleItemClick} />
        ))}
      </div>
      {isModalOpen && selectedItem && (
        <Modal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}
