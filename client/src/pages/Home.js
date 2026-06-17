import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'];

const categoryIcons = {
  Electronics: 'bi-cpu',
  Clothing: 'bi-bag',
  Books: 'bi-book',
  Home: 'bi-house',
  Sports: 'bi-trophy',
  Beauty: 'bi-stars',
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setFeaturedProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="hero-badge">🔥 New Arrivals 2024</span>
              <h1 className="mb-3">
                Discover <span className="text-danger">Amazing</span> Products
              </h1>
              <p className="lead text-white-50 mb-4">
                Shop the latest trends in electronics, fashion, books, and more. 
                Best prices guaranteed with fast delivery.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/products" className="btn btn-danger btn-lg px-4">
                  <i className="bi bi-shop me-2"></i>Shop Now
                </Link>
                <Link to="/products?category=Electronics" className="btn btn-outline-light btn-lg px-4">
                  Explore Deals
                </Link>
              </div>
              <div className="d-flex gap-4 mt-4">
                <div className="text-center">
                  <h4 className="text-danger mb-0 fw-bold">500+</h4>
                  <small className="text-white-50">Products</small>
                </div>
                <div className="text-center">
                  <h4 className="text-danger mb-0 fw-bold">10K+</h4>
                  <small className="text-white-50">Customers</small>
                </div>
                <div className="text-center">
                  <h4 className="text-danger mb-0 fw-bold">99%</h4>
                  <small className="text-white-50">Satisfaction</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500"
                alt="Shopping"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: '380px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Shop by Category</h2>
          <div className="row g-3 justify-content-center">
            {categories.map((cat) => (
              <div className="col-4 col-md-2" key={cat}>
                <div
                  className="text-center p-3 rounded-3 border cursor-pointer"
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => navigate(`/products?category=${cat}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0d6efd';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = '#0d6efd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <i className={`bi ${categoryIcons[cat]} fs-2 d-block mb-1`}></i>
                  <small className="fw-medium">{cat}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-0">Featured Products</h2>
              <p className="text-muted mb-0">Hand-picked for you</p>
            </div>
            <Link to="/products" className="btn btn-outline-danger">
              View All <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          {loading ? (
            <div className="spinner-wrapper">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div className="col-6 col-md-4 col-lg-3" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="py-5 bg-danger text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-2">Special Offer — Up to 50% OFF!</h2>
          <p className="mb-4 opacity-75">Limited time deal on selected items. Don't miss out!</p>
          <Link to="/products" className="btn btn-light btn-lg px-5 fw-semibold text-danger">
            Shop the Sale
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
