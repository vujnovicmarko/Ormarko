import React from "react";
import "./AddArticleModal.css";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showOpennessOption) {
      newArticle.openness = null;
    }

    const requiredFields = [
      "title",
      "img",
      "category",
      "season",
      "howCasual",
      "mainColor",
      "sideColor",
    ];
    const missingFields = requiredFields.filter((field) => !newArticle[field]);

    if (missingFields.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    handleAddArticle();
  };

  const showOpennessOption = ["CIPELE", "TENISICE", "ČIZME", "ŠTIKLE"].includes(
    newArticle.category
  );

  return (
    <div className="modal-overlay" onClick={() => setShowArticleModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Dodaj Artikl</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Naslov: <span className="required">*</span>
            <input
              type="text"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
          </label>
          <label>
            Slika: <span className="required">*</span>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setNewArticle({
                      ...newArticle,
                      img: reader.result.split(",")[1],
                    });
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
              onChange={(e) =>
                setNewArticle({ ...newArticle, sharing: e.target.checked })
              }
            />
          </label>
          <label>
            Kategorija: <span className="required">*</span>
          </label>
          <select
            value={newArticle.category}
            onChange={(e) =>
              setNewArticle({ ...newArticle, category: e.target.value })
            }
          >
            <option value="">Odaberi kategoriju</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label>
            Godišnje Doba: <span className="required">*</span>
          </label>
          <select
            value={newArticle.season}
            onChange={(e) =>
              setNewArticle({ ...newArticle, season: e.target.value })
            }
          >
            <option value="">Odaberi godišnje doba</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          {showOpennessOption && (
            <>
              <label>Otvorenost:</label>
              <select
                value={newArticle.openness}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, openness: e.target.value })
                }
              >
                <option value="">Odaberi otvorenost</option>
                {opennessOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}
          <label>
            Ležernost: <span className="required">*</span>
          </label>
          <select
            value={newArticle.howCasual}
            onChange={(e) =>
              setNewArticle({ ...newArticle, howCasual: e.target.value })
            }
          >
            <option value="">Odaberi ležernost</option>
            {casualnessOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label>
            Glavna Boja: <span className="required">*</span>
          </label>
          <select
            value={newArticle.mainColor}
            onChange={(e) =>
              setNewArticle({ ...newArticle, mainColor: e.target.value })
            }
          >
            <option value="">Odaberi glavnu boju</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <label>
            Sporedna Boja: <span className="required">*</span>
          </label>
          <select
            value={newArticle.sideColor}
            onChange={(e) =>
              setNewArticle({ ...newArticle, sideColor: e.target.value })
            }
          >
            <option value="">Odaberi sporednu boju</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <label>
            Opis stanja:
            <input
              type="text"
              value={newArticle.descript}
              onChange={(e) =>
                setNewArticle({ ...newArticle, descript: e.target.value })
              }
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Dodaj
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowArticleModal(false)}
            >
              Zatvori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
