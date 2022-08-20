import Grid from './Grid';
import { Mode } from './Shared';

const grid = new Grid(<HTMLDivElement>document.querySelector('.cell-grid'));
grid.paintGridToDOM();

const drawRadio = document.getElementById('draw')!;
const eraseRadio = document.getElementById('erase')!;

function handleModeChange(e: Event) {
  const mode = (e.target as HTMLInputElement).value
  if (mode === 'draw')
    grid.mode = Mode.draw;
  else if(mode === 'erase')
    grid.mode = Mode.erase;
}
[drawRadio, eraseRadio].forEach(radio => radio.addEventListener('click', handleModeChange));

export { };
