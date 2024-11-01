import Item from "./Item"

export default function ItemDisplay({ items }) {
  return (
    <div className="itemdisplay">
      {items.map((content, index) => (
        <Item content={content} key={index}></Item>
      ))}
    </div>
  )
}

