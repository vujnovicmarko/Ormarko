import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterMarketer.css"; // Dodajte stilove za ovu komponentu
import Header from "../Header/Header";

export default function RegisterMarketer() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/signup/marketer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                alert("Registracija kao oglašivač je uspješna!");
                navigate("/marketer-profile"); // Redirekt na profil oglašivača
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Registracija nije uspjela. Pokušajte ponovo.");
            }
        } catch (error) {
            console.error("Greška pri registraciji:", error);
            alert("Dogodila se neočekivana greška. Pokušajte ponovo.");
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Registriraj se kao oglašivač</button>
                </form>
            </div>
        </>
    );
}
