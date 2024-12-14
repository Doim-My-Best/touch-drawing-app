const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Drawing state
let drawing = false;
let erasing = false;

// Set up drawing or erasing
function setMode(isErasing) {
    erasing = isErasing;
    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
}

// Start drawing or erasing
function startDrawing(e) {
    drawing = true;
    draw(e);
}

// Stop drawing or erasing
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

// Draw or erase
function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = erasing ? 20 : 2; // Eraser is thicker than pen
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? 'rgba(255,255,255,1)' : '#000'; // Pen is black

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Event listeners for mouse and touch events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Buttons for switching modes
document.getElementById('penButton').addEventListener('click', () => setMode(false));
document.getElementById('eraserButton').addEventListener('click', () => setMode(true));
