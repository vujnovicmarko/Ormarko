import Header from "../Header/Header";
import LoggedInHeader from "../Header/LoggedInHeader";
import ItemDisplay from "../ItemDisplay/ItemDisplay";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <LoggedInHeader /> : <Header />}
        <div className="top-container">
            <Link to="/advertisers">
                <button className="advertisers-button">Oglasi</button>
            </Link>
            <h1 className="welcome-text">Dobrodošli u Ormarko!</h1>
        </div>
        <div className="items-container">
            <ItemDisplay />
      </div>
    </div>
  );
}
