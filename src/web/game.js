import { times, update } from 'ramda';

export const GAME_OVER = 'GAME_OVER';
export const GAME_RUNNING = 'GAME_RUNNING';
export const X = 'x';
export const O = 'o';
export const isStatusOver = status => status === GAME_OVER;
export const isEmptyCell = cell => !cell;
export const isBoardFull = board => !board.some(isEmptyCell);
export const getStatus = board => (isBoardFull(board) ? GAME_OVER : GAME_RUNNING);
export const getNewBoard = () => times(() => null, 9);
export const getNewPlayer = ({ player, computer }) => (Math.round(Math.random()) ? player : computer);
export const isComputer = currentPlayer => currentPlayer && currentPlayer.isComputer;
export const switchPlayer = ({ currentPlayer, player, computer }) => (isComputer(currentPlayer) ? player : computer);
export const getNextBoard = ({ currentPlayer: { piece }, board }, cell) => update(cell, piece, board);
export const computerPlay = board => board.indexOf(null);
