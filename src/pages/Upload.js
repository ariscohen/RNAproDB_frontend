import React, { useState } from 'react';
import './Upload.css';
// import Cookies from 'js-cookie';

function getCsrfToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

function Upload() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            setIsLoading(true); // Start loading
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
                setIsLoading(false); // Stop loading on success
                console.log('Success:', data);
                window.location = `${window.location.origin}/rnaprodb/${data.id}`;
            })
            .catch(error => {
                setIsLoading(false); // Stop loading on error
                console.error('Error:', error);
            });
        }
    };
    

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload your CIF file</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" onChange={handleFileChange} accept=".cif" className="file-input"/>
                <button type="submit" className="upload-button" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload File'}
                </button>
            </form>
            {isLoading && <div className="loading-spinner"></div>}
        </div>
    );
}

export default Upload;