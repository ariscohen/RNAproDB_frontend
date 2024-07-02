import React, { useState } from 'react';
import './Upload.css';
import Cookies from 'js-cookie';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

function Upload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            console.log("File to upload:", file.name);

            // Create an instance of FormData
            const formData = new FormData();

            // Append the file to the FormData instance
            formData.append('file', file);

            // const csrftoken = Cookies.get('csrftoken');

            // Fetch API to send the file to the server
            fetch('/rnaprodb-backend/rnaprodb/handle_upload', { // Adjust the URL to match your Django route
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),  // Include CSRF token in the request header
                },
                credentials: 'include', 
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success, such as displaying a message or processing the response
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here
            });
        }
    };

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload your CIF or PDB file</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" onChange={handleFileChange} accept=".cif,.pdb" className="file-input"/>
                <button type="submit" className="upload-button">Upload File</button>
            </form>
        </div>
    );
}

export default Upload;