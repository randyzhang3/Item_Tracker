import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FAQModal from "./components/modals/faq_modal";
import HelpButton from "./components/help_button";

const storeData = {
  Amazon: {
    img: "/images/amazon.svg",
    color: "#f7b733",
    urlPrefix: "https://www.amazon.com/",
  },
  Target: {
    img: "/images/target.png",
    color: "#fc4a1a",
    urlPrefix: "https://www.target.com/",
  },
  Walmart: {
    img: "/images/walmart.png",
    color: "#4facfe",
    urlPrefix: "https://www.walmart.com/",
  },
};

const UrlInputPage = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const storeName = location.state?.storeName;
  const store = storeData[storeName];

  useEffect(() => {
    fetch("/Dummy.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const validateUrl = (inputUrl) => {
    if (!inputUrl.startsWith(store?.urlPrefix)) {
      return `Please input a valid URL for ${storeName}`;
    }
    const match = products.find((product) => product.url === inputUrl);
    if (!match) {
      return `Product not found in our database for ${storeName}.`;
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      setSuccess(false);
    } else {
      setError("");
      setSuccess(true);
      const product = products.find((product) => product.url === url);
      navigate("/analytics", { state: { product, url, storeName } });
    }
  };

  const helpButtonClick = () => {
    if (!showFAQ) {
      setShowFAQ(true);
    } else {
      setShowFAQ(false);
    }
  };

  if (!store) return <div>Store not found.</div>;

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: "#F5F5F7",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate("/")}
        className="btn rounded-circle position-absolute m-3 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: store.color,
          width: "7vh",
          height: "7vh",
          top: "20px",
          left: "20px",
          border: "none",
        }}
      >
        <i
          className="bi bi-arrow-left text-white"
          style={{ fontSize: "3vh", fontWeight: "bold" }}
        ></i>
      </button>

      <div className="text-center" style={{ marginTop: "-40px" }}>
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            backgroundColor: store.color,
            width: "20vh",
            height: "20vh",
          }}
        >
          <img
            src={store.img}
            alt={storeName}
            style={{ height: "12vh", objectFit: "contain" }}
          />
        </div>

        <h1
          style={{
            color: store.color,
            fontWeight: "bold",
            marginBottom: "10px",
            fontSize: "5vh",
          }}
        >
          What product do you want to track?
        </h1>
        <p
          className="mb-4"
          style={{ fontSize: "2.5vh", color: "525252", opacity: 0.85 }}
        >
          We'll show you all the price info from the past 52 weeks.
        </p>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center w-100"
            style={{ maxWidth: "400px" }}
          >
            <div className="input-group mb-3 w-100">
              <input
                type="text"
                className={`form-control ${
                  error ? "is-invalid" : success ? "is-valid" : ""
                }`}
                placeholder={`Paste your ${storeName} URL here...`}
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: store.color,
                  border: "none",
                  padding: "0 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bi bi-arrow-right text-white"></i>
              </button>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            {success && (
              <div className="text-success mb-3">URL looks good!</div>
            )}
          </form>
        </div>
      </div>
      <HelpButton helpButtonClick={helpButtonClick} />

      {/* FAQ Modal */}
      {showFAQ && <FAQModal setShowFAQ={setShowFAQ} />}
    </div>
  );
};

export default UrlInputPage;
