import reducer from '../../reducers';
import { configureStore } from './utils';
import { played, CELL_FRUIT_LOADED, START_GAME, END_OF_GAME, startGame, gameOver } from '../game';
import { X, O } from '../../game';

jest.mock('axios', () => {
  const fruit = { icon: 'test', color: 'red' };
  return {
    get: () => Promise.resolve({ data: { fruit } }),
    post: () => Promise.resolve({ data: { winner: 'o' } }),
  };
});

describe('Actions', () => {
  it('START_GAME', function(done) {
    const hook = {
      START_GAME: () => done(),
    };
    const store = configureStore(reducer, {}, hook);
    store.dispatch(startGame());
  });

  it('END_OF_GAME', function(done) {
    const state = {
      board: [],
      history: [],
    };
    let fruits = 0;
    const hook = {
      CELL_FRUIT_LOADED: () => fruits++,
      END_OF_GAME: () => {
        expect(fruits).toEqual(45);
        done();
      },
    };
    const store = configureStore(reducer, state, hook);
    store.dispatch(gameOver([], {}));
  });

  it('HAS_PLAYED with a winner', function(done) {
    const player = { name: 'test', piece: X };
    const computer = { name: 'computer', isComputer: true, piece: O };
    const state = {
      config: { apiServer: {} },
      board: [null],
      history: [],
      currentPlayer: computer,
      computer,
      player,
    };

    const hook = {
      END_OF_GAME: getState => {
        const { board, winner } = getState();
        expect(board).toEqual(['o']);
        expect(winner).toEqual(computer);
        done();
      },
    };
    const store = configureStore(reducer, state, hook);
    store.dispatch(played(0));
  });

  it('HAS_PLAYED without a winner', function(done) {
    const player = { name: 'test', piece: X };
    const computer = { name: 'computer', isComputer: true, piece: O };
    const state = {
      config: { apiServer: {} },
      board: [null, null],
      history: [],
      currentPlayer: computer,
      computer,
      player,
    };
    const hook = {
      HAS_PLAYED: getState => {
        const { board } = getState();
        expect(board).toEqual(['o', null]);
        done();
      },
    };
    const store = configureStore(reducer, state, hook);
    store.dispatch(played(0));
  });
});
