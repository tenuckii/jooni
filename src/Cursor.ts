export default class Cursor {
	private static instance: Cursor;
	private state: CursorState;
	private positionX: number;
	private positionY: number;
	private cursorMenu: HTMLDivElement;

	private constructor() {
		this.state = CursorState.Normal;
		document.body.style.cursor = cssCursorByState(this.state);
		this.cursorMenu = document.createElement("div");
		this.positionX = 0;
		this.positionY = 0;
		let icon = document.getElementById("iconCursorMenu")!;
		icon.classList.forEach((cls) => icon.classList.remove(cls));
		icon.classList.add("bi", iconByCursorState(this.state), "fs-4");
	}

	public static getInstance() {
		if (!this.instance) this.instance = new Cursor();
		return this.instance;
	}

	public static get state() {
		return this.getInstance().state;
	}

	public setMenu() {
		if (document.body.contains(this.cursorMenu)) {
			document.body.removeChild(this.cursorMenu);
			return;
		}
		let cursorBtn = document.getElementById("cursorBtn")!;
		let dock = document.getElementById("dock")!;
		this.cursorMenu = document.createElement("div");
		this.cursorMenu.classList.add("dock-style");
		this.cursorMenu.style.position = "absolute";

		Object.keys(CursorState)
			.filter((key) => !isNaN(Number(key)))
			.forEach((key) => {
				const state = Number(key) as CursorState;
				const btn = document.createElement("button");
				const i = document.createElement("i");
				if (state == this.state) i.style.color = "gray";
				i.classList.add("bi", iconByCursorState(state), "fs-4");
				btn.classList.add("dock-item");
				btn.appendChild(i);
				btn.addEventListener("click", () => this.selectCursor(state));
				this.cursorMenu.appendChild(btn);
			});
		document.body.appendChild(this.cursorMenu);
		requestAnimationFrame(() => {
			this.cursorMenu.style.top = `${cursorBtn.getBoundingClientRect().top + cursorBtn.getBoundingClientRect().height / 2 - this.cursorMenu.getBoundingClientRect().height / 2 + window.scrollY}px`;
			this.cursorMenu.style.left = `${dock.getBoundingClientRect().right + 8}px`;
		});
	}

	public selectCursor(state: CursorState) {
		this.state = state;

		let icon = document.getElementById("iconCursorMenu")!;
		icon.classList.forEach((cls) => icon.classList.remove(cls));
		icon.classList.add("bi", iconByCursorState(this.state), "fs-4");
		document.body.style.cursor = cssCursorByState(state);
		if (document.body.contains(this.cursorMenu)) {
			document.body.removeChild(this.cursorMenu);
			return;
		}
	}

	public setPositions(x: number, y: number) {
		this.positionX = x;
		this.positionY = y;
	}
	public getX() {
		return this.positionX;
	}
	public getY() {
		return this.positionY;
	}
}

enum CursorState {
	Normal,
	pen,
	brush,
	bucket,
}

function iconByCursorState(state: CursorState) {
	switch (state) {
		case CursorState.Normal:
			return "bi-hand-index";
		case CursorState.pen:
			return "bi-pen";
		case CursorState.brush:
			return "bi-brush";
		case CursorState.bucket:
			return "bi-paint-bucket";
		default:
			return "bi-cursor";
	}
}

export function cssCursorByState(state: CursorState) {
	switch (state) {
		case CursorState.pen:
			return svgCursorByState(state);
		case CursorState.brush:
			return svgCursorByState(state);
		case CursorState.bucket:
			return svgCursorByState(state);
		case CursorState.Normal:
		default:
			return svgCursorByState(state);
	}
}

function svgCursorByState(state: CursorState): string {
	const svgMap: Record<CursorState, string> = {
		[CursorState.Normal]: svgToDataUri(
			`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-hand-index" viewBox="0 0 16 16"><path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025"/></svg>`,
			16,
			0,
		),
		[CursorState.pen]: svgToDataUri(
			`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg>`,
			0,
			32,
		),
		[CursorState.brush]: svgToDataUri(
			`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 16 16"><path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575z"/></svg>`,
			0,
			32,
		),
		[CursorState.bucket]: svgToDataUri(
			`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-paint-bucket" viewBox="0 0 16 16"><path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a3 3 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1 1 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4 4 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067S8.857 3.052 8.23 2.704c-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.3 3.3 0 0 1-.131-.673q.137.09.337.274m.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088q.081.181.183.365c.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626q.183.103.365.183l-4.861 4.862-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46s-1.168-1.32-1.46-1.846c-.147-.265-.225-.47-.251-.607l-.01-.068zm2.87-1.935a2.4 2.4 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.5 3.5 0 0 0-1.066.091 11 11 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/></svg>`,
			16,
			16,
		),
	};

	return svgMap[state];
}

function svgToDataUri(svg: string, x: number, y: number): string {
	const encoded = encodeURIComponent(svg)
		.replace(/'/g, "%27")
		.replace(/"/g, "%22");

	return `url("data:image/svg+xml,${encoded}") ${x} ${y}, auto`;
}
