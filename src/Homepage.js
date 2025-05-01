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
      style={{ backgroundColor: "#F5F5F7", minHeight: "100vh" }}
    >
      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div className="text-center mb-3">
          <h2
            className="fw-semibold"
            style={{
              color: "#525252",
              fontSize: "35px",
              opacity: 0.85,
              marginBottom: "0px",
            }}
          >
            Welcome in!
          </h2>
          <h1
            className="fw-bold"
            style={{
              fontSize: "65px",
              background: "linear-gradient(to bottom, #2C6FFF, #2138A8)",
              opacity: 0.85,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Select a Retailer:
          </h1>
        </div>

        <div
          className="p-4"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
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
                      width: "180px",
                      height: "180px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 12px rgba(0,0,0,0.15)",
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
                    <h5 style={{ fontSize: "24px", color: "#333" }}>
                      {store.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <HelpButton helpButtonClick={helpButtonClick} />
      </div>

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
