import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="main-wrapper text-light">
      <Navbar/>
      <div className="container-fluid">
        <div className="mt-3">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  )
};

export default Layout;