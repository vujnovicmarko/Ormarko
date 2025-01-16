import { Link } from "react-router-dom";
import "../Header/Header.css";

export default function MarketerListHeader() {
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" src="/OrmarkoLogo.png" alt="Logo"/>
                </Link>
            </div>
            <h1 className="header-title">Galerija oglašivača</h1>
        </div>
    );
}