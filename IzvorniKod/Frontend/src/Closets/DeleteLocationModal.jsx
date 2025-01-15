import React from "react";

export default function DeleteLocationModal({
                                                locationToDelete,
                                                locations,
                                                handleDeleteLocation,
                                                setShowDeleteLocationModal,
                                            }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">Potvrda brisanja</div>
                <div className="modal-body">
                    Jeste li sigurni da želite obrisati lokaciju #
                    {locations.findIndex((loc) => loc.locationId === locationToDelete.locationId) + 1}
                    ({locationToDelete.typeLoc})?
                </div>
                <div className="modal-actions">
                    <button
                        className="cancel-btn"
                        onClick={() => setShowDeleteLocationModal(false)}
                    >
                        Odustani
                    </button>
                    <button
                        className="save-btn"
                        onClick={() => {
                            handleDeleteLocation(locationToDelete.locationId);
                            setShowDeleteLocationModal(false);
                        }}
                    >
                        Obriši
                    </button>
                </div>
            </div>
        </div>
    );
}
