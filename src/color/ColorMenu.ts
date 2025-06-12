export function renderColorPalette(){
	if(document.getElementById("colorPalette") !== null) return
	const dock = document.getElementById("dock")!;
	const button = document.createElement("button");
	const icon = document.createElement("i");
	icon.className = "bi bi-palette fs-4";
	icon.id = "colorPalette";
	button.classList.add("dock-item");
	button.id = "colorPaletteBtn"
	button.appendChild(icon);
    dock.insertBefore(button, dock.children[1]);
}
export function unRenderColorPalette() {
	const colorPalette = document.getElementById("colorPaletteBtn");
	if (colorPalette) {
		colorPalette.remove();
	}
}
