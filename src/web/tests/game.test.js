import { computerPlay, getNextBoard, isBoardFull, PLAY_ERROR } from '../game';

describe('Game', () => {
  it('should detect a full board', () => {
    const board = [1, 2, 3, 4];
    expect(isBoardFull(board)).toBeTruthy();
  });

  it('should not detect a full board', () => {
    const board = [1, 2, null, 3, 4];
    expect(isBoardFull(board)).not.toBeTruthy();
  });

  it('should getNextBoard', () => {
    const board = [1, 2, null, 3, 4];
    const newBoard = [1, 2, 'P', 3, 4];
    const player = { piece: 'P' };
    const cell = 2;
    expect(getNextBoard(board, player, cell)).toEqual(newBoard);
  });

  it('should let computer play', () => {
    const board = [1, 2, null, 3, 4];
    expect(computerPlay(board)).toEqual(2);
  });

  it('should refuse computer play', () => {
    const board = [1, 2, 3, 4];
    expect(computerPlay(board)).toEqual(PLAY_ERROR);
  });
});
