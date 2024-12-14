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

    if (erasing) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20; // Eraser size
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 2; // Pen size
        ctx.strokeStyle = '#000'; // Black
    }

    ctx.lineCap = 'round';
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
