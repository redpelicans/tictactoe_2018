import { compose, withState, withStateHandlers } from 'recompose';
import App from './component';
import withAuth from '../../hoc/auth';
import { O, getStatus, GAME_RUNNING } from '../../game';

const enhance = compose(
  withState('user', 'setUser'),
  withStateHandlers(({ board, status }) => ({ board, status }), {
    onAuth: () => user => ({ user }),
    onStart: (_, { board }) => () => ({
      board,
      status: GAME_RUNNING,
    }),
    computerPlay: ({ board }) => () => {
      const firstEmptyCellIndex = board.indexOf(null);
      if (firstEmptyCellIndex !== -1) {
        const newBoard = board.map((cell, index) => {
          if (index === firstEmptyCellIndex) return O;
          return cell;
        });
        return {
          board: newBoard,
          status: getStatus(newBoard),
        };
      }
    },
  }),
  withAuth(),
);

export default enhance(App);
