import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const UrlInputPage = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const storeName = location.state?.storeName;

  useEffect(() => {
    fetch('/Dummy.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const validateStoreURL = (inputUrl) => {
    if (storeName === "Amazon" && !inputUrl.startsWith("https://www.amazon.com/")) {
      return false;
    }
    if (storeName === "Walmart" && !inputUrl.startsWith("https://www.walmart.com/")) {
      return false;
    }
    if (storeName === "Target" && !inputUrl.startsWith("https://www.target.com/")) {
      return false;
    }
    return true;
  };

  const validateUrl = (inputUrl) => {
    if (!validateStoreURL(inputUrl)) {
      return `Please input a valid URL for ${storeName}`;
    }

    const match = products.find((product) => product.url === inputUrl);
    if (!match) {
      console.log("not working")
      return `Product not found in our database for ${storeName}.`;
    }

    return '';
  };

  
const handleSubmit = async (e) => {
      e.preventDefault();
      const validationError = await validateUrl(url);
      if (validationError) {
        setError(validationError);
        setSuccess(false);
      } else {
        setError('');
        setSuccess(true);
        console.log('correct URL to track:', url);
        const product = products.find((product) => product.url === url);
        navigate('/analytics', { state: { product, url } });
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
