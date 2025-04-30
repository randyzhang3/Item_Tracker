import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import FAQModal from "./components/modals/faq_modal";
import HelpButton from "./components/help_button";

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
      </div>
      <HelpButton helpButtonClick={helpButtonClick} />

      {/* FAQ Modal */}
      {showFAQ && <FAQModal setShowFAQ={setShowFAQ} />}

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
