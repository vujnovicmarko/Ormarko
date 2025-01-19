import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../Header/MinimalHeaderLog";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [passwordRevealed, setPasswordRevealed] = useState(false);
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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData),
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        navigate("/profile");
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

  const handleGoogleLogin = () => {
    window.location.href = "/oauth2/authorization/google";
    setIsLoggedIn(true);
  };

  return (
      <>
        <Header />
        <div className="main-container">
          <div className="form-container">
            <h2>Prijava</h2>
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
              <div className="password-container">
                <label>
                  Lozinka:
                  <div className="input-container">
                    <input
                        type={passwordRevealed ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div
                        className="eye-icon"
                        onClick={() => setPasswordRevealed(!passwordRevealed)}
                        title={
                          passwordRevealed ? "Sakrij lozinku" : "Prikaži lozinku"
                        }
                    >
                      {passwordRevealed ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                  </div>
                </label>
              </div>
              <button type="submit">Prijavi se</button>
            </form>
            <div className="additional-login-container">
              <div className="additional-buttons">
                <button
                    className="marketer-login-btn"
                    onClick={() => navigate("/login-marketer")}
                >
                  Prijavi se kao oglašivač
                </button>
                <button className="googleBtn" onClick={handleGoogleLogin}>
                  Prijavi se s Google računom
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
