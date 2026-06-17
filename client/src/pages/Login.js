import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-shop display-4 text-danger"></i>
                <h3 className="fw-bold mt-2">Welcome Back</h3>
                <p className="text-muted">Login to your ShopZone account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-danger w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</>
                  ) : (
                    <><i className="bi bi-box-arrow-in-right me-2"></i>Login</>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="text-danger fw-semibold">Register</Link>
              </div>

              {/* Demo credentials */}
              <div className="alert alert-light border mt-4 small mb-0">
                <strong>Demo Credentials:</strong><br />
                Admin: admin@ecommerce.com / admin123<br />
                User: user@ecommerce.com / user123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
