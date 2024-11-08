import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //redirectanje nakon logina
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch('http://localhost:8080/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
              credentials: 'include'
          });

          if (response.ok) {
              alert('Login successful!');
              navigate('/Profile');
          } else {
              alert('Login failed. Please check your credentials.');
          }
      } catch (error) {
          console.error('Error during login:', error);
      }
  };

  return (
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
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}
