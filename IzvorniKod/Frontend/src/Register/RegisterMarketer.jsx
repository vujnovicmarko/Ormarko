import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterMarketer.css";
import Header from "../Header/MinimalHeaderReg";

export default function RegisterMarketer() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        logo: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const maxSize = 100;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext("2d").drawImage(img, 0, 0, width, height);

                    const resizedBase64 = canvas.toDataURL("image/png").split(",")[1];
                    setFormData({
                        ...formData,
                        logo: resizedBase64,
                    });
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting formData:", formData);

        try {
            const response = await fetch("/api/signup/marketer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                navigate("/marketer-profile");
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || "Registration failed. Please try again.";
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h2>Registracija kao oglašivač</h2>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Korisničko ime:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Lozinka:
                            <input
                                type="password"
                                name="pass"
                                value={formData.pass}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="file-label">
                            Odaberi logo
                            <input
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </label>
                        {formData.logo && (
                            <p className="file-name">Datoteka odabrana</p>
                        )}
                    </div>

                    <button type="submit">Registriraj se kao oglašivač</button>
                </form>
            </div>
        </>
    );
}
