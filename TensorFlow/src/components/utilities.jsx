export const drawRect = (detections, boundingBoxDimensions) => {
    detections.forEach(prediction => {
        //Get predictions from image array output
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];

        //styling

        const color = 'green';
        boundingBoxDimensions.strokeStyle = color
        boundingBoxDimensions.font = '18px Arial'
        boundingBoxDimensions.fillStyle = color

        // Drawing the rectangles
        boundingBoxDimensions.beginPath()
        boundingBoxDimensions.fillText(text, x, y)
        boundingBoxDimensions.rect(x, y, width, height)
        boundingBoxDimensions.stroke()
    })

}