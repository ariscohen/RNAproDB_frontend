import React, { useState } from 'react';
import './Upload.css';

function getCsrfToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

function Upload() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State to hold error message

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError(null); // Clear error message when user selects a new file
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            const csrftoken = getCsrfToken();

            fetch('/rnaprodb-backend/rnaprodb/handle_upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                console.log('Success:', data);
                window.location = `${window.location.origin}/rnaprodb/${data.id}`;
            })
            .catch(error => {
                setIsLoading(false);
                setError('Error: File upload failed. Please ensure the file is a biological assembly CIF or PDB file containing RNA. It should be under 10 MB and properly formatted.'); // Set error message
                console.error('Error:', error);
            });
        }
    };

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload</h1>
            <p>The file should be a CIF or PDB biological assembly file containing nucleic acids. Files up to 10 MB are currently supported to ensure informative visualizations.</p>
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" onChange={handleFileChange} accept=".cif, .pdb" className="file-input"/>
                <button type="submit" className="upload-button" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload File'}
                </button>
            </form>
            {isLoading && <div className="loading-spinner"></div>}
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
        </div>
    );
}

export default Upload;