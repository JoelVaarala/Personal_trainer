import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function Nav() {
    const naviStyle = {
        color: 'white'
    };

    return(
        <nav>
            <h3 style={naviStyle}>Personal trainer</h3>
            <ul className="nav-links">
                <Button variant="contained" color="primary">
                    <Link style={naviStyle} to='/customers'>
                        <li>Customers</li>
                    </Link>
                </Button>
                <Button variant="contained" color="primary">
                    <Link style={naviStyle} to='/trainings'>
                        <li>Trainings</li>
                    </Link>
                </Button>
            </ul>
        </nav>
    )
}