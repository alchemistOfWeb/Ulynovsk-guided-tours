import React from 'react';
import { Outlet, Link } from "react-router-dom";
import SNavbar from './components/SNavbar';
import Footer from './components/Footer';
import { userRequest } from '../functions';
import { useAsync } from 'react-async';


const Layout = () => {
    const { data, error, isPending } 
            = useAsync({ promiseFn: userRequest });

    if (isPending) {
        return <h1>Loading user...</h1>
    }
    if (error) {
        console.log({error});
        console.log('Error of loading user');
    }
    if (data) { 
        console.log({user: data});
        window.user = data.user;
    }
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