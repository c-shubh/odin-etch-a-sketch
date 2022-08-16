let gridSize = 16;

fillGrid();

function changeCellBGColor(e: Event) {
  (e.target as HTMLDivElement).style.backgroundColor = 'black';
}

function fillGrid() {
  const grid = <HTMLDivElement>document.querySelector('.cell-grid')!;
  const cellSize = grid.clientWidth / gridSize;
  // the .cell class sets the cell to value of this property
  grid.style.setProperty('--cellSize', cellSize + 'px');
  const numCells = gridSize ** 2;

  // create cells
  for (let i = 0; i < numCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    // leave a trail behind when hovering over the cells
    cell.addEventListener('mouseover', changeCellBGColor)
    grid.append(cell);
  }
}

export {};
