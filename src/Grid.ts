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
      this.setSize(size);
    }
  }

  /**
   * Insert a grid to the DOM.
   */
  public insertGridToDOM() {
    this.appendCells(this.size ** 2);
  }

  /**
   * Apply the erase tool on all cells.
   */
  public eraseAllCells = () => {
    for (const cell of this.gridDOM.children) {
      this.erase(cell as HTMLDivElement);
    }
  };

  /**
   * Change the grid size and populate the grid with cells.
   */
  public changeSize(size: number) {
    this.setSize(size);
    this.deleteAllCells();
    this.appendCells(size ** 2);
  }

  /* ========================== Private Functions =========================== */

  // Member functions cannot be used as callback to addEventListener, so
  // use an arrow function expression.
  // See: https://stackoverflow.com/questions/43727516/how-adding-event-handler-inside-a-class-with-a-class-method-as-the-callback/43727582#43727582

  /**
   * Handle events for the hover mode.
   */
  private handleHoverMode = (e: Event) => {
    if (this.mode !== Mode.hover) return;
    this.performToolActionOnCell(e.target as HTMLDivElement);
  };

  /**
   * Handle events for the click-n-drag mode.
   */
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

  /**
   * Perform the selected tool's action on given `cell`.
   */
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

  /**
   * Draw on the cell.
   */
  private pencilDraw(cell: HTMLDivElement) {
    cell.style.backgroundColor = 'black';
  }

  /**
   * Erase the cell.
   */
  private erase(cell: HTMLDivElement) {
    cell.style.backgroundColor = '';
  }

  /**
   * Create and return a new 'cell' with added style classes and event
   * listeners.
   */
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

  /**
   * Set the grid size in this instance and the CSS.
   */
  private setSize(size: number) {
    this.size = size;
    this.gridDOM.style.setProperty('--size', '' + size);
  }

  /**
   * Append `n` cells to the grid.
   */
  private appendCells(n: number) {
    for (let i = 0; i < n; i++) {
      this.gridDOM.append(this.newCell());
    }
  }

  /**
   * Delete all cells from the grid.
   */
  private deleteAllCells() {
    this.gridDOM.replaceChildren();
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
