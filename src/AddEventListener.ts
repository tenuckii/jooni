import Canvas from "./Canvas";
import Cursor from "./Cursor";

const canIn= Canvas.getInstance();
const curIn= Cursor.getInstance();

document
	.getElementById("zoomInBtn")
	?.addEventListener("click", () => canIn.zoomIn());
document
	.getElementById("zoomOutBtn")
	?.addEventListener("click", () => canIn.zoomOut());

document
	.getElementById("cursorBtn")
	?.addEventListener("click", () => curIn.setMenu());

document.body.addEventListener("mousemove", (e) => {
	curIn.setPositions(e.clientX, e.clientY);
});

const canvas = Canvas.canvas;
const ctx = Canvas.ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
	if (!isDrawing) return;
	ctx!.beginPath();
	ctx!.moveTo(lastX, lastY);
	ctx!.lineTo(e.offsetX, e.offsetY);
	ctx!.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => {
	isDrawing = false;
});

canvas.addEventListener("click", () => {});
