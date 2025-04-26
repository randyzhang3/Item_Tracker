import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const UrlInputPage = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const storeName = location.state?.storeName || 'Store';


  // We also need to add a section where if the actual link doesn't work, we send out the message as well
  // Most likely going to be a try/catch code block or function
  // Currently only handles looking to see if the link has the stores https but not if it actually works
  const validateUrl = (inputUrl) => {
    if (storeName === "Amazon" && !inputUrl.startsWith("https://www.amazon.com/")) {
      return "Please provide a valid link for Amazon.";
    }
    if (storeName === "Walmart" && !inputUrl.startsWith("https://www.walmart.com/")) {
      return "Please provide a valid link for Walmart.";
    }
    if (storeName === "Target" && !inputUrl.startsWith("https://www.target.com/")) {
      return "Please provide a valid link for Target.";
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
      setError('');
      setSuccess(true);
      console.log('URL to track:', url);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Enter the {storeName} item URL you want to track</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <input
          type="text"
          className={`form-control mb-2 ${error ? 'is-invalid' : success ? 'is-valid' : ''}`}
          placeholder="Paste product URL here..."
          style={{ maxWidth: '400px' }}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
            setSuccess(false);
          }}
        />
        {error && <div className="text-danger mb-3">{error}</div>}
        {success && <div className="text-success mb-3">URL looks good!</div>}
        <button type="submit" className="btn btn-primary">
          Track Item
        </button>
      </form>
    </div>
  );
};

export default UrlInputPage;
