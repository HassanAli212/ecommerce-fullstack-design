import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, { position: 'bottom-right', autoClose: 2000 });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : i < rating ? 'bi-star-half' : 'bi-star'} stars`}
        style={{ fontSize: '0.75rem' }}
      ></i>
    ));
  };

  return (
    <div className="card product-card shadow-sm h-100">
      <div className="overflow-hidden">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x220?text=No+Image'; }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <span className="category-badge mb-2">{product.category}</span>
        <h6 className="card-title fw-semibold mb-1 text-truncate">{product.name}</h6>
        <div className="d-flex align-items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <small className="text-muted">({product.numReviews})</small>
        </div>
        <p className="card-text text-muted small mb-3" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fs-5 fw-bold text-primary">${product.price}</span>
            <small className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </small>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="bi bi-cart-plus me-1"></i>Add to Cart
            </button>
            <Link to={`/products/${product._id}`} className="btn btn-outline-secondary btn-sm">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
