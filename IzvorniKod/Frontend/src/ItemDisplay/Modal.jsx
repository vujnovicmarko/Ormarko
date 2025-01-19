import "./Modal.css";

export default function Modal({ item, onClose, showContact = true }) {
  const {
    title,
    img,
    category,
    season,
    howCasual,
    mainColor,
    sideColor,
    descript,
    email
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
        {showContact && (
            <p>
              <strong>Kontakt:</strong> {email}
            </p>
        )}
        <p>
          <strong>Kategorija:</strong> {category}
        </p>
        <p>
          <strong>Godišnje doba:</strong> {season}
        </p>
        <p>
          <strong>Ležernost:</strong> {howCasual}
        </p>
        <p>
          <strong>Glavna boja:</strong> {mainColor}
        </p>
        <p>
          <strong>Sporedna boja:</strong> {sideColor}
        </p>
        <p>
          <strong>Opis stanja:</strong> {descript}
        </p>
      </div>
    </div>
  );
}
