import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pdbIds, setPdbIds] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="relative isolate overflow-hidden bg-black w-full">
            <div
              className="absolute left-1/2 top-10 -z-10 transform -translate-x-1/2 blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#A2A0D3] to-[#A2A0D3] opacity-60"
              />
            </div>
      <div className="w-full px-6 pb-6 pt-10 sm:pb-8 lg:flex lg:px-8 lg:pt-30 lg:pb-10">
        <div className="w-full lg:pt-8 lg:pr-10">
          {/*<img
            className="h-20 mx-auto"
            src="/Logo.webp"
            alt="Rohs Lab"
          />*/}
          <div className="text-center">
            <h1 className="mt-6 text-lg leading-8 text-gray-100 sm:text-3xl">
              RNAproDB is a database and interactive exploration tool to analyze RNA-protein complexes.
            </h1>
          <p className="text-4xl font-bold tracking-tight text-white sm:text-xl">
              In addition to RNA-protein complexes, the collection also covers structures including DNA and NA-hybrids.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-6 lg:px-8 mb-10">
        <div className="flex justify-center">
          <Form className="w-full max-w-lg" onSubmit={handleSearch}>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Enter RNA-Protein Complex ID."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-md"
              />
            </Form.Group>
            <div className="text-center mt-4">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </div>
            {showNotFoundMessage && (
              <div className="mt-4 text-red-500 text-center">
                ID not found. Please try again.
              </div>
            )}
          </Form>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {['1IVS', '4OO8', '7ORN', '3TRZ', '7XWZ', '3LDY'].map((id) => (
            <Button
              key={id}
              variant="outline-light"
              onClick={() => window.location.href = `/rnaprodb/${id.toLowerCase()}`}
            >
              {id}
            </Button>
          ))}
        </div>
      </div>
          {/*<div className="w-full py-10 bg-[#A2A0D3] text-center mt-10 opacity-90">
        <p className="text-xl font-semibold text-white">
          RNAproDB is designed to be an interactive experience for a scieintist looking to investigate structural features of nucleic acids and protein nucleic acids complexes on the PDB. For every structure multiple different visualization modes are provided (principle projection, tertiary structure aware 2D mapping and secondary structure based). 
        </p>
      </div>*/}

      <div className="relative w-full px-6 pb-6 pt-5 sm:pb-4 lg:flex lg:px-8 lg:pt-10 lg:pb-5" style={{ backgroundColor: 'white' }}>
  <div
    className="absolute left-1/2 top-0 -z-10 transform -translate-x-1/2 blur-3xl"
    aria-hidden="true"
  >
    <div
      className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#B22222] to-[#B22222] opacity-20"
    />
  </div>
  <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:ml-40 lg:mr-40">
    <div className="w-full lg:pt-8 lg:pr-10">
      <h2 className="mt-10 text-4xl tracking-tight text-[#B22222] sm:text-2xl">
        Interactive explorer
      </h2>
      <p className="mt-6 text-xl text-bold leading-8 text-gray-600">
        <span className="highlight"></span>For every structure page RNAproDB provides an interactive explorer laying out the nucleic acid structure in 2D along with interacting protein residues. The user has a choice to select from three different algorithms: Projection based, Tertiary structure aware 2D mapping and secondary structure based mapping. The explorer provides information on Hydrogen bonds, water-mediated hydrogen bonds, information on modified nucleotides, mismatched base pairings and Leontis-Westhof base pairing classification. The interactive explorer is connected with the "Structure viewer" and "Sequence viewer" which are also presented in the same page. Additionally, subgraphs can be generated based on residue/nucleotide node selection by the user.
      </p>
    </div>
    <div className="flex justify-center lg:justify-end lg:pl-10">
      <div className="max-w-full lg:max-w-none">
        <img
          src="/rnaprodb/1asz.svg"
          alt="App screenshot"
          className="w-full h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3]"
        />
      </div>
    </div>
  </div>
</div>

      <div className="w-full h-1 bg-[#B22222]"></div>
      <div
        className="w-full px-6 pb-6 pt-5 sm:pb-4 lg:flex lg:px-8 lg:pt-10 lg:pb-5"
        style={{
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:ml-40 lg:mr-40">
          <div className="flex justify-center lg:justify-start lg:pr-10">
            <div className="max-w-full lg:max-w-none">
            <img
              src="/rnaprodb/1asz.png"
              alt="App screenshot"
              className="w-full h-auto rounded-md bg-white/5 shadow-2xl ring-1 ring-gray-200 border-8 border-[#A2A0D3]"
            />
            </div>
          </div>
          <div className="w-full lg:pt-8 lg:pl-10">
            <h2 className="mt-10 text-4xl tracking-tight text-[#B22222] sm:text-2xl">
              Sequence and structure viewer
            </h2>
            <p className="mt-6 text-xl text-bold leading-8 text-gray-600">
              <span className="highlight"></span> The sequence and 3D structure viewers are implemented to aid exporing the interactive interface visualization. Residues selected on sequence viewer are highlighted in the interactive explorer and also focused on in the structure viewer. Similarly, selections made on the interactive explorer is also brought to focus in the structure viewer. For visual clarity, options to hide solvent molecules and cartoon representation is available. 
            </p>
          </div>
        </div>
      </div>

          {/*<div
        className="w-full px-6 lg:px-8 mb-8"
      >
        <dl className="mt-16 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: 1,
              name: "Search",
              icon: "/search.svg",
              url: "/search",
            },
            {
              id: 2,
              name: "Advanced Search",
              icon: "/advanced_search.svg",
              url: "/search",
            },
            {
              id: 3,
              name: "Documentation",
              icon: "/documentation.svg",
              url: "/docs",
            },
          ].map((item) => (
            <a href={item.url} key={item.id} className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200">
              <img src={item.icon} alt={item.name} className="h-16 w-16 mb-4" />
              <dt className="text-base font-semibold leading-6 text-gray-800">{item.name}</dt>
            </a>
          ))}
        </dl>
      </div>*/}
    </div>
  );
};

export default Landing;
