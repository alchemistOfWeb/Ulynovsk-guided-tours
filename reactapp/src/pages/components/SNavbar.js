// import { Link } from "react-router-dom"
// import { crdRequest, getCookie, deleteCookie } from "../../functions";
// import { BACKEND_ROOT_URL } from "../../setting";
// import React from "react";


// async function logoutResponse () {
//     return
//     let headers = {'Authorization': getCookie('access_token')};
//     let url = `${BACKEND_ROOT_URL}auth/token/logout/`;
//     const res = await crdRequest('POST', url, {}, headers);    
//     return res;
// }

// function handleLogout() {
//     return
//     if (window.confirm('Do you really want to logout?')) {
//         logoutResponse()
//             .then((res)=>{
//                 console.log({res})
//                 window.user = undefined;
//                 deleteCookie('access_token');
//                 window.location.href = '/';
//             });
//     }
// }

// export default function Navbar() {
//     let UserBtns = null;
//     if (window.user) {
//         UserBtns = () => (
//             <>
//                 <Link 
//                     to="/personal" 
//                     role="button"
//                     className="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
//                     id="personal-btn"
//                 >
//                     Profile
//                 </Link>
//                 <Link 
//                     to="#logout" 
//                     role="button"
//                     className="btn btn-warning text-dark text-decoration-none"
//                     id="logout-btn"
//                     onClick={handleLogout}
//                 >
//                     Logout
//                 </Link>
//             </>
//         )
//     } else {
//         UserBtns = () => (
//             <>
//                 <Link 
//                     to="/signin" 
//                     role="button"
//                     className="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
//                     id="signin-btn"
//                 >
//                     Войти
//                 </Link>
//                 <Link 
//                     to="/signup" 
//                     role="button"
//                     className="btn btn-warning text-dark text-decoration-none"
//                     id="signup-btn"
//                 >
//                     Регистрация
//                 </Link>
//             </>
//         )
//     }

//     return (
//         <header className="p-3 bg-dark text-white">
//             <div className="container">
//                 <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
//                     <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                     <li>
//                         <Link to="/" className="nav-link px-2 text-secondary">Главная</Link>
//                     </li>
//                     <li>
//                         <Link to="/about" className="nav-link px-2 text-white">О нас</Link>
//                     </li>
//                     <li>
//                         <Link to="/rules" className="nav-link px-2 text-white">Правила</Link>
//                     </li>
//                     </ul>

//                     {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
//                     <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
//                     </form> */}

//                     <div className="text-end">
//                         <UserBtns/>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }








import { Link } from "react-router-dom"
import { crdRequest, getCookie, deleteCookie } from "../../functions";
import { BACKEND_ROOT_URL } from "../../setting";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


async function logoutResponse () {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}auth/token/logout/`;
    const res = await crdRequest('POST', url, {}, headers);    
    return res;
}

function handleLogout() {
    if (window.confirm('Do you really want to logout?')) {
        logoutResponse()
            .then((res)=>{
                console.log({res})
                window.user = undefined;
                deleteCookie('access_token');
                window.location.href = '/';
            });
    }
}

export default function SNavbar() {
    let UserBtns = null;
    if (window.user) {
        UserBtns = () => (
            <>
                <Link 
                    to="/personal" 
                    role="link"
                    className="signin-btn btn btn-outline-light me-2 text-decoration-none btn-dark-light"
                    id="personal-btn"
                >
                    Профиль
                </Link>
                <Link 
                    to="#logout" 
                    role="button"
                    className="register-btn btn btn-warning text-dark text-decoration-none"
                    id="logout-btn"
                    onClick={handleLogout}
                >
                    Выйти
                </Link>
            </>
        )
    } else {
        UserBtns = () => (
            <ul className="nav">
                <li>
                    <Link 
                        to="/signin" 
                        className="nav-link border border-light rounded me-2 text-decoration-none btn-dark-light"
                        id="signin-btn"
                    >
                        Войти
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/signup" 
                        className="nav-link rounded text-decoration-none"
                        id="signup-btn"
                    >
                        Регистрация
                    </Link>
                </li>
            </ul>
        )
    }

    return (
        <header 
        className="p-3 bg-dark text-white"
        style={{height: "58px"}}
        >
            <Navbar 
                className="fixed-top" 
                expand="md"
                variant="dark"
                id="header-navbar"
                // bg="dark"
            >
                <Container fluid className="justify-content-center">
                    {/* <Navbar.Brand href="/">Stepos</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="navbarCollapse"/>
                    <Navbar.Collapse id="navbarCollapse">
                        <Nav className="me-auto mb-2 mb-md-0 ">
                            {/* <Nav.Link href="/catalog">Каталог</Nav.Link> */}
                            <Nav.Link href="/">Главная</Nav.Link>
                            <Nav.Link href="/map">Карта</Nav.Link>
                            <Nav.Link href="/about">О нас</Nav.Link>
                            <Nav.Link href="/rules">Правила</Nav.Link>
                        </Nav>
                        {/* <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>                            
                        </Form> */}
                        <div className="text-end">
                            <UserBtns/>
                        </div>
                    </Navbar.Collapse>
                </Container>
                
                
            </Navbar>
        </header>
    )
}