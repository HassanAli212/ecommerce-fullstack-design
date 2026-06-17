import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const EMPTY_FORM = {
  name: '', price: '', image: '', description: '',
  category: 'Electronics', stock: '', featured: false,
};

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'];

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products?limit=100');
      setProducts(data.products);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
      featured: product.featured,
    });
    setEditId(product._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image || !form.description || !form.stock) {
      toast.error('Please fill all required fields');
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/products/${editId}`, form);
        toast.success('Product updated!');
      } else {
        await api.post('/products', form);
        toast.success('Product added!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const stats = {
    total: products.length,
    featured: products.filter((p) => p.featured).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 admin-sidebar p-3 d-none d-md-block">
          <div className="text-center py-3 mb-3 border-bottom border-secondary">
            <i className="bi bi-speedometer2 fs-2 text-danger d-block"></i>
            <small className="text-white fw-bold">Admin Panel</small>
          </div>
          <nav className="nav flex-column">
            {[
              { key: 'products', icon: 'bi-box', label: 'Products' },
              { key: 'stats', icon: 'bi-bar-chart', label: 'Dashboard' },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                className={`nav-link btn btn-link text-start ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <i className={`bi ${icon} me-2`}></i>{label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              {activeTab === 'products' ? 'Product Management' : 'Dashboard'}
            </h4>
            {activeTab === 'products' && (
              <button className="btn btn-danger" onClick={openAdd}>
                <i className="bi bi-plus-lg me-2"></i>Add Product
              </button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Total Products', value: stats.total, icon: 'bi-box', color: 'primary' },
              { label: 'Featured', value: stats.featured, icon: 'bi-star', color: 'warning' },
              { label: 'Out of Stock', value: stats.outOfStock, icon: 'bi-exclamation-triangle', color: 'danger' },
              { label: 'Inventory Value', value: `$${stats.totalValue.toLocaleString()}`, icon: 'bi-currency-dollar', color: 'success' },
            ].map(({ label, value, icon, color }) => (
              <div className="col-6 col-md-3" key={label}>
                <div className={`card border-0 bg-${color} bg-opacity-10 border-start border-${color} border-3`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <small className="text-muted">{label}</small>
                        <h4 className="fw-bold mb-0">{value}</h4>
                      </div>
                      <i className={`bi ${icon} fs-2 text-${color} opacity-50`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Products Table */}
          {activeTab === 'products' && (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                {loading ? (
                  <div className="spinner-wrapper"><div className="spinner-border text-primary"></div></div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Featured</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=N/A'; }}
                                />
                                <span className="fw-medium">{product.name}</span>
                              </div>
                            </td>
                            <td><span className="category-badge">{product.category}</span></td>
                            <td className="fw-bold text-primary">${product.price}</td>
                            <td>
                              <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                                {product.stock}
                              </span>
                            </td>
                            <td>
                              {product.featured
                                ? <i className="bi bi-star-fill text-warning"></i>
                                : <i className="bi bi-star text-muted"></i>}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => openEdit(product)}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(product._id, product.name)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editId ? 'Edit Product' : 'Add New Product'}
                </h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Product Name *</label>
                    <input name="name" className="form-control" value={form.name} onChange={handleChange} placeholder="iPhone 15 Pro" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-medium">Price ($) *</label>
                    <input name="price" type="number" className="form-control" value={form.price} onChange={handleChange} placeholder="999" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-medium">Stock *</label>
                    <input name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} placeholder="50" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Image URL *</label>
                    <input name="image" className="form-control" value={form.image} onChange={handleChange} placeholder="https://..." />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Category *</label>
                    <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="featured"
                        className="form-check-input"
                        id="featured"
                        checked={form.featured}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="featured">Featured Product</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Description *</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows={3}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Product description..."
                    />
                  </div>
                  {form.image && (
                    <div className="col-12">
                      <label className="form-label fw-medium">Image Preview</label>
                      <img
                        src={form.image}
                        alt="preview"
                        className="d-block rounded"
                        style={{ height: 120, objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleSave} disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : 'Save Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
