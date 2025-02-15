import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./LoginMarketer.css";
import Header from "../Header/MinimalHeaderLog";

export default function LoginMarketer({ setIsLoggedIn }) {
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
    const dataToSend = {
      username: formData.username,
      pass: formData.password,
    };

    try {
      const response = await fetch("/api/login/marketer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
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
          <h2>Prijava za Oglašivače</h2>
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
                    title={
                      passwordRevealed ? "Sakrij lozinku" : "Prikaži lozinku"
                    }
                    className="eye-icon"
                    onClick={() => setPasswordRevealed(!passwordRevealed)}
                  >
                    {passwordRevealed ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </div>
                </div>
              </label>
            </div>
            <button type="submit">Prijavi se</button>
          </form>
        </div>
      </div>
    </>
  );
}
