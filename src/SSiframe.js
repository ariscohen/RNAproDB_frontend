import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SSiframe({ ss }) {
    const iframeRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleIframeLoad = () => {
        const message = {
            type: "SS_DATA",
            payload: ss
        };
        iframeRef.current.contentWindow.postMessage(message, "*");
    };

    // Add event listeners to prevent page scrolling
    useEffect(() => {
        const graphElement = document.getElementById('ss_graph_container');

        const preventDefault = (e) => e.preventDefault();

        if (graphElement) {
            // Disable touchmove and wheel events on the graph
            graphElement.addEventListener('touchmove', preventDefault, { passive: false });
            graphElement.addEventListener('wheel', preventDefault, { passive: false });
        }

        return () => {
            if (graphElement) {
                // Cleanup event listeners when component unmounts
                graphElement.removeEventListener('touchmove', preventDefault);
                graphElement.removeEventListener('wheel', preventDefault);
            }
        };
    }, []);

    const handleDownloadClick = (format) => {
        const svgElement = iframeRef.current.contentWindow.document.querySelector('svg');
        if (!svgElement) {
            console.error('SVG element not found in iframe.');
            return;
        }

        if (format === 'svg') {
            const serializer = new XMLSerializer();
            const svgBlob = new Blob([serializer.serializeToString(svgElement)], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'graph.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === 'png') {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const img = new Image();
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                const pngUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = pngUrl;
                link.download = 'graph.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            img.src = url;
        }
    };

    return (
        <div className="graph_container" id="ss_graph_container">
            <div className="download-container">
                <button className="download-button" onClick={() => setShowDropdown(!showDropdown)}>
                    Download
                </button>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <button onClick={() => handleDownloadClick('png')}>Download PNG</button>
                        <button onClick={() => handleDownloadClick('svg')}>Download SVG</button>
                    </div>
                )}
            </div>
            <iframe
                ref={iframeRef}
                className="responsive-iframe"
                src={`/ss_viewer.html`}
                title="Embedded HTML"
                width="100%"
                height="1000"
                scrolling="no"
                onLoad={handleIframeLoad}
            ></iframe>
        </div>
    );
}

export default SSiframe;