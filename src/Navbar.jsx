import React from 'react';
import { Link } from 'react-router-dom'
import logo from './assets/logo-project-tracker-resized.png';
import './assets/Navbar.scss';

const Navbar = ({logoutUser, isAuthenticated}) => {

  return (
    <div className="navbar-container">
      <img className="logo" src={logo} alt="Project Tracker Logo" />
      <nav className="navlinks-container">
        {isAuthenticated && 
          <>
            <Link className="navlink" to="/boards/new">Create a Board</Link>
            <Link className="navlink" to="/boards">My Boards</Link>
            <Link className="navlink" to="/login" onClick={logoutUser}>Logout</Link>
          </>
        }
        {!isAuthenticated && 
          <>
            <Link className="navlink" to="/login">Login</Link>
            <Link className="navlink" to="/signup">Signup</Link>
          </>
        }
      </nav>
    </div>
  )
}

export default Navbar;