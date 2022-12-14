import Grid from './Grid';
import { Mode, Tool } from './Shared';

const grid = new Grid(<HTMLDivElement>document.querySelector('.cell-grid'));
grid.insertGridToDOM();

const pencilRadio = document.getElementById('pencil')!;
const eraserRadio = document.getElementById('eraser')!;
const hoverRadio = document.getElementById('hover')!;
const clickNDragRadio = document.getElementById('click-n-drag')!;
const clearButton = document.getElementById('clear')!;
const sizeInput = document.getElementById('size')!;

function handleToolChange(e: Event) {
  const tool = (e.target as HTMLInputElement).value;
  switch (tool) {
    case 'pencil':
      grid.setTool(Tool.pencil);
      break;
    case 'eraser':
      grid.setTool(Tool.eraser);
      break;
  }
}

function handleModeChange(e: Event) {
  const mode = (e.target as HTMLInputElement).value;
  switch (mode) {
    case 'click-n-drag':
      grid.setMode(Mode.clickNDrag);
      break;
    case 'hover':
      grid.setMode(Mode.hover);
      break;
  }
}

function handleSizeChange(e: Event) {
  grid.changeSize(parseInt((e.target as HTMLInputElement).value));
}

[pencilRadio, eraserRadio].forEach((radio) =>
  radio.addEventListener('click', handleToolChange)
);

[hoverRadio, clickNDragRadio].forEach((radio) =>
  radio.addEventListener('click', handleModeChange)
);

clearButton.addEventListener('click', grid.eraseAllCells);
sizeInput.addEventListener('change', handleSizeChange);

export {};
