import React from 'react';
import { Link } from 'react-router-dom'
import logo from './assets/logo-project-tracker-resized.png';
import './assets/Navbar.scss';

const Navbar = () => {
  return(
    <div className="navbar-container">
      <img className="logo" src={logo} alt="Project Tracker Logo" />
      <nav className="navlinks-container">
        <Link className="signup-link__nav" to="/signup">Signup</Link>
      </nav>
    </div>
  )
}

export default Navbar;