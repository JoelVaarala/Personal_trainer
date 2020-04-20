import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

export default function Nav() {
    const navStyle = {
        color: 'white'
    };
    return(
        <nav>
            <h3 style={navStyle}>Personal trainer</h3>
            <ul className="nav-links">
                <Link style={navStyle} to='/customers'>
                    <li>Customers</li>
                </Link>
                <Link style={navStyle} to='/trainings'>
                    <li>Trainings</li>
                </Link>
            </ul>
        </nav>
    )
}