import ColorContext from "../../color/ColorContext";
import DrawStrategy from "./DrawStrategy";

export default class PixelStrategy implements DrawStrategy {
	public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		ctx!.fillStyle = ColorContext.colorCtx.getColor();
		ctx!.fillRect(x, y, 1, 1);
	}
}
