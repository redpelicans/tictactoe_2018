import axios from 'axios';
import { isComputer, switchPlayer, getEmptyBoard, getNewPlayer, getNextBoard, isGameOver } from '../game';
import { loadFruits } from './fruits';

export const START_GAME = 'START_GAME';
export const END_OF_GAME = 'END_OF_GAME';
export const HAS_PLAYED = 'HAS_PLAYED';

const computerPlay = () => (dispatch, getState) => {
  const {
    config: {
      apitServer: { host, port },
    },
  } = getState();
  const url = `http://${host}:${port}/api/computer/play`;
  const { board, computer, player } = getState();
  const data = {
    board,
    computer: computer.piece,
    player: player.piece,
  };
  const options = {
    method: 'POST',
    data,
    url,
  };
  axios(options)
    .then(({ data: res }) => dispatch(played(res.move)))
    .catch(console.error);
};

export const startGame = () => (dispatch, getState) => {
  const { computer, player } = getState();
  const board = getEmptyBoard();
  const newPlayer = getNewPlayer({ computer, player });
  dispatch({ type: START_GAME, board, currentPlayer: newPlayer });
  if (isComputer(newPlayer)) dispatch(computerPlay());
};

export const played = cell => (dispatch, getState) => {
  const state = getState();
  const {
    config: {
      apitServer: { host, port },
    },
    player,
    computer,
  } = state;
  const newBoard = getNextBoard(state, cell);
  const data = { board: newBoard };
  const url = `http://${host}:${port}/api/game/hasawinner`;
  const options = { method: 'POST', data, url };
  axios(options)
    .then(({ data: res }) => {
      const winner = res.winner && (res.winner === computer.piece ? computer : player);

      if (winner) {
        dispatch({ type: HAS_PLAYED, newBoard, nextPlayer: null });
        return dispatch(gameOver(newBoard, winner));
      }
      if (isGameOver(newBoard)) {
        dispatch({ type: HAS_PLAYED, newBoard, nextPlayer: null });
        return dispatch(gameOver(newBoard));
      }
      const nextPlayer = switchPlayer(state);
      dispatch({ type: HAS_PLAYED, newBoard, nextPlayer });
      if (isComputer(nextPlayer)) dispatch(computerPlay());
    })
    .catch(console.error);
};

export const gameOver = (board, winner) => dispatch => {
  dispatch(loadFruits()).then(() => dispatch({ type: END_OF_GAME, board, winner }));
};
