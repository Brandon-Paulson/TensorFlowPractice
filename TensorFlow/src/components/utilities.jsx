export const drawRect = (detections, ctx) => {
    detections.forEach(prediction => {
        //Get predictions from image array output
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];

        //styling
        const color = 'green'
        ctx.strokeStyle = color
        ctx.font = '18px Arial'
        ctx.fillStyle = color

        // Drawing the rectangles
        ctx.beginPath()
        ctx.fillText(text, x, y)
        ctx.rect(x, y, width, height)
        ctx.stroke()
    })

}