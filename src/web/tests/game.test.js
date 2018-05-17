import { isBoardFull } from '../game';

describe('Game', () => {
  it('should detect a full board', () => {
    const board = [1, 2, 3, 4];
    expect(isBoardFull(board)).toBeTruthy();
  });
  it('should not detect a full board', () => {
    const board = [1, 2, null, 3, 4];
    expect(isBoardFull(board)).not.toBeTruthy();
  });
});
