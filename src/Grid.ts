class Grid {
  size: number = 16;
  gridDOM: HTMLDivElement;
  evtListeners = {
    changeCellBGColor: function (e: Event) {
      (e.target as HTMLDivElement).style.backgroundColor = 'black';
    },
  };

  constructor(gridDOM: HTMLDivElement, size?: number) {
    this.gridDOM = gridDOM;
    if (size) {
      // the default size is 16 which if changed,
      // should be modified in CSS too
      this.size = size;
      gridDOM.style.setProperty('--size', '' + size);
    }
  }

  private newCell(): HTMLDivElement {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // leave a trail behind when hovering over the cells
    cell.addEventListener('mouseover', this.evtListeners.changeCellBGColor);
    return cell;
  }

  public paintGridToDOM() {
    for (let i = this.size ** 2; i >= 1; i--) {
      this.gridDOM.append(this.newCell());
    }
  }
}

export default Grid;
