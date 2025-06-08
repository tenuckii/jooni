import Canvas from "./Canvas";
import Cursor from "./Cursor";

const canIn = Canvas.getInstance();
const curIn = Cursor.getInstance();

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
	if (Cursor.state === 0 || e.ctrlKey) return;
	isDrawing = true;
	ctx!.fillRect(e.offsetX,e.offsetY,1,1);
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
	if (Cursor.state === 0 || !isDrawing || e.ctrlKey ) return;
	ctx!.beginPath();
	ctx!.moveTo(lastX, lastY);
	ctx!.lineTo(e.offsetX, e.offsetY);
	ctx!.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => {
	isDrawing = false;
});

window.addEventListener(
	"wheel",
	function (e) {
		if (e.ctrlKey) {
			e.preventDefault();
			canIn.ctrlZoom(e.deltaY);
		}
	},
	{ passive: false },
);

let mouseDown = false;
let startX = 0;
let startY = 0;

window.addEventListener("mousedown", (e) => {
	mouseDown = true;
	startX = e.clientX;
	startY = e.clientY;
});
window.addEventListener("mouseup", () => {
	if (mouseDown) {
		canIn.setTranslations();
	}
	mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
	if (mouseDown && e.ctrlKey) {
		canIn.moveCanvas(e, startX, startY);
	}
});
