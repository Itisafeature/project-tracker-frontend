import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.scss';

const Navbar = () => {
  return(
    <div className="navbar-container">
      <img src="./../public/images/logo-project-tracker.png" alt="Project Tracker Logo" />
      <nav className="navlinks-container">
        <Link className="signup-link__nav" to="/signup">Signup</Link>
      </nav>
    </div>
  )
}

export default Navbar;