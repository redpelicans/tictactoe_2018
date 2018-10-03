import { update } from 'ramda';
import { START_GAME, HAS_PLAYED, END_OF_GAME } from '../actions/game';
import { CELL_FRUIT_LOADED, TITLE_FRUIT_LOADED } from '../actions/fruits';
import { PLAYING, GAME_OVER } from '../game';

const reducer = (state, action) => {
  switch (action.type) {
    case TITLE_FRUIT_LOADED:
      return {
        ...state,
        titleIcon: action.fruit,
      };
    case CELL_FRUIT_LOADED:
      return {
        ...state,
        board: update(action.index, action.fruit, state.board),
      };

    case START_GAME:
      return {
        ...state,
        status: PLAYING,
        board: action.board,
        currentPlayer: action.currentPlayer,
        winner: undefined,
      };
    case HAS_PLAYED:
      return {
        ...state,
        board: action.newBoard,
        currentPlayer: action.nextPlayer,
      };
    case END_OF_GAME:
      return {
        ...state,
        board: action.board,
        currentPlayer: undefined,
        winner: action.winner,
        status: GAME_OVER,
        history: [...state.history, { id: state.history.length + 1, winner: action.winner }],
      };
    default:
      return state;
  }
};

export default reducer;
