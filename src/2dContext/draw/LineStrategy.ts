import ColorContext from "../../color/ColorContext";
import DrawStrategy from "./DrawStrategy";

export default class LineStrategy implements DrawStrategy {
	public draw(
		ctx: CanvasRenderingContext2D,
		fromX: number,
		fromY: number,
		x: number,
		y: number,
	): void {
		ctx!.strokeStyle = ColorContext.colorCtx.getColor();
		ctx!.beginPath();
		ctx!.moveTo(fromX, fromY);
		ctx!.lineTo(x, y);
		ctx!.stroke();
	}
}
