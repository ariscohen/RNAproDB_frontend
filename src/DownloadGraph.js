// import ZoomFit from './ZoomFit.js';

const DownloadGraph = async (format, graphRef, pdbid, algorithm, setInitialTranslate, setInitialScale) => {
  // ZoomFit(0, setInitialTranslate, setInitialScale);

  setTimeout(async () => {
    const svgElement = graphRef.current.querySelector('svg');
    if (!svgElement) return;

    if (format === 'svg') {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pdbid}_${algorithm}_graph.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (format === 'png') {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0);

        const pngURL = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngURL;
        a.download = `${pdbid}_${algorithm}_graph.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      img.src = url;
    } else if (format === 'json') {
      try {
        const response = await fetch(`https://rohslab.usc.edu/rnaprodb-backend/rnaprodb/download_json/?pdbid=${pdbid}&algorithm=${algorithm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const graphData = await response.json();
        const blob = new Blob([JSON.stringify(graphData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pdbid}_${algorithm}_graph.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  }, 500);
};

export default DownloadGraph;
