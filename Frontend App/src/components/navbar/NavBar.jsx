import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <ul id="ul-nav">
            <li>
                <NavLink className='link-styles' to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className='link-styles' to="/about">About</NavLink>
            </li>
            <li>
                <NavLink className='link-styles' to="/members">Team</NavLink>
            </li>
        </ul>

    );
}

export default NavBar;