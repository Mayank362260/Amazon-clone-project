import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, MapPin } from 'lucide-react';

const Navbar = ({ cartCount = 0, onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const userStr = localStorage.getItem('amazon_user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('amazon_token');
    localStorage.removeItem('amazon_user');
    window.location.reload();
  };

  return (
    <nav style={{ backgroundColor: '#131921', color: 'white' }}>
      {/* Upper Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', gap: '20px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <img 
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
            alt="Amazon" 
            style={{ width: '100px', objectFit: 'contain', marginTop: '10px' }} 
          />
          <span style={{ 
            fontSize: '12px', 
            color: '#febd69', 
            position: 'absolute', 
            bottom: '-12px', 
            right: '0', 
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            CLONE
          </span>
        </Link>

        {/* Deliver To */}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}>
           <MapPin size={18} style={{ marginRight: '4px' }}/>
           <div>
              <p style={{ color: '#ccc', fontSize: '12px' }}>Deliver to</p>
              <strong>India</strong>
           </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <select style={{ height: '40px', padding: '0 10px', backgroundColor: '#f3f3f3', border: 'none', borderRadius: '4px 0 0 4px', cursor: 'pointer' }}>
            <option>All</option>
          </select>
          <input 
            type="text" 
            placeholder="Search Amazon"
            value={query}
            onChange={handleSearch}
            style={{ flex: 1, height: '40px', border: 'none', padding: '0 15px', fontSize: '15px', outline: 'none' }} 
          />
          <button style={{ backgroundColor: '#febd69', height: '40px', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}>
            <Search size={22} color="#333"/>
          </button>
        </div>

        {/* Account & Orders */}
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
          {user ? (
            <div style={{ cursor: 'pointer' }}>
              <p style={{ color: '#ccc', fontSize: '12px' }}>Hello, {user.name}</p>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                Account & Lists
                <span 
                  onClick={handleLogout} 
                  style={{ color: '#febd69', textDecoration: 'underline', fontSize: '11px' }}
                >
                  Sign Out
                </span>
              </strong>
            </div>
          ) : (
            <Link to="/auth" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
              <p style={{ color: '#ccc', fontSize: '12px' }}>Hello, sign in</p>
              <strong>Account & Lists</strong>
            </Link>
          )}
          
          <div style={{ cursor: 'pointer' }}>
            <p style={{ color: '#ccc', fontSize: '12px' }}>Returns</p>
            <strong>& Orders</strong>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" style={{ display: 'flex', alignItems: 'flex-end', color: 'white', position: 'relative' }}>
          <ShoppingCart size={32}/>
          <span style={{ 
            position: 'absolute', 
            top: '-5px', 
            left: '15px', 
            backgroundColor: '#f08804', 
            color: 'white', 
            borderRadius: '50%', 
            padding: '2px 6px', 
            fontSize: '12px' 
          }}>
            {cartCount}
          </span>
          <strong style={{ marginLeft: '5px' }}>Cart</strong>
        </Link>
      </div>

      {/* Sub-Header */}
      <div style={{ backgroundColor: '#232f3e', padding: '5px 20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '20px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Menu size={20}/>
            <strong>All</strong>
         </div>
         <p>Today's Deals</p>
         <p>Customer Service</p>
         <p>Registry</p>
         <p>Gift Cards</p>
         <p>Sell</p>
      </div>
    </nav>
  );
};

export default Navbar;
