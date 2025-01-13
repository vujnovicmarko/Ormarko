import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginMarketer.css";
import Header from "../Header/Header";

export default function LoginMarketer({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        username: "",
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
            const response = await fetch("/api/login/marketer", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData),
                credentials: "include",
            });

            if (response.ok) {
                setIsLoggedIn(true);
                navigate("/marketer-profile");
                console.log("Login successful");
            } else {
                const errorData = await response.json();
                alert(
                    errorData.error || "Login failed. Please check your credentials."
                );
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Unexpected error during login.");
        }
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="form-container">
                    <h2>Prijava Oglašivača</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
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
                        <button type="submit">Prijavi se kao oglašivač</button>
                    </form>
                </div>
            </div>
        </>
    );
}
