import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UrlInputPage = () => {
    const stores = [
        { name: "Amazon", img: "/images/amazon.png" },
        { name: "Target", img: "/images/target.png" },
        { name: "Walmart", img: "/images/walmart.png" }
    ];
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [products, setProducts] = useState([]);
    
    const location = useLocation();
    const navigate = useNavigate();
    const storeName = location.state?.storeName;
    const store = stores.find(s => s.name === storeName);

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
            const product = products.find((product) => product.url === url);
            navigate('/analytics', { state: { product, url, storeName: store.name } });
        }
    };

    return (
        <div className="container py-5 text-center" style={{ backgroundColor: '#007bff', color: 'white', minHeight: '100vh', minWidth: '100vw' }}>
            <button
                onClick={() => navigate('/')}
                className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3 d-flex align-items-center justify-content-center"
                style={{ width: '10vh', height: '10vh' }}
            >
                <i className="bi bi-arrow-left"></i>
            </button>
            <img
                src={store.img}
                alt={store.name}
                style={{ height: "25vh", objectFit: "contain" }}
            />
            <div style={{ maxWidth: '50vw', margin: '0 auto' }}>
                <h1 style={{ fontSize: '6vh', marginBottom: '2vh' }}>What Product do you want to track?</h1>
                <h2 style={{ fontSize: '5vh' }}>We'll show you all the price information from the last 52 weeks.</h2>
            </div>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <input
                    type="text"
                    className={`form-control mb-2 ${error ? 'is-invalid' : success ? 'is-valid' : ''}`}
                    placeholder={`Place your ${store?.name} URL here.`}
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
