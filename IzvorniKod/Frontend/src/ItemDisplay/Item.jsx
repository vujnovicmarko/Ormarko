import "./ItemDisplay.css";

export default function Item({ content, onItemClick }) {
  const { title, img } = content || {};

  if (!content) {
    return <div>Invalid item data</div>;
  }

  return (
    <div className="item" onClick={() => onItemClick(content)}>
      <img
        src={`data:image/png;base64,${img}`}
        alt={title}
        className="itemimg"
      />
      <h3 className="maintext">{title}</h3>
    </div>
  );
}
