import React, { useState, useEffect } from 'react';
import './Table.css'
import { useParams } from 'react-router-dom';

function Table({data}) {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('JSON Data:', data);
        setActiveTab(Object.keys(data)[0]); // Set the first tab as active by default
      } catch (error) {
        console.error('Error fetching the JSON data:', error);
      }
    };

    fetchData();
  }, []);

  const renderTable = (key) => {
    if (!data[key]) return null;

    const rows = data[key].map((entry, index) => (
      <tr key={index}>
        {entry.split(',').map((cell, cellIndex) => (
          <td key={cellIndex}>{cell}</td>
        ))}
      </tr>
    ));

    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {data[key][0].split(',').map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows.slice(1)}</tbody>
        </table>
      </div>
    );
  };

  const handleDownloadCSV = () => {
    if (!data[activeTab]) return;

    const rows = data[activeTab];
    const csvContent = rows.map(row => row).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTab}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    if (!data[activeTab]) return;

    const jsonContent = JSON.stringify(data[activeTab], null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTab}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h5>Tabular data</h5>
      <div className="tabs">
        {Object.keys(data).map((key) => (
          <button key={key} onClick={() => setActiveTab(key)} className={activeTab === key ? 'active' : ''}>
            {key}
          </button>

        ))}
        <button onClick={handleDownloadCSV}>Download</button>
      </div>
      <div className="table-container">{renderTable(activeTab)}</div>
      <div className="download-buttons">
        {/* <button onClick={handleDownloadJSON}>Download JSON</button> */}
      </div>
    </div>
  );
}

export default Table;