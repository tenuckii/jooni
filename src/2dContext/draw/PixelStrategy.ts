import DrawStrategy from "./DrawStrategy";

export default class PixelStrategy implements DrawStrategy {
	public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		ctx!.fillRect(x, y, 1, 1);
	}
}
