import { identity, update, indexOf, all, equals } from 'ramda';

const isPlayedCell = identity;
export const PLAY_ERROR = -1;
export const GAME_OVER = 'GAME_OVER';
export const GAME_RUNNING = 'GAME_RUNNING';
export const X = 'x';
export const O = 'o';
export const isStatusOver = equals(GAME_OVER);
export const isBoardFull = all(isPlayedCell);
export const getStatus = board => (isBoardFull(board) ? GAME_OVER : GAME_RUNNING);
export const getNextBoard = (board, { piece }, cell) => update(cell, piece, board);
export const computerPlay = indexOf(null);
