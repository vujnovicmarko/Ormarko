import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddArticle.css";
import AddArticleHeader from "../MarketerHeader/AddArticleHeader.jsx";

export default function AddArticle() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          img: reader.result.split(",")[1],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/marketer/gallery/add-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/marketer-gallery");
      } else {
        alert("Greška prilikom dodavanja artikla.");
      }
    } catch (error) {
      console.error("Greška prilikom slanja podataka:", error);
    }
  };

  return (
    <div>
      <AddArticleHeader />
      <div className="add-article-container">
        <h2>Dodaj Novi Artikl</h2>
        <form className="add-article-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Naziv Artikla:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Kategorija:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Odaberi kategoriju</option>
              <option value="MAJICA">MAJICA</option>
              <option value="KOŠULJA">KOŠULJA</option>
              <option value="TRENIRKA_GORNJI_DIO">TRENIRKA GORNJI DIO</option>
              <option value="TRENIRKA_DONJI_DIO">TRENIRKA DONJI DIO</option>
              <option value="TRAPERICE">TRAPERICE</option>
              <option value="CIPELE">CIPELE</option>
              <option value="TENISICE">TENISICE</option>
              <option value="ČIZME">ČIZME</option>
              <option value="ŠTIKLE">ŠTIKLE</option>
              <option value="HALJINA">HALJINA</option>
              <option value="SUKNJA">SUKNJA</option>
              <option value="JAKNA">JAKNA</option>
              <option value="KAPUT">KAPUT</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Cijena:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Slika: </label>
            <input type="file" onChange={handleFileChange} required />
          </div>

          <button type="submit" className="add-article-btn">
            Dodaj Artikl
          </button>
        </form>
      </div>
    </div>
  );
}
