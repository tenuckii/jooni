import DrawContext from "./2dContext/draw/DrawContext";
import { PixelStrategy } from "./2dContext/draw/lib";
import Canvas from "./Canvas";
import Cursor from "./cursor/Cursor";
import { IndexTool } from "./cursor/tools/IndexTool";

const drawCtx = new DrawContext(null, Canvas.ctx);

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
	if (!curIn.tool.canDraw() || e.ctrlKey) return;
	drawCtx.setStrategy(new PixelStrategy());
	drawCtx.draw(e.offsetX, e.offsetY);
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
	if (!curIn.tool.canDraw() || !isDrawing || e.ctrlKey) return;
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

let indexTool = new IndexTool().getCursorStyleFill();

document.getElementById("dock")!.style.cursor = indexTool;
document
	.getElementById("dock")!
	.querySelectorAll("*")
	.forEach((el) => {
		(el as HTMLElement).style.cursor = indexTool;
	});

window.addEventListener("load", () => {
	// Get viewport size
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	// Calculate scale factor to make canvas take ~50% of window (based on smaller side)
	const scaleFactor =
		0.5 *
		Math.min(viewportWidth / canvas.width, viewportHeight / canvas.height);

	// Clear and reset transformations
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	// Translate to center
	const centerX = viewportWidth / 2 - canvas.width / 2;
	const centerY = viewportHeight / 2 - canvas.height / 2;

	canIn.updateTransformAll(centerX, centerY, scaleFactor);
});
