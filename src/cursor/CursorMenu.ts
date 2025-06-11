import { CursorState } from "./CursorState";
import { iconByCursorState } from "../utils/CursorHelpers";

export function renderCursorMenu(
	current: CursorState,
	onClick: (state: CursorState) => void,
): HTMLDivElement {
	const menu = document.createElement("div");
	menu.classList.add("dock-style");
	menu.style.position = "absolute";

	Object.keys(CursorState)
		.filter((key) => !isNaN(Number(key)))
		.forEach((key) => {
			const state = Number(key) as CursorState;

			const btn = document.createElement("button");
			const icon = document.createElement("i");
			icon.className = `bi ${iconByCursorState(state)} fs-4`;
			if (state === current) icon.style.color = "gray";

			btn.classList.add("dock-item");
			btn.appendChild(icon);
			btn.addEventListener("click", () => onClick(state));

			menu.appendChild(btn);
		});

	const dock = document.getElementById("dock")!;
	const cursorBtn = document.getElementById("cursorBtn")!;
	requestAnimationFrame(() => {
		const top =
			cursorBtn.getBoundingClientRect().top +
			cursorBtn.offsetHeight / 2 -
			menu.offsetHeight / 2 +
			window.scrollY;
		const left = dock.getBoundingClientRect().right + 8;
		menu.style.top = `${top}px`;
		menu.style.left = `${left}px`;
	});

	return menu;
}
