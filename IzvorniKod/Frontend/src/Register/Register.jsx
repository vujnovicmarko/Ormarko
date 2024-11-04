import { useState } from 'react';
import "./Register.css"

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    city: '',
    country: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, such as sending data to your backend
    console.log('Form submitted:', formData);
  };

  return (
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
        <button type="submit">Registriraj se</button>
      </form>
    </div>
  );
}

