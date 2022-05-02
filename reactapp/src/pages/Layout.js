import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">          
          <li className="nav-item">
            <Link to="/" className='nav-link active' aria-current="page">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className='nav-link'>About</Link>
          </li>
        </ul>
      </header>
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;