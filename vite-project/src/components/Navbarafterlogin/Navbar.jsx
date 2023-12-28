import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar1 = ({ onLogout }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const handleLogoutClick = () => {
    // Call the onLogout function passed from App component
    onLogout();
    // Optionally, navigate to the login page or any other desired page
    navigate('/login');
  };

  return (
    <>
      <nav className={`navbar ${isActive ? 'active' : ''}`}>
        <div className="logo">Your Logo</div>
        <div className="hamburger-menu" onClick={toggleNavbar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {/* <Link to="/">About</Link> */}
          <Link to="/Profile">Profile</Link>
        </div>
        <div className="nav-links1">
          <Link to="/login" onClick={handleLogoutClick}>
            Logout
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar1;
