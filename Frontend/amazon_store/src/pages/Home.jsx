import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCartCount = async () => {
    try {
      const response = await api.get('/cart');
      const count = (response.data?.items || []).reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from API...");
        const response = await api.get('/products');
        console.log("Products received:", response.data);
        setProducts(response.data || []);
        setFilteredProducts(response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    fetchCartCount();
  }, []);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    if (!query || !query.toString().trim()) {
      setFilteredProducts(products);
      return;
    }
    const searchTerm = query.toString().toLowerCase().trim();
    const filtered = products.filter(product => 
      (product.name && product.name.toLowerCase().includes(searchTerm)) ||
      (product.category && product.category.toLowerCase().includes(searchTerm))
    );
    setFilteredProducts(filtered);
  };

  const addToCart = async (productId) => {
    try {
      await api.post('/cart', { productId, quantity: 1 });
      fetchCartCount();
      alert("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return (
    <div style={{ paddingBottom: '50px', backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <Navbar cartCount={cartCount} onSearch={handleSearch} />
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '1500px', margin: '0 auto' }}>
        <img 
          src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG2026/SMB/Mocks/April/Desktop_Hero_V3_2x._CB783771824_.jpg"
          alt="Banner" 
          style={{ 
            width: '100%', 
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            marginBottom: '-300px'
          }}
        />

        <div style={{ 
          padding: '0 20px 40px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px',
          position: 'relative',
          zIndex: 1
        }}>
          {loading ? (
            <p style={{ color: '#333', textAlign: 'center', gridColumn: '1/-1', background: 'white', padding: '50px' }}>Loading Amazon Storefront...</p>
          ) : (
            filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ scale: 1.01 }}
                  style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    height: '450px'
                  }}
                >
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ minHeight: '65px', overflow: 'hidden' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '5px', color: '#0f1111', lineHeight: '1.3' }}>
                        {product.name}
                        </h3>
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                      <img 
                        src={product.image?.[0] || 'https://via.placeholder.com/400'} 
                        alt={product.name} 
                        referrerPolicy="no-referrer"
                        style={{ maxWidth: '90%', maxHeight: '170px', objectFit: 'contain' }}
                      />
                    </div>
                  </Link>

                  <div style={{ height: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', verticalAlign: 'super', fontWeight: 'bold' }}>₹</span>
                      <span style={{ fontSize: '24px', fontWeight: '700' }}>{(product.price || 0).toLocaleString()}</span>
                      <span style={{ fontSize: '13px', verticalAlign: 'super', fontWeight: 'bold' }}>00</span>
                    </div>
                    
                    <p style={{ fontSize: '13px', color: '#565959', marginBottom: '10px' }}>
                      FREE delivery <b>Tomorrow</b>
                    </p>
                    
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="amazon-button-gold"
                      style={{ width: '100%', fontWeight: '500', fontSize: '13px', borderRadius: '50px', padding: '8px 0' }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', backgroundColor: 'white', borderRadius: '4px' }}>
                <h2 style={{ fontSize: '24px', color: '#333' }}>No products found.</h2>
                <p style={{ color: '#666' }}>Try searching for "iPhone" or "Asus". Current count: {products.length}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
