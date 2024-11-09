import "./Modal.css";

export default function Modal({ item, onClose }) {
  const {
    title,
    img,
    category,
    season,
    howCasual,
    mainColor,
    sideColor,
    descript,
  } = item || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={`data:image/png;base64,${img}`}
          alt={title}
          className="modal-img"
        />
        <h2>{title}</h2>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Season:</strong> {season}
        </p>
        <p>
          <strong>Style:</strong> {howCasual}
        </p>
        <p>
          <strong>Main Color:</strong> {mainColor}
        </p>
        <p>
          <strong>Accent Color:</strong> {sideColor}
        </p>
        <p>
          <strong>Description:</strong> {descript}
        </p>
      </div>
    </div>
  );
}
