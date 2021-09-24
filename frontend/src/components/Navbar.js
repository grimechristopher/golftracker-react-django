import React, { useState } from "react"
import { NavLink } from "react-router-dom"

const links = [
    {
      id: 1,
      path: "/",
      text: "Rounds",
    },
    {
      id: 2,
      path: "/courses",
      text: "Courses",
    },
]

const Navbar = () => {
    return (
        <nav>
            <ul>
                {links.map(link => {
                return (          
                    <li key={link.id}>
                    <NavLink to={link.path} activeClassName="active-link" exact >{link.text}</NavLink>
                    </li>
                )
                })}
            </ul>
        </nav>
    );
};

export default Navbar;