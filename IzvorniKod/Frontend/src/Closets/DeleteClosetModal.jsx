import React from "react";

export default function DeleteClosetModal({
                                                    closetToDelete,
                                                    closets,
                                                    handleDeleteCloset,
                                                    setShowDeleteClosetModal,
                                                }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">Potvrda brisanja</div>
                <div className="modal-body">
                    Jeste li sigurni da želite obrisati ormar #
                    {closets.findIndex((c) => c.closetId === closetToDelete.closetId) + 1}?
                </div>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => setShowDeleteClosetModal(false)}>
                        Odustani
                    </button>
                    <button
                        className="save-btn"
                        onClick={() => {
                            handleDeleteCloset(closetToDelete.closetId);
                            setShowDeleteClosetModal(false);
                        }}
                    >
                        Obriši
                    </button>
                </div>
            </div>
        </div>
    );
}
