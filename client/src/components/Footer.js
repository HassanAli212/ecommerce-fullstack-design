import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-danger fw-bold">
              <i className="bi bi-shop me-2"></i>ShopZone
            </h5>
            <p className="text-muted small">
              Your one-stop destination for all your shopping needs. Quality products at the best prices.
            </p>
          </div>
          <div className="col-md-2">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-muted text-decoration-none">Products</Link></li>
              <li><Link to="/cart" className="text-muted text-decoration-none">Cart</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-semibold">Categories</h6>
            <ul className="list-unstyled small">
              {['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`} className="text-muted text-decoration-none">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-semibold">Contact</h6>
            <ul className="list-unstyled small text-muted">
              <li><i className="bi bi-envelope me-2"></i>support@shopzone.com</li>
              <li><i className="bi bi-telephone me-2"></i>+1 (555) 000-0000</li>
              <li><i className="bi bi-geo-alt me-2"></i>Lahore, Pakistan</li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-muted small mb-0">
          © 2024 ShopZone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
