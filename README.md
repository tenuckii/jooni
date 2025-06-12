# jooni

A browser-based drawing canvas written in TypeScript. The project uses Parcel for bundling and Bootstrap Icons for UI elements.

## Features

- **Interactive canvas:** Event listeners in `AddEventListener.ts` handle drawing and zoom controls​:codex-file-citation[codex-file-citation]{line_range_start=12 line_range_end=61 path=src/AddEventListener.ts git_url="https://github.com/tenuckii/jooni/blob/master/src/AddEventListener.ts#L12-L61"}​​:codex-file-citation[codex-file-citation]{line_range_start=64 line_range_end=94 path=src/AddEventListener.ts git_url="https://github.com/tenuckii/jooni/blob/master/src/AddEventListener.ts#L64-L94"}​.
- **Custom cursor tools:** The cursor class supports multiple states such as Pen, Brush, and Bucket, defined in `CursorHelpers.ts`​:codex-file-citation[codex-file-citation]{line_range_start=1 line_range_end=34 path=src/utils/CursorHelpers.ts git_url="https://github.com/tenuckii/jooni/blob/master/src/utils/CursorHelpers.ts#L1-L34"}​.
- **Zooming and panning:** Methods `zoomIn`, `zoomOut`, and `moveCanvas` in `Canvas.ts` manage canvas scaling and translation​:codex-file-citation[codex-file-citation]{line_range_start=44 line_range_end=80 path=src/Canvas.ts git_url="https://github.com/tenuckii/jooni/blob/master/src/Canvas.ts#L44-L80"}​.
- **Bootstrap-based interface:** `index.html` sets up the canvas and dock UI with Bootstrap styles and icons​:codex-file-citation[codex-file-citation]{line_range_start=7 line_range_end=34 path=index.html git_url="https://github.com/tenuckii/jooni/blob/master/index.html#L7-L34"}​.

## Getting started

1. Install dependencies: `npm install`
2. Launch a development server: `npm start` (runs `parcel index.html --open`)​:codex-file-citation[codex-file-citation]{line_range_start=5 line_range_end=7 path=package.json git_url="https://github.com/tenuckii/jooni/blob/master/package.json#L5-L7"}​
3. Open the application in your browser (Parcel automatically opens it).

## Directory overview

- `src/Canvas.ts` – Canvas management and transformations.
- `src/AddEventListener.ts` – Registers mouse and wheel events.
- `src/cursor/` – Cursor state machine and drawing tools.
- `src/2dContext/draw/` – Drawing strategies (e.g., `PixelStrategy`​:codex-file-citation[codex-file-citation]{line_range_start=1 line_range_end=7 path=src/2dContext/draw/PixelStrategy.ts git_url="https://github.com/tenuckii/jooni/blob/master/src/2dContext/draw/PixelStrategy.ts#L1-L7"}​).
- `styles.css` – Basic page styling and layout.
- `index.html` – HTML entry point and UI dock.

## Formatting

Run `npm run format` to apply Prettier formatting.

## Deployment

The repository contains a `CNAME` file indicating the site is deployed to `jooni.world`​:codex-file-citation[codex-file-citation]{line_range_start=1 line_range_end=null path=CNAME git_url="https://github.com/tenuckii/jooni/blob/master/CNAME#L1-Lnull"}​.
