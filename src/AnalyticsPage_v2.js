import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, url, storeName } = location.state;

  const [threshold, setThreshold] = useState("");
  const [percentage, setPercentage] = useState("20");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (product.currentPrice) {
      const initialThreshold = product.currentPrice * 0.8;
      setThreshold(initialThreshold.toFixed(2));
    }
  }, [product.currentPrice]);

  const handleThresholdChange = (e) => {
    const newThreshold = e.target.value;
    setThreshold(newThreshold);
    if (product.currentPrice) {
      const newPercentage =
        ((product.currentPrice - newThreshold) / product.currentPrice) * 100;
      setPercentage(newPercentage.toFixed(2));
    }
  };

  const handlePercentageChange = (e) => {
    const newPercentage = e.target.value;
    setPercentage(newPercentage);
    if (product.currentPrice) {
      const newThreshold =
        product.currentPrice - (product.currentPrice * newPercentage) / 100;
      setThreshold(newThreshold.toFixed(2));
    }
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmAlert = () => {
    if (!email.trim() || !email.includes("@")) {
      setEmailError("Please provide a valid email.");
      return;
    }
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    navigate("/track", { state: { storeName } });
  };

  const handleChooseAnotherStore = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  // Dummy price history if not provided
  const dummyHistory = [
    { date: "Dec", price: product.fiftyTwoWeekLow },
    { date: "Jan", price: product.medianPrice + 10 },
    { date: "Feb", price: product.fiftyTwoWeekHigh },
    { date: "Mar", price: product.fiftyTwoWeekLow + 5 },
    { date: "Apr", price: product.currentPrice },
  ];
  const priceHistoryData =
    product.priceHistory && product.priceHistory.length > 0
      ? product.priceHistory
      : dummyHistory;

  return (
    <div
      className="container-fluid py-5 px-4"
      style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}
    >
      <button
        onClick={() => navigate("/track", { state: { storeName } })}
        className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center"
        style={{ width: "50px", height: "50px" }}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="row justify-content-center align-items-start">
        <div className="col-md-6">
          <div className="row">
            <p className="fw-bold text-primary text-center">
              Product Selected:{" "}
              <span className="text-dark">{product.productName}</span>
            </p>
          </div>

          <div className="row justify-content-center mt-2">
            <div className="col-md-4 text-center">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="img-fluid mb-3 shadow rounded"
                style={{ maxHeight: "400px" }}
              />
            </div>
            <div className="col-md-8 text-center">
              <div className="bg-white shadow rounded p-3 text-center">
                <p className="mb-1 text-muted small">Amazon.com</p>
                <h4 className="text-primary fs-2">Current Price:</h4>
                <h4>
                  <span className="fw-bold fs-1">${product.currentPrice}</span>
                </h4>
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                  <button className="btn btn-danger">
                    Target ${product.targetPrice || "82.37"}
                  </button>
                  <button className="btn btn-warning">
                    Walmart ${product.walmartPrice || "79.43"}
                  </button>
                  <button className="btn btn-secondary">
                    Etsy ${product.etsyPrice || "102.58"}
                  </button>
                  <button className="btn btn-info">
                    Alibaba ${product.alibabaPrice || "91.24"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-2">
            <div className="col-md-12 text-center">
              <div className="d-flex align-items-start bg-white shadow rounded p-4">
                <div className="flex-grow-1">
                  <p>
                    If the price drops below <strong>this amount:</strong>
                  </p>
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={threshold}
                    onChange={handleThresholdChange}
                  />
                  <p className="mt-3">
                    or by <strong>this percentage:</strong>
                  </p>
                  <input
                    type="number"
                    className="form-control"
                    value={percentage}
                    onChange={handlePercentageChange}
                  />
                </div>
                <button
                  onClick={handleAlertSubmit}
                  className="btn btn-primary ms-4 px-4 py-3"
                >
                  NOTIFY ME!
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-white shadow rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 text-muted small">Amazon.com</p>
              <h5 className="fw-bold">Past 52 Weeks:</h5>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={priceHistoryData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3366cc"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="d-flex justify-content-between mt-2 small">
              <span>
                Median:{" "}
                <span className="text-primary">${product.medianPrice}</span>
              </span>
              <span>
                Minimum:{" "}
                <span className="text-primary">${product.fiftyTwoWeekLow}</span>
              </span>
              <span>
                Maximum:{" "}
                <span className="text-primary">
                  ${product.fiftyTwoWeekHigh}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Your Alert</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowConfirmModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Enter your email to receive notifications:</p>
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                  {emailError && (
                    <div className="text-danger mb-2">{emailError}</div>
                  )}
                  <p>
                    Are you sure you want to be alerted when the price drops
                    below <strong>${threshold}</strong>?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmAlert}
                  >
                    Confirm Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-center">
                <div className="modal-header">
                  <h5 className="modal-title">Success!</h5>
                </div>
                <div className="modal-body">
                  <p>
                    You have confirmed an alert for{" "}
                    <strong>${threshold}</strong> at <strong>{email}</strong>.
                  </p>
                  <p>What would you like to do next?</p>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <button
                    className="btn btn-primary mb-2 w-100"
                    onClick={handleContinueShopping}
                  >
                    Continue shopping at {storeName}
                  </button>
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={handleChooseAnotherStore}
                  >
                    Choose another store
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
