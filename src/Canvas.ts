export default class Canvas {
	private static instance: Canvas;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private scale: number = 1;
	private translateX = 0;
	private translateY = 0;

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
		this.scale += 0.1;
		this.updateTransform();
	}

	public zoomOut() {
		this.scale = Math.max(0.1, this.scale - 0.1);
		this.updateTransform();
	}

	private updateTransform() {
		this.canvas.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
	}
	private updateTransformFromDeltas(deltaX: number, deltaY: number) {
		this.canvas.style.transform = `translate(${this.translateX - deltaX}px, ${this.translateY - deltaY}px) scale(${this.scale})`;
	}

	public ctrlZoom(deltaY: number) {
		const delta = deltaY > 0 ? -0.1 : 0.1;
		this.scale += delta;
		this.scale = Math.max(0.1, Math.min(this.scale, 5));
		this.updateTransform();
	}

	public setTranslations() {
		const transform = this.canvas.style.transform;
		const match = transform.match(/translate\((-?\d+)px,\s*(-?\d+)px\)/);
		if (match) {
			this.translateX = parseInt(match[1], 10);
			this.translateY = parseInt(match[2], 10);
		}
	}

	public moveCanvas(e: MouseEvent, startX: number, startY: number) {
		const deltaX = e.clientX - startX;
		const deltaY = e.clientY - startY;
		this.updateTransformFromDeltas(deltaX, deltaY);
	}
}
