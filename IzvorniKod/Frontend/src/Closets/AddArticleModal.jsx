import React from "react";

export default function AddArticleModal({
                                            newArticle,
                                            setNewArticle,
                                            handleAddArticle,
                                            setShowArticleModal,
                                            categories,
                                            seasons,
                                            opennessOptions,
                                            casualnessOptions,
                                            colors,
                                        }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Dodaj Artikl</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddArticle();
                    }}
                >
                    <label>
                        Naslov:
                        <input
                            type="text"
                            value={newArticle.title}
                            onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                        />
                    </label>
                    <label>
                        Slika:
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        setNewArticle({ ...newArticle, img: reader.result.split(",")[1] }); // Extract Base64 data
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                    <label>
                        Dijeli:
                        <input
                            type="checkbox"
                            checked={newArticle.sharing}
                            onChange={(e) => setNewArticle({...newArticle, sharing: e.target.checked})}
                        />
                    </label>

                    <label>Kategorija:</label>
                    <select
                        value={newArticle.category}
                        onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                    >
                        <option value="">Odaberi kategoriju</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <label>Godisnje Doba:</label>
                    <select
                        value={newArticle.season}
                        onChange={(e) => setNewArticle({...newArticle, season: e.target.value})}
                    >
                        <option value="">Odaberi godišnje doba</option>
                        {seasons.map((season) => (
                            <option key={season} value={season}>
                                {season}
                            </option>
                        ))}
                    </select>
                    <label>Otvorenost:</label>
                    <select
                        value={newArticle.openness}
                        onChange={(e) => setNewArticle({...newArticle, openness: e.target.value})}
                    >
                        <option value="">Odaberi otvorenost</option>
                        {opennessOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label>Ležernost:</label>
                    <select
                        value={newArticle.howCasual}
                        onChange={(e) => setNewArticle({...newArticle, howCasual: e.target.value})}
                    >
                        <option value="">Odaberi ležernost</option>
                        {casualnessOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label>Glavna Boja:</label>
                    <select
                        value={newArticle.mainColor}
                        onChange={(e) => setNewArticle({...newArticle, mainColor: e.target.value})}
                    >
                        <option value="">Odaberi glavnu boju</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                    <label>Sporedna Boja:</label>
                    <select
                        value={newArticle.sideColor}
                        onChange={(e) => setNewArticle({...newArticle, sideColor: e.target.value})}
                    >
                        <option value="">Odaberi sporednu boju</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                    <label>
                        Opis:
                        <input
                            type="text"
                            value={newArticle.descript}
                            onChange={(e) => setNewArticle({...newArticle, descript: e.target.value})}
                        />
                    </label>
                    <button type="submit">Dodaj</button>
                    <button onClick={() => setShowArticleModal(false)}>Zatvori</button>
                </form>
            </div>
        </div>
    );
}
