import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { Button, Form } from 'react-bootstrap';

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pdbIds, setPdbIds] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/ids.txt')
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
        window.location.href = `/${searchTerm}`;
      }, 500);
    } else {
      setShowNotFoundMessage(true);
      setSearchTerm("");
    }
  };

  return (
    <div className="row landing-container">
      <div className="col">
        <h1 className="text-center landing-description">
          RNAProDB is a database, structure processing pipeline and visualization tool to analyze RNA-protein complexes.
        </h1>
        <p className="text-center search-subtitle">
          Start searching RNA-protein complexes right now!
        </p>
        <Form className="d-flex justify-content-center search-form" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder={showNotFoundMessage ? "PDB ID not found" : "Search by PDB ID. EX) 1ivs"}
            className={showNotFoundMessage ? "me-2 search-not-found" : "me-2"}
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success" type="submit" className="search-button">Search</Button>
        </Form>

        <div className="image-row">
          <div className="image-feature">
            <img src="/sample.png" className="image" alt="DNA Protein 3D" />
            <h3><span className="highlight">Search</span> thousands of DNA-protein complex structures based on features of the DNA, protein or DNA-protein interactions.</h3>
          </div>
          <div className="image-feature">
            <img src="/sample.png" className="image" alt="DNA Protein LCM" />
            <h3><span className="highlight">Visualize</span> data using customizable, interactive visualizations. These can be exported for use in publications, or used as a data exploration tool.</h3>
          </div>
          <div className="image-feature">
            <img src="/sample.png" className="image" alt="DNA Protein PCM" />
            <h3><span className="highlight">Visualize</span> data using customizable, interactive visualizations. These can be exported for use in publications, or used as a data exploration tool.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
