import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddArticle.css";
import AddArticleHeader from "../Header/AddArticleHeader";

export default function AddArticle() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        img: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "img") {
            setFormData({ ...formData, img: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("img", formData.img);

        try {
            const response = await fetch("/api/marketer/add-article", {
                method: "POST",
                credentials: "include",
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Artikl uspješno dodan!");
                navigate("/marketer-gallery"); // Redirekt na MarketerGallery
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
                        <label htmlFor="category">Kategorija:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
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
                        <label htmlFor="img">Slika Artikla:</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="add-article-btn">
                        Dodaj Artikl
                    </button>
                </form>
            </div>
        </div>
    );
}
