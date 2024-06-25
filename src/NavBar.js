import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import gif from './loading2.gif'

function MainNavBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [pdbIds, setPdbIds] = useState([]);
    const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation(); // Get the current path

    useEffect(() => {
        fetch('/rnaprodb/ids.txt')
            .then(response => response.text())
            .then(text => {
                const ids = text.split(',').map(id => id.trim().toUpperCase());
                setPdbIds(ids);
            });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        if (pdbIds.includes(searchTerm.toUpperCase())) {
            setShowNotFoundMessage(false);
            setIsLoading(true); 
            setTimeout(() => {
                window.location.href = `/rnaprodb/${searchTerm}`; 
            }, 500); 
        } else {
            setShowNotFoundMessage(true);
            setSearchTerm(""); 
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary main-nav-bar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="site-title">RNAproDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/rnaprodb/search">Advanced Search</Nav.Link>
                        <Nav.Link as={Link} to="/rnaprodb/docs">Documentation</Nav.Link>
                    </Nav>
                    {location.pathname !== "/" && ( // Conditionally render search form
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                placeholder={showNotFoundMessage ? "PDB ID not found" : "Search by PDB ID"}
                                className={showNotFoundMessage ? "me-2 search-not-found" : "me-2"}
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
            {isLoading && <img src={gif} alt="Loading..." className="loading-gif" />} 
        </Navbar>
    );
}

export default MainNavBar;
