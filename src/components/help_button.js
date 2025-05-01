import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const HelpButton = ({ helpButtonClick }) => {
  return (
    <div
      className="position-fixed"
      style={{
        bottom: "50px",
        right: "50px",
        zIndex: 1000,
      }}
    >
      <button
        className="btn btn-primary rounded-circle"
        style={{
          width: "70px",
          height: "70px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={helpButtonClick}
      >
        <img
          src="images\faq_icons\question-solid.svg"
          alt="Help Icon"
          style={{ width: "auto", height: "35px" }}
        />
      </button>
    </div>
  );
};

export default HelpButton;
