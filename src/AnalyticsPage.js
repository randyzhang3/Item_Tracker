import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const AnalyticsPage = () => {
  const location = useLocation();
  const { product, url } = location.state;
  const [threshold, setThreshold] = useState('');
  const [percentage, setPercentage] = useState('20');

  useEffect(() => {
    if (product.currentPrice) {
      const initialThreshold = product.currentPrice *0.8;
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
    console.log('Alert threshold set:', threshold);
    console.log('Percentage change set:', percentage);
    
  };

  return (
    <div className="container py-5 text-center">
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
    </div>
  );
};

export default AnalyticsPage;
