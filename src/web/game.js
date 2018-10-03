export const GAME_OVER = 'GAME_OVER';
export const PLAYING = 'PLAYING';
export const X = 'x';
export const O = 'o';
export const isStatusOver = status => status === GAME_OVER;

const isX = piece => piece === X;
const isO = piece => piece === O;
const isAPiece = piece => isX(piece) || isO(piece);

export const isFruit = piece => piece && piece.icon;
export const isComputer = currentPlayer => currentPlayer && currentPlayer.isComputer;
export const switchPlayer = ({ currentPlayer, player, computer }) => (isComputer(currentPlayer) ? player : computer);
export const isNotEmptyCell = value => isAPiece(value);
export const isEmptyCell = value => !isNotEmptyCell(value);
export const isGameOver = board => board.filter(isNotEmptyCell).length === 9;
export const getEmptyBoard = () => [null, null, null, null, null, null, null, null, null];
export const getNewPlayer = ({ player, computer }) => (Math.round(Math.random()) ? player : computer);
