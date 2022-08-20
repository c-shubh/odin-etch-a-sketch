import { Mode } from './Shared'

class Grid {
  private _size: number = 16;
  private _gridDOM: HTMLDivElement;

  private _mode: Mode = Mode.draw;
  public set mode(value: Mode) {
    this._mode = value;
  }
  
  private _evtListeners = {
    drawOrErase: (e: Event) => {
      if(this._mode === Mode.draw)
        (e.target as HTMLDivElement).style.backgroundColor = 'black';
      else if (this._mode === Mode.erase)
        (e.target as HTMLDivElement).style.backgroundColor = 'initial';
    },
  };

  constructor(gridDOM: HTMLDivElement, size?: number) {
    this._gridDOM = gridDOM;
    if (size) {
      // the default size is 16 which if changed,
      // should be modified in CSS too
      this._size = size;
      gridDOM.style.setProperty('--size', '' + size);
    }
  }

  private _newCell(): HTMLDivElement {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // leave a trail behind when hovering over the cells
    cell.addEventListener('mouseover', this._evtListeners.drawOrErase);
    return cell;
  }

  public paintGridToDOM() {
    for (let i = this._size ** 2; i >= 1; i--) {
      this._gridDOM.append(this._newCell());
    }
  }
}

export default Grid;
