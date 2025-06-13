import { CursorTool } from "./CursorTool";
import { CursorState } from "./CursorState";
import { getToolByState } from "../utils/CursorHelpers";
import { renderCursorMenu } from "./CursorMenu";
import { IndexTool } from "./tools/tools";
import { renderColorPalette, unRenderColorPalette } from "../color/ColorMenu";

export default class Cursor {
	private static instance: Cursor;

	private positionX = 0;
	private positionY = 0;
	private cursorMenu: HTMLDivElement;
	private currentState: CursorState = CursorState.Normal;
	private currentTool: CursorTool = new IndexTool(); // Default
	private iconElement: HTMLElement;

	private constructor() {
		this.cursorMenu = document.createElement("div");
		this.iconElement = document.getElementById("iconCursorMenu")!;
		this.applyState();
	}

	public static getInstance(): Cursor {
		if (!this.instance) this.instance = new Cursor();
		return this.instance;
	}

	public setPositions(x: number, y: number): void {
		this.positionX = x;
		this.positionY = y;
	}

	public getX(): number {
		return this.positionX;
	}

	public getY(): number {
		return this.positionY;
	}

	public get tool(): CursorTool {
		return this.currentTool;
	}

	public setMenu(): void {
		if (document.body.contains(this.cursorMenu)) {
			document.body.removeChild(this.cursorMenu);
			return;
		}

		this.cursorMenu = renderCursorMenu(this.currentState, (state) =>
			this.selectCursor(state),
		);
		document.body.appendChild(this.cursorMenu);
	}

	public selectCursor(state: CursorState): void {
		this.currentState = state;
		this.currentTool = getToolByState(state);
		this.applyState();

		if (this.currentTool.canDraw()) renderColorPalette();
		else unRenderColorPalette();

		if (document.body.contains(this.cursorMenu)) {
			document.body.removeChild(this.cursorMenu);
		}
	}

	private applyState(): void {
		this.iconElement.className = `bi ${this.currentTool.getIcon()} fs-4`;
		document.body.style.cursor = this.currentTool.getCursorStyle();
	}
}
