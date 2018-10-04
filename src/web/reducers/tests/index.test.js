import reducer from '..';
import { START_GAME, HAS_PLAYED } from '../../actions/game';

describe('Reducers', () => {
  it('START_GAME', () => {
    const action = {
      type: START_GAME,
      currentPlayer: 1,
      board: 2,
    };
    const newState = {
      status: 'PLAYING',
      board: action.board,
      currentPlayer: action.currentPlayer,
      winner: undefined,
    };
    expect(reducer({}, action)).toEqual(newState);
  });

  it('HAS_PLAYED', () => {
    const state = {
      status: 'PLAYING',
      currentPlayer: 2,
      board: 1,
    };
    const action = {
      type: HAS_PLAYED,
      nextPlayer: 1,
      newBoard: 2,
    };
    const newState = {
      ...state,
      board: action.newBoard,
      currentPlayer: action.nextPlayer,
    };
    expect(reducer(state, action)).toEqual(newState);
  });
});
