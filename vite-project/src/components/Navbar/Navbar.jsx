

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
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
        <Link to="/">About</Link>
        {/* <Link to="/Profile">Profile</Link> */}
      </div>
      <div className="nav-links1">
        <Link to="/login">Login/SignUp</Link>
      </div>
    </nav></>
   
  );
};

export default Navbar;

