export interface CursorTool {
	getCursorStyle(): string;
	getIcon(): string;
	canDraw(): boolean;
}
