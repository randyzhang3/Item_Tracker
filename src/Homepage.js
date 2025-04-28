import React from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const stores = [
  { name: "Amazon", img: "/images/amazon.png" },
  { name: "Target", img: "/images/target.png" },
  { name: "Walmart", img: "/images/walmart.png" }
];

const Homepage = () => {
  const navigate = useNavigate();

  const handleClick = (storeName) => {
    navigate('/track', { state: { storeName } });
  };

  return (
    <div className="container py-5 text-center" style={{ backgroundColor: '#007bff', color: 'white', minHeight: '100vh', minWidth: '100vw' }}>
      <h1 className="mb-5 fw-bold">
        Select an online store you'd like to track an item from:
      </h1>
      <div className="row justify-content-center">
        {stores.map((store) => (
          <div
            key={store.name}
            className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4"
            onClick={() => handleClick(store.name)}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={store.img}
                alt={store.name}
                className="card-img-top p-4"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{store.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
