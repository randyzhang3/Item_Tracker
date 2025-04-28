import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const AnalyticsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, url, storeName } = location.state;
  
  const [threshold, setThreshold] = useState('');
  const [percentage, setPercentage] = useState('20');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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
      const newPercentage = ((product.currentPrice - newThreshold) / product.currentPrice) * 100;
      setPercentage(newPercentage.toFixed(2));
    }
  };

  const handlePercentageChange = (e) => {
    const newPercentage = e.target.value;
    setPercentage(newPercentage);
    if (product.currentPrice) {
      const newThreshold = product.currentPrice - (product.currentPrice * newPercentage / 100);
      setThreshold(newThreshold.toFixed(2));
    }
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmAlert = () => {
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Please provide a valid email.');
      return;
    }
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    navigate('/track', { state: { storeName } });
  };

  const handleChooseAnotherStore = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <div className="container py-5 text-center position-relative">
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center"
        style={{ width: '40px', height: '40px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <h1 className="mb-4">Analytics for {product.productName}</h1>
      <p>URL: {url}</p>
      <p>Current Price: ${product.currentPrice}</p>
      <p>52-Week High: ${product.fiftyTwoWeekHigh}</p>
      <p>52-Week Low: ${product.fiftyTwoWeekLow}</p>
      <p>Median Price: ${product.medianPrice}</p>

      <form onSubmit={handleAlertSubmit} className="d-flex flex-column align-items-center">
        <div className="form-group mb-3">
          <label htmlFor="threshold">Below what value should you be alerted:</label>
          <input
            type="number"
            className="form-control"
            id="threshold"
            value={threshold}
            onChange={handleThresholdChange}
            style={{ maxWidth: '200px' }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="percentage">What percent off would you like to be alerted:</label>
          <input
            type="number"
            className="form-control"
            id="percentage"
            value={percentage}
            onChange={handlePercentageChange}
            style={{ maxWidth: '200px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Set Alerts
        </button>
      </form>

      {showConfirmModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Your Alert</h5>
                  <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
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
                      setEmailError('');
                    }}
                  />
                  {emailError && <div className="text-danger mb-2">{emailError}</div>}
                  <p>Are you sure you want to be alerted when the price drops below <strong>${threshold}</strong>?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleConfirmAlert}>
                    Confirm Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {showSuccessModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-center">
                <div className="modal-header">
                  <h5 className="modal-title">Success!</h5>
                </div>
                <div className="modal-body">
                  <p>You have confirmed an alert for <strong>${threshold}</strong> at <strong>{email}</strong>.</p>
                  <p>What would you like to do next?</p>
                </div>
                <div className="modal-footer d-flex flex-column">
                  <button className="btn btn-primary mb-2 w-100" onClick={handleContinueShopping}>
                    Continue shopping at {storeName}
                  </button>
                  <button className="btn btn-outline-secondary w-100" onClick={handleChooseAnotherStore}>
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
