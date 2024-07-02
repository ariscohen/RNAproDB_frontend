import React, { useState } from 'react';
import './Upload.css';
import Cookies from 'js-cookie';

function getCsrfToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
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
            formData.append('file', file); // 'file' is the key your backend will look for

            // Append the file to the FormData instance
            const csrftoken = getCsrfToken();

            fetch('/rnaprodb-backend/rnaprodb/handle_upload', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include', // Ensures cookies are sent with the request
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data)
            // window.location = `${window.location.origin}/rnaprodb/${data.id}`
        })
        .catch(error => console.error('Error:', error));
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