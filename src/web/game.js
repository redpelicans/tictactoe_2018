export const GAME_OVER = 'GAME_OVER';
export const X = 'x';
export const O = 'o';
export const isStatusOver = status => status === GAME_OVER;
const isEmptyCell = cell => !cell;
export const isBoardFull = board => !board.some(isEmptyCell);
