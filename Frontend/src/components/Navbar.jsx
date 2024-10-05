import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../css/Navbar.css';

export default function Navbar() {
    const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="nav-parent">
            <nav className='nav-small'>
                <Link to="/"><i className="fa-solid fa-house"></i></Link>
                <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <div className="btn-group">
                    <button type="button" className='user-icon' data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user" style={{ fontSize: "1.2rem", color: "white" }}></i>
                    </button>
                    <ul className="dropdown-menu">
                        {!isAuthenticated() ? (
                            <>
                                <li>
                                    <Link to="/signup" className="dropdown-item">Sign Up</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="dropdown-item">Login</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {isAdmin && (
                                    <li>
                                        <Link to="/adminPage" className="dropdown-item">Admin Dashboard</Link>
                                    </li>
                                )}
                                <li>
                                    <button className="dropdown-item" style={{ cursor: 'pointer', marginBottom: '0px' }} onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '20px' }}></i> Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Link to="/settings">
                    <i className="fa-solid fa-gear"></i>
                </Link>
            </nav>
        </div>
    );
}
