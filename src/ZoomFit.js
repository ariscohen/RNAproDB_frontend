// zoomFit.js
import * as d3 from 'd3';

const ZoomFit = (transitionDuration, setInitialTranslate, setInitialScale) => {
    const svg = d3.select("#right_column").select("svg");

    if (!svg.node()) {
        return;
    }

    const root = svg.select('g');
    const zoom = d3.zoom()
        .scaleExtent([1, 1]) // Set scale extent to [1, 1] to prevent zooming
        .on('zoom', ({ transform }) => {
            root.attr('transform', transform);
        });

    const bounds = svg.node().getBBox();
    const parent = svg.node().parentElement;
    const fullWidth = parent.clientWidth || parent.parentNode.clientWidth;
    const fullHeight = parent.clientHeight || parent.parentNode.clientHeight;

    const midX = bounds.x + bounds.width / 2;
    const midY = bounds.y + bounds.height / 2;
    const scale = 0.85 / Math.max(bounds.width / fullWidth, bounds.height / fullHeight);
    const translate = [
        fullWidth / 2 - scale * midX,
        fullHeight / 2 - scale * midY
    ];

    if (setInitialTranslate) setInitialTranslate(translate);
    if (setInitialScale) setInitialScale(scale);

    // Ensure the initial transform does not zoom in unexpectedly
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(...translate).scale(1)); // Adjust initial scale to 1
};

export default ZoomFit;