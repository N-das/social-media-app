// Loader.js
import React from "react";
import "./Loader.css"; // Import CSS file for styling

const Loader = ({ loading }) => {
  if (!loading) return null; // Do not render if loading is false

  return (
    <div className="loader-container">
      {/* Your loader design */}
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
