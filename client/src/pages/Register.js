import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(data.user, data.token);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
                <i className="bi bi-person-plus display-4 text-danger"></i>
                <h3 className="fw-bold mt-2">Create Account</h3>
                <p className="text-muted">Join ShopZone today</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Muhammad Hassan"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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

                <div className="mb-3">
                  <label className="form-label fw-medium">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Repeat password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-danger w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>
                  ) : (
                    <><i className="bi bi-person-check me-2"></i>Register</>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-danger fw-semibold">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
