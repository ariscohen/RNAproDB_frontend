import React, { useState } from 'react';
import './Upload.css';

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

            // Fetch API to send the file to the server
            fetch('/rnaprodb-backend/rnaprodb/handle_upload/', { // Adjust the URL to match your Django route
                method: 'POST',
                body: formData,
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