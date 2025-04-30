import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const FAQModal = ({ setShowFAQ }) => {
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="position-fixed top-50 start-50 translate-middle p-4"
        style={{
          backgroundColor: "#172F78",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          zIndex: 1050,
          width: "40%",
          maxWidth: "800px",
          minWidth: "500px",
        }}
      >
        <h3
          className="text-center"
          style={{ fontSize: "35px", color: "white" }}
        >
          Feeling Stuck?
        </h3>
        <p className="text-center mb-4" style={{ color: "#E0E0E0" }}>
          Here's a few common questions users have:
        </p>
        <div className="d-flex flex-row align-items-center gap-4 justify-content-center">
          <button
            className="btn btn-primary d-flex flex-column align-items-center"
            style={{ width: "140px", height: "140px" }}
          >
            <img
              src="images\faq_icons\gears-solid.svg"
              alt="Cog Icon"
              style={{
                width: "100px",
                height: "auto",
                marginBottom: "15px",
                marginTop: "5px",
              }}
            />
            How It Works
          </button>
          <button
            className="btn btn-primary d-flex flex-column align-items-center"
            style={{ width: "140px", height: "140px" }}
          >
            <img
              src="images\faq_icons\money-bill-trend-up-solid.svg"
              alt="Money Bill Icon"
              style={{
                width: "auto",
                height: "80px",
                marginBottom: "15px",
                marginTop: "5px",
              }}
            />
            Price Tracking
          </button>
          <button
            className="btn btn-primary d-flex flex-column align-items-center"
            style={{ width: "140px", height: "140px" }}
          >
            <img
              src="images\faq_icons\user-solid.svg"
              alt="User Icon"
              style={{
                width: "auto",
                height: "80px",
                marginBottom: "15px",
                marginTop: "5px",
              }}
            />
            Your Data
          </button>
        </div>
        <div className="text-center">
          <button
            className="btn btn-danger mt-4"
            style={{
              width: "50%",
            }}
            onClick={() => setShowFAQ(false)}
          >
            Close Window
          </button>
        </div>
      </div>
    </>
  );
};

export default FAQModal;
