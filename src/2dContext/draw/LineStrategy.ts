import DrawStrategy from "./DrawStrategy";

export default class LineStrategy implements DrawStrategy {
	public draw(
		ctx: CanvasRenderingContext2D,
		fromX: number,
		fromY: number,
		x: number,
		y: number,
	): void {
		ctx!.beginPath();
		ctx!.moveTo(fromX, fromY);
		ctx!.lineTo(x, y);
		ctx!.stroke();
	}
}
