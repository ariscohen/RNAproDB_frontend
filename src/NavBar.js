import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
    <nav className="nav">
        <Link to= "/" className="site-title">RNAproDB </Link>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/search">Search</Link>
            </li>
            <li>
                <Link to="/docs">Documentation</Link>
            </li>
        </ul>
    </nav>
    )
}