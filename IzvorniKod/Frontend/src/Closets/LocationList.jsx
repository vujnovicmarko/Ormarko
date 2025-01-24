import React from "react";
import "./ClosetsPage.css";

export default function LocationList({
  locations,
  selectedLocation,
  handleAddLocation,
  handleSelectLocation,
  setLocationToDelete,
  setShowDeleteLocationModal,
}) {
  const getLocationLabel = (location) => {
    const count =
      locations
        .filter((loc) => loc.typeLoc === location.typeLoc)
        .indexOf(location) + 1;
    return `${location.typeLoc} ${count}`;
  };

  return (
    <div className="locations-nav">
      <h3>Lokacije</h3>
      <button
        className="location-select-btn"
        onClick={() => handleAddLocation("POLICA")}
      >
        + Dodaj Policu
      </button>
      <button
        className="location-select-btn"
        onClick={() => handleAddLocation("LADICA")}
      >
        + Dodaj Ladicu
      </button>
      <button
        className="location-select-btn"
        onClick={() => handleAddLocation("ŠIPKA_ZA_ODJEĆU")}
      >
        + Dodaj Šipku
      </button>
      {locations.map((location) => (
        <div key={location.locationId} className="location-item">
          <button
            className={`location-btn ${
              selectedLocation?.locationId === location.locationId
                ? "active"
                : ""
            }`}
            onClick={() => handleSelectLocation(location)}
          >
            {getLocationLabel(location)}
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              setLocationToDelete(location);
              setShowDeleteLocationModal(true);
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
