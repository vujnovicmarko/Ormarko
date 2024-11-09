import { useEffect, useState } from "react";
import Item from "./Item";

export default function ItemDisplay() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:8080/api/items");
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="itemdisplay">
      {items.length > 0 ? (
        items.map((content, index) => <Item content={content} key={index} />)
      ) : (
        <p>Loading items...</p>
      )}
    </div>
  );
}
