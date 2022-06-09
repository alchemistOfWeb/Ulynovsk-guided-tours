import React from 'react';
import { Outlet, Link } from "react-router-dom";
import SNavbar from './components/SNavbar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <>
      <div className="main-wrapper text-light">
        <SNavbar/>
        <div className="container-fluid overflow-auto">
          {/* <div className="mt-3"> */}
            <Outlet />
          {/* </div> */}
        </div>
      </div>
      <Footer/>
    </>
  )
};

export default Layout;