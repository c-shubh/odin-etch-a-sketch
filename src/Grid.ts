import { Mode, Tool } from './Shared';

class Grid {
  /* ============================== Properties ============================== */

  private size: number = 16;
  private gridDOM: HTMLDivElement;
  private tool: Tool = Tool.pencil;
  private mode: Mode = Mode.clickNDrag;

  // Functionality for the click-n-drag mode
  private clickNDrag = {
    mouseDown: false,
    // click
    mouseDownListener: (e: Event) => {
      this.clickNDrag.mouseDown = true;
      this.performToolActionOnCell(e.target as HTMLDivElement);
    },
    // drag
    mouseOverListener: (e: Event) => {
      if (this.clickNDrag.mouseDown === true)
        this.performToolActionOnCell(e.target as HTMLDivElement);
    },
    // release
    mouseUpListener: () => {
      this.clickNDrag.mouseDown = false;
    },
  };

  /* =========================== Public Functions =========================== */

  constructor(gridDOM: HTMLDivElement, size?: number) {
    this.gridDOM = gridDOM;
    if (size) {
      // the default size is 16 which if changed,
      // should be modified in CSS too
      this.size = size;
      gridDOM.style.setProperty('--size', '' + size);
    }
  }

  public insertGridToDOM() {
    for (let i = this.size ** 2; i >= 1; i--) {
      this.gridDOM.append(this.newCell());
    }
  }

  /* ========================== Private Functions =========================== */

  // Member functions cannot be used as callback to addEventListener
  // See: https://stackoverflow.com/questions/43727516/how-adding-event-handler-inside-a-class-with-a-class-method-as-the-callback/43727582#43727582

  private handleHoverMode = (e: Event) => {
    if (this.mode !== Mode.hover) return;
    this.performToolActionOnCell(e.target as HTMLDivElement);
  };
  private handleClickNDragMode = (e: Event) => {
    if (this.mode !== Mode.clickNDrag) return;
    switch (e.type) {
      case 'mousedown':
        this.clickNDrag.mouseDownListener(e);
        break;
      case 'mouseover':
        this.clickNDrag.mouseOverListener(e);
        break;
      case 'mouseup':
        this.clickNDrag.mouseUpListener();
        break;
    }
  };

  private performToolActionOnCell(cell: HTMLDivElement) {
    switch (this.tool) {
      case Tool.pencil:
        this.pencilDraw(cell);
        break;
      case Tool.eraser:
        this.erase(cell);
        break;
    }
  }

  private pencilDraw(cell: HTMLDivElement) {
    cell.style.backgroundColor = 'black';
  }

  private erase(cell: HTMLDivElement) {
    cell.style.backgroundColor = '';
  }

  private newCell(): HTMLDivElement {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // for hover drawing
    cell.addEventListener('mouseover', this.handleHoverMode);

    // for click-n-drag drawing
    cell.addEventListener('mousedown', this.handleClickNDragMode);
    cell.addEventListener('mouseover', this.handleClickNDragMode);
    cell.addEventListener('mouseup', this.handleClickNDragMode);
    cell.ondragstart = () => false;
    return cell;
  }

  /* =============================== Setters ================================ */

  public setTool(tool: Tool) {
    this.tool = tool;
  }

  public setMode(mode: Mode) {
    this.mode = mode;
  }
}

export default Grid;
