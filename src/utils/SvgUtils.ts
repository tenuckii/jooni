export function svgToDataUri(svg: string, x: number, y: number): string {
	const encoded = encodeURIComponent(svg)
		.replace(/'/g, "%27")
		.replace(/"/g, "%22");

	return `url("data:image/svg+xml,${encoded}") ${x} ${y}, auto`;
}
