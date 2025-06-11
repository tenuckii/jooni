import DrawStrategy from "./DrawStrategy";

export default class DrawContext {
	constructor(
		private strategy: DrawStrategy | null,
		private ctx: CanvasRenderingContext2D,
	) {}
	setStrategy(strategy: DrawStrategy) {
		this.strategy = strategy;
	}

	draw(...args: any[]) {
		if (!this.strategy) throw Error("Strategy needs to be define");
		// if (!this.cursor.AbleToDraw()) return;
		this.strategy!.draw(this.ctx, ...args);
	}
}
