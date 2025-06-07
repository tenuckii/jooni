export default class Canvas {
	private static instance: Canvas;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private zoom: number = 1;

	private constructor() {
		this.canvas = <HTMLCanvasElement>document.querySelector("canvas");
		this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
	}

	public static getInstance() {
		if (!this.instance) this.instance = new Canvas();
		return this.instance;
	}

	public static get canvas() {
		return this.getInstance().canvas;
	}

	public static get ctx() {
		return this.getInstance().ctx;
	}

	public zoomIn() {
		this.zoom += 0.1;
		this.updateZoom();
	}

	public zoomOut() {
		this.zoom = Math.max(0.1, this.zoom - 0.1); // Prevent negative zoom
		this.updateZoom();
	}

	private updateZoom() {
		this.canvas.style.transform = `scale(${this.zoom})`;
	}
}
