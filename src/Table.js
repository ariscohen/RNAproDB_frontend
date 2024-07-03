import React, { useState, useEffect } from 'react';
import './Table.css'
import { useParams } from 'react-router-dom';

function Table(data) {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('JSON Data:', data);
        alert(data);
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

  return (
    <div>
      <div className="tabs">
        {Object.keys(data).map((key) => (
          <button key={key} onClick={() => setActiveTab(key)} className={activeTab === key ? 'active' : ''}>
            {key}
          </button>
        ))}
      </div>
      <div className="table-container">{renderTable(activeTab)}</div>
    </div>
  );
}

export default Table;
