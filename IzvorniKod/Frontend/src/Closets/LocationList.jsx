import React from "react";

export default function LocationList({
                                         locations,
                                         selectedLocation,
                                         handleAddLocation,
                                         handleSelectLocation,
                                         handleDeleteLocation,
                                         setLocationToDelete,
                                         setShowDeleteModal,
                                     }) {
    return (
        <div className="locations-nav">
            <h3>Lokacije</h3>
            <button onClick={() => handleAddLocation("POLICA")}>Dodaj Policu</button>
            <button onClick={() => handleAddLocation("LADICA")}>Dodaj Ladicu</button>
            <button onClick={() => handleAddLocation("ŠIPKA_ZA_ODJEĆU")}>Dodaj Šipku</button>
            {locations.map((location) => (
                <div key={location.locationId} className="location-item">
                    <button
                        className={`location-btn ${
                            selectedLocation?.locationId === location.locationId ? "active" : ""
                        }`}
                        onClick={() => handleSelectLocation(location)}
                    >
                        {location.typeLoc}
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => {
                            setLocationToDelete(location);
                            setShowDeleteModal(true);
                        }}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}
