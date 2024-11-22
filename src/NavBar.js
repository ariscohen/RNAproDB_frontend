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
        fetch('/rnaprodb-backend/rnaprodb/get-struct-list')
            .then(response => response.json())  // Parse response as JSON
            .then(data => {
                const ids = data.structures.split(',').map(id => id.trim().toUpperCase());
                setPdbIds(ids);
            })
            .catch(error => console.error('Error fetching structures:', error));
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
                <Navbar.Brand as={Link} to="/rnaprodb/" className="site-title">RNAproDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll">
                    <div style={{ width: '30px', height: '3px', backgroundColor: 'white', margin: '6px 0' }}></div>
                    <div style={{ width: '30px', height: '3px', backgroundColor: 'white', margin: '6px 0' }}></div>
                    <div style={{ width: '30px', height: '3px', backgroundColor: 'white', margin: '6px 0' }}></div>
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/rnaprodb/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/rnaprodb/search">Search</Nav.Link>
                        <Nav.Link as={Link} to="/rnaprodb/upload">Upload</Nav.Link>
                        <Nav.Link as={Link} to="/rnaprodb/docs">Documentation</Nav.Link>
                    </Nav>
                    {location.pathname !== "/" && ( // Conditionally render search form
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                placeholder={showNotFoundMessage ? "PDB ID not found" : "Enter a PDB ID (1un6)"}
                                className={showNotFoundMessage ? "me-2 search-not-found" : "me-2"}
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button className="white-text" variant="outline-success" type="submit">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
            {isLoading && <img src={gif} alt="Loading..." className="loading-gif" />} 
        </Navbar>
    );
}

export default MainNavBar;
