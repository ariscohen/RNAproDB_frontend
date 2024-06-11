// import ZoomFit from './ZoomFit.js';

const DownloadGraph = async (format, graphRef, setInitialTranslate, setInitialScale) => {
    // ZoomFit(0, setInitialTranslate, setInitialScale);

    setTimeout(() => {
      const svgElement = graphRef.current.querySelector('svg');
      if (!svgElement) return;

      if (format === 'svg') {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph.svg';
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
          a.download = 'graph.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
        img.src = url;
      }
    }, 500);
};

export default DownloadGraph;
