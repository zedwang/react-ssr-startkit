import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return <div className="header">
        <Link to="/">Home</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">Profile</Link>
    </div>;
}