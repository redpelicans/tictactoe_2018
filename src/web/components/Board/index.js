import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { isBoardFull } from '../../game';
import './board.css';

export const Message = ({ currentPlayer }) => {
  const message = currentPlayer ? `${currentPlayer.name}'s turn` : 'A message';
  return (
    <Col xs={12} className="message">
      <span>{message}</span>
    </Col>
  );
};

Message.propTypes = {
  currentPlayer: PropTypes.object,
};

export const Cell = ({ piece }) => (
  <Col xs={4} className="cell">
    {piece || '\u00a0'}
  </Col>
);
Cell.propTypes = {
  piece: PropTypes.string,
};

export const Board = ({ board, computerPlay }) => (
  <div>
    <Grid className="board">
      <Row>
        {/* eslint-disable react/no-array-index-key */}
        {board.map((piece, i) => <Cell key={i} piece={piece} />)}
      </Row>
      <Row>
        <Button className="computerPlay" disabled={isBoardFull(board)} onClick={computerPlay}>
          Computer Play
        </Button>
      </Row>
    </Grid>
  </div>
);

Board.propTypes = {
  board: PropTypes.array.isRequired,
  computerPlay: PropTypes.func.isRequired,
};

export const BoardPanel = ({ board, currentPlayer, computerPlay }) => (
  <Grid className="panel">
    <Row>
      <Message currentPlayer={currentPlayer} />
    </Row>
    <Row>
      <Board board={board} computerPlay={computerPlay} />
    </Row>
  </Grid>
);

BoardPanel.propTypes = {
  board: PropTypes.array.isRequired,
  currentPlayer: PropTypes.object,
  computerPlay: PropTypes.func,
};
