import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const stores = [
  { name: "Amazon", img: "/images/amazon.svg", color: "#f7b733" },
  { name: "Target", img: "/images/target.png", color: "#fc4a1a" },
  { name: "Walmart", img: "/images/walmart.png", color: "#4facfe" },
];

const Homepage = () => {
  const navigate = useNavigate();
  const [showFAQ, setShowFAQ] = useState(false);

  const handleClick = (storeName) => {
    navigate("/track", { state: { storeName } });
  };

  const helpButtonClick = () => {
    if (!showFAQ) {
      setShowFAQ(true);
    } else {
      setShowFAQ(false);
    }
  };

  return (
    <div
      className="container-fluid py-5 d-flex flex-column align-items-center"
      style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }}
    >
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: "#333", fontSize: "36px" }}>
          Welcome
        </h1>
        <h2 className="fw-bold" style={{ color: "#3b82f6", fontSize: "32px" }}>
          Select a Retailer:
        </h2>
      </div>

      <div
        className="p-4"
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <div className="row justify-content-center">
          {stores.map((store) => (
            <div
              key={store.name}
              className="col-10 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
              onClick={() => handleClick(store.name)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex flex-column align-items-center">
                <div
                  style={{
                    backgroundColor: store.color,
                    borderRadius: "20px",
                    padding: "20px",
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={store.img}
                    alt={store.name}
                    style={{
                      maxWidth: "80%",
                      maxHeight: "80%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h5 style={{ fontSize: "16px", color: "#333" }}>
                    {store.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <button
            className="btn btn-primary rounded-circle"
            style={{
              width: "60px",
              height: "60px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={helpButtonClick}
          >
            ?
          </button>
        </div>
      </div>

      {showFAQ && (
        <div
          className="position-fixed top-50 start-50 translate-middle p-4"
          style={{
            backgroundColor: "#172F78",
            opacity: "0.85",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 1050,
            width: "40%",
            maxWidth: "800px",
          }}
        >
          <h3
            className="text-center mb-4"
            style={{ fontSize: "35px", color: "white" }}
          >
            Feeling Stuck?
          </h3>
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
              style={{ width: "50%" }}
              onClick={() => setShowFAQ(false)}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      <footer
        className="mt-auto text-center py-3"
        style={{ fontSize: "12px", color: "#888" }}
      >
        © Price Info Tracker. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Homepage;
