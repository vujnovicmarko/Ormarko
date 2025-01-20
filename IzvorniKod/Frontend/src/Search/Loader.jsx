import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
