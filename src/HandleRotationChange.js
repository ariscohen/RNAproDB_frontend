// HandleRotationChange.js

const HandleRotationChange = (e, initialTranslate, initialScale, dimensions) => {
    const rotationDegree = e.target.value;
    document.getElementById('rotation_value').value = rotationDegree;
    const svgElement = document.querySelector("#right_column svg g");

    if (svgElement) {
        const currentTransform = svgElement.getAttribute("transform") || "";
        const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
        const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);

        const translate = translateMatch ? translateMatch[1] : initialTranslate;
        const scale = scaleMatch ? scaleMatch[1] : initialScale;

        svgElement.setAttribute("transform", `translate(${translate}) scale(${scale}) rotate(${rotationDegree}, ${dimensions.width / 2}, ${dimensions.height / 2})`);
    }
};

export default HandleRotationChange;
