import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PeopleIcon from '@material-ui/icons/People';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EqualizerIcon from '@material-ui/icons/Equalizer';

export default function Nav() {

    const naviStyle = { color: 'white' };
    const liStyle = { textDecoration: 'none', color: 'white' }

    return (
        <nav>
            <h2 style={naviStyle}>Personal trainer</h2>
            <ul className="nav-links">
                <Button variant="contained" startIcon={<PeopleIcon />} color="primary">
                    <Link to='/customers' style={liStyle}>
                        <li className="li">Customers</li>
                    </Link>
                </Button>
                <Button variant="contained" startIcon={<FitnessCenterIcon />} color="primary">
                    <Link to='/trainings' style={liStyle}>
                        <li>Trainings</li>
                    </Link>
                </Button>
                <Button variant="contained" startIcon={<EventNoteIcon />} color="primary">
                    <Link to='/calendary' style={liStyle}>
                        <li>Calendary</li>
                    </Link>
                </Button>
                <Button variant="contained" startIcon={<EqualizerIcon />} color="primary">
                    <Link to='/charts' style={liStyle}>
                        <li>Charts</li>
                    </Link>
                </Button>
            </ul>
        </nav>
    )
}