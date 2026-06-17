import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search.trim()}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <i className="bi bi-shop me-2"></i>ShopZone
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search */}
          <form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSearch} style={{ width: '40%' }}>
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Nav Links */}
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <i className="bi bi-grid me-1"></i>Products
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="bi bi-cart3 fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Auth */}
            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name.split(' ')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        <i className="bi bi-speedometer2 me-2"></i>Admin Panel
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-danger btn-sm" to="/login">
                  <i className="bi bi-person me-1"></i>Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
