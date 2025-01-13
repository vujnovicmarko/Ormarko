import { Link, useNavigate } from "react-router-dom";

export default function MarketerLoggedHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch("/logout", { method: "POST", credentials: "include" }).then(() => {
            navigate("/"); // Povratak na početnu stranicu
        });
    };

    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" src="/OrmarkoLogo.png" alt="Logo" />
                </Link>
            </div>
            <div className="headerbtndiv">
                <Link to="/marketer-gallery">
                    <button className="headerbtn">Moj Ormar</button>
                </Link>
                <button className="headerbtn" onClick={handleLogout}>
                    Odjavi se
                </button>
            </div>
        </div>
    );
}
