export default interface DrawStrategy {
	draw(ctx: CanvasRenderingContext2D, ...args: any[]): void;
}
