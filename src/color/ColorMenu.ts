import ColorContext from "./ColorContext";

export function renderColorPalette() {
	if (document.getElementById("colorPalette") !== null) return;
	const dock = document.getElementById("dock")!;
	const button = document.createElement("button");
	const icon = document.createElement("i");
	const picker = document.createElement("input");
	picker.type = "color";
	picker.className = "hidden-input";
	picker.id = "colorPicker";
	icon.className = "bi bi-palette fs-4";
	icon.id = "colorPalette";
	button.classList.add("dock-item");
	button.id = "colorPaletteBtn";
	button.appendChild(icon);
	button.appendChild(picker);
	dock.insertBefore(button, dock.children[1]);
	button.addEventListener("click", () => openPicker());
	picker.addEventListener("input", (e) => colorSelected(e));
}
export function unRenderColorPalette() {
	const colorPalette = document.getElementById("colorPaletteBtn");
	if (colorPalette) {
		colorPalette.remove();
	}
}

function openPicker() {
	const picker = document.getElementById("colorPicker")!;
	picker.click();
}
function colorSelected(e: any) {
	const icon = document.getElementById("colorPalette")!;
	icon.style.color = e.target.value;
    ColorContext.getInstance().setSolor(e.target.value);
}
