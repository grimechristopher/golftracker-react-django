import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

const Navbar = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
        }

    }, []);

    return (
        <nav>
            <ul>
                <li key={1}>
                    <NavLink to="/" activeClassName="active-link" exact >Rounds</NavLink>
                </li>
                <li key={2}>
                    <NavLink to="/courses" activeClassName="active-link" exact >Courses</NavLink>
                </li>
                { loggedIn === true &&
                <>
                <li key={3}>
                    <NavLink to="/logout" activeClassName="active-link" exact >Logout</NavLink>
                </li>
                </>
                }
                { loggedIn != true &&
                <>
                <li key={3}>
                    <NavLink to="/login" activeClassName="active-link" exact >Login</NavLink>
                </li>
                <li key={4}>
                    <NavLink to="/signup" activeClassName="active-link" exact >Signup</NavLink>
                </li>
                </>
                }

            </ul>
        </nav>
    );
};

export default Navbar;