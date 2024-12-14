const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Tool state
let activeTool = 'pen'; // Default tool is the pen

// Set the active tool
function setTool(tool) {
    activeTool = tool;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
}

// Start drawing, adding text, or stamping hearts
function startDrawing(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    if (activeTool === 'text') {
        const text = prompt("Enter your text:");
        if (text) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, x, y);
        }
    } else if (activeTool === 'heart') {
        drawHeart(x, y);
    } else if (activeTool === 'pen' || activeTool === 'eraser') {
        drawing = true;
        draw(e);
    }
}

// Stop drawing
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

// Draw or erase
function draw(e) {
    if (!drawing || activeTool !== 'pen' && activeTool !== 'eraser') return;

    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = activeTool === 'eraser' ? 20 : 2; // Eraser is thicker than pen
    ctx.lineCap = 'round';
    ctx.strokeStyle = activeTool === 'eraser' ? 'rgba(255,255,255,1)' : '#000'; // Pen is black

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Draw a heart at specified coordinates
function drawHeart(x, y) {
    ctx.save();
    ctx.fillStyle = "#ff0000"; // Red color
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - 15, y - 15, x - 15, y + 10, x, y + 20);
    ctx.bezierCurveTo(x + 15, y + 10, x + 15, y - 15, x, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Event listeners for mouse and touch events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Buttons for switching tools
document.getElementById('penButton').addEventListener('click', () => setTool('pen'));
document.getElementById('eraserButton').addEventListener('click', () => setTool('eraser'));
document.getElementById('textButton').addEventListener('click', () => setTool('text'));
document.getElementById('heartButton').addEventListener('click', () => setTool('heart'));
