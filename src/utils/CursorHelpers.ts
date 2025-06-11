import { CursorState } from "../cursor/CursorState";
import {
	PenTool,
	IndexTool,
	BrushTool,
	BucketTool,
} from "../cursor/tools/tools";

export function iconByCursorState(state: CursorState): string {
	switch (state) {
		case CursorState.Normal:
			return "bi-hand-index";
		case CursorState.Pen:
			return "bi-pen";
		case CursorState.Brush:
			return "bi-brush";
		case CursorState.Bucket:
			return "bi-paint-bucket";
		default:
			return "bi-cursor";
	}
}

export function getToolByState(state: CursorState) {
	switch (state) {
		case CursorState.Pen:
			return new PenTool();
		case CursorState.Brush:
			return new BrushTool();
		case CursorState.Bucket:
			return new BucketTool();
		default:
			return new IndexTool(); // fallback
	}
}
