import { compose, withState, withStateHandlers, lifecycle } from 'recompose';
import { pathOr } from 'ramda';
import App from './component';
import {
  isBoardFull,
  computerPlay,
  getNextBoard,
  getNewBoard,
  getNewPlayer,
  switchPlayer,
  isComputer,
  GAME_RUNNING,
  GAME_OVER,
} from '../../game';

export const enhance = compose(
  withState('user', 'setUser'),
  withStateHandlers(({ history, board, status }) => ({ history, board, status }), {
    onPlay: ({ currentPlayer, board, history }, { player, computer }) => i => {
      const newBoard = getNextBoard({ currentPlayer, board }, i);
      if (isBoardFull(newBoard)) {
        return {
          status: GAME_OVER,
          board: newBoard,
          currentPlayer: undefined,
          history: [{ id: pathOr(0, [history.length - 1, 'id'], history) + 1, winner: currentPlayer }, ...history],
        };
      }
      return {
        board: newBoard,
        currentPlayer: switchPlayer({ currentPlayer, player, computer }),
      };
    },
    onStart: (_, { player, computer }) => () => {
      const currentPlayer = getNewPlayer({ player, computer });
      const board = getNewBoard();
      return {
        board,
        status: GAME_RUNNING,
        currentPlayer,
      };
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.currentPlayer !== this.props.currentPlayer && isComputer(this.props.currentPlayer)) {
        const cell = computerPlay(this.props.board);
        setTimeout(() => this.props.onPlay(cell), 500);
      }
    },
  }),
);

export default enhance(App);
