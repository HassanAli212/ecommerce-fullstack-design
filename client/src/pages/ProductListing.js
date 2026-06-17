import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'];

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (categoryQuery && categoryQuery !== 'All') params.append('category', categoryQuery);
        params.append('page', page);
        params.append('limit', 12);

        const { data } = await api.get(`/products?${params}`);
        setProducts(data.products);
        setTotal(data.total);
        setPages(data.pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, categoryQuery, page]);

  const handleCategory = (cat) => {
    const params = {};
    if (cat !== 'All') params.category = cat;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
    setPage(1);
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Sidebar Filter */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-funnel me-2"></i>Categories
              </h6>
              <div className="d-flex flex-column gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm text-start ${categoryQuery === cat || (cat === 'All' && !categoryQuery) ? 'btn-danger' : 'btn-outline-secondary'}`}
                    onClick={() => handleCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-9">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-0">
                {categoryQuery !== 'All' ? categoryQuery : 'All Products'}
                {searchQuery && <span className="text-muted"> — "{searchQuery}"</span>}
              </h5>
              <small className="text-muted">{total} products found</small>
            </div>
          </div>

          {loading ? (
            <div className="spinner-wrapper">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
              <h5 className="text-muted">No products found</h5>
              <p className="text-muted">Try a different search or category</p>
            </div>
          ) : (
            <>
              <div className="row g-3">
                {products.map((product) => (
                  <div className="col-6 col-lg-4" key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
                      </li>
                      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                        <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                        </li>
                      ))}
                      <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
