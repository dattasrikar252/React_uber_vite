import React,{ useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import RiderRegistration from './components/Register/Rider/RRider';
import Registration from './components/Register/User/RUser';
import ProfilePage from './components/Profile/Profile';
import Navbar1 from './components/Navbarafterlogin/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const handleLogin = () => {
    // Logic to handle successful login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Logic to handle logout
    setIsAuthenticated(false);
  };

  return (
    <>
    <React.Fragment>
    <Router>
    {isAuthenticated ? (
            <Navbar1 onLogout={handleLogout} />
          ) : (
            <Navbar onLogin={handleLogin} />
          )}

      <Routes>
        {/* <Route path="/login" element={<Login />} />  */}
        <Route
      path="/login"
      element={<Login onLogin={handleLogin} setToken={setToken} />} // Pass onLogin prop to Login component
    />
        <Route path="/RiderRegistration" element={<RiderRegistration />} /> 
        <Route path="/UserRegistration" element={<Registration />} /> 
        <Route path="/Profile"  element={<ProfilePage token={token} />} /> 
      </Routes>
      <Footer />
    </Router>
  </React.Fragment>
    </>
  )
}

export default App
