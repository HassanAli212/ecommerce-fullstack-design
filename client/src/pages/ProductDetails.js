import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`, { position: 'bottom-right' });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : i < rating ? 'bi-star-half' : 'bi-star'} stars fs-5`}
      ></i>
    ));
  };

  if (loading) return (
    <div className="spinner-wrapper">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
    </div>
  );

  if (!product) return (
    <div className="container py-5 text-center">
      <h4 className="text-muted">Product not found</h4>
      <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
    </div>
  );

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Product Image */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm overflow-hidden rounded-4">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <span className="badge bg-secondary mb-2">{product.category}</span>
          {product.featured && <span className="badge bg-danger ms-2 mb-2">Featured</span>}
          <h2 className="fw-bold mb-2">{product.name}</h2>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-3">
            {renderStars(product.rating)}
            <span className="text-muted">({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <span className="fs-2 fw-bold text-primary">${product.price}</span>
          </div>

          {/* Description */}
          <p className="text-muted mb-4">{product.description}</p>

          {/* Stock */}
          <div className="mb-4">
            <span className={`badge fs-6 ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity & Add to Cart */}
          {product.stock > 0 && (
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center gap-2">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <i className="bi bi-dash"></i>
                </button>
                <span className="fw-bold fs-5 px-3">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>
              <button className="btn btn-danger px-5 py-2" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus me-2"></i>Add to Cart
              </button>
            </div>
          )}

          {/* Features */}
          <div className="row g-3 mt-2">
            {[
              { icon: 'bi-truck', text: 'Free Delivery over $50' },
              { icon: 'bi-arrow-return-left', text: '30-Day Returns' },
              { icon: 'bi-shield-check', text: '1 Year Warranty' },
              { icon: 'bi-credit-card', text: 'Secure Payment' },
            ].map(({ icon, text }) => (
              <div className="col-6" key={text}>
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <i className={`bi ${icon} text-primary`}></i>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/products" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
