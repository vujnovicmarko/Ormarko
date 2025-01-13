import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Header from "../Header/Header";

export default function Register({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    city: "",
    country: "",
    password: "",
    email: "",
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

    // Mapiramo formData na backend očekivana polja
    const dataToSend = {
      username: formData.username,
      e_mail: formData.email, // Backend očekuje "e_mail"
      pass: formData.password, // Backend očekuje "pass"
      city: formData.city,
      country: formData.country,
    };

    try {
      const response = await fetch("/api/signup/user", {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),

        /*
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData),
        */
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        navigate("/profile");
        const result = await response.json();
        console.log("Registration successful:", result);

      } else {
        console.error("Registration failed:", response.statusText);

        const errorData = await response.json();
        const errorMessage = errorData.error || "Registration failed. Please try again.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <h2>Registracija</h2>
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
              Grad:
              <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
              />
            </label>
          </div>
          <div>
            <label>
              Država:
              <input
                  type="text"
                  name="country"
                  value={formData.country}
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
          <button type="submit">Registriraj se</button>
          <div className="additional-buttons">
            <button
                className="marketer-register-btn"
                onClick={() => navigate("/register-marketer")}
            >
              Registriraj se kao oglašivač
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
