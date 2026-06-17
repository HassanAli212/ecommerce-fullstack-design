import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`, { position: 'bottom-right', autoClose: 2000 });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x display-1 text-muted d-block mb-3"></i>
        <h3 className="fw-bold mb-2">Your cart is empty</h3>
        <p className="text-muted mb-4">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-danger btn-lg px-5">
          <i className="bi bi-shop me-2"></i>Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-cart3 me-2 text-danger"></i>Shopping Cart
        <small className="text-muted fs-6 ms-2">({cartItems.length} items)</small>
      </h2>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              {cartItems.map((item, idx) => (
                <div
                  key={item._id}
                  className={`cart-item px-4 ${idx === 0 ? 'pt-3' : ''}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=N/A'; }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="fw-semibold mb-1">{item.name}</h6>
                      <small className="text-muted">{item.category}</small>
                      <div className="text-primary fw-bold mt-1">${item.price}</div>
                    </div>
                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="fw-bold px-2">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    {/* Subtotal */}
                    <div className="text-end" style={{ minWidth: '80px' }}>
                      <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    {/* Remove */}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(item._id, item.name)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => { clearCart(); toast.info('Cart cleared'); }}
                >
                  <i className="bi bi-trash3 me-1"></i>Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span className="text-success">{cartTotal >= 50 ? 'FREE' : '$9.99'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax (8%)</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span className="text-primary">
                  ${(cartTotal + (cartTotal < 50 ? 9.99 : 0) + cartTotal * 0.08).toFixed(2)}
                </span>
              </div>
              <button className="btn btn-danger w-100 btn-lg mb-2">
                <i className="bi bi-credit-card me-2"></i>Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-outline-secondary w-100">
                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
              </Link>
              {cartTotal < 50 && (
                <div className="alert alert-info mt-3 py-2 small mb-0">
                  <i className="bi bi-truck me-1"></i>
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
