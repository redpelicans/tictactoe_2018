import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { isComputer, isEmptyCell } from '../../game';
import './board.css';

export const Message = ({ currentPlayer }) => {
  const message = currentPlayer ? `${currentPlayer.name}'s turn` : 'Click to start game';
  return (
    <Col xs={12} className="message">
      <span>{message}</span>
    </Col>
  );
};

Message.propTypes = {
  currentPlayer: PropTypes.object,
};

export const PlayedCell = ({ piece }) => (
  <Col className="cell" xs={4}>
    {piece}
  </Col>
);
PlayedCell.propTypes = {
  piece: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const UnclickableCell = () => (
  <Col className="cell inactive-cell" xs={4}>
    {'\u00a0'}
  </Col>
);

export const ClickableCell = ({ onClick }) => (
  <Col className="cell empty-cell" xs={4} onClick={() => onClick()}>
    {'\u00a0'}
  </Col>
);
ClickableCell.propTypes = {
  onClick: PropTypes.func,
};

export const Cell = ({ currentPlayer, piece, onClick }) => {
  if (isEmptyCell(piece)) {
    if (!currentPlayer || isComputer(currentPlayer)) return <UnclickableCell />;
    return <ClickableCell onClick={onClick} />;
  }
  return <PlayedCell piece={piece} />;
};

Cell.propTypes = {
  piece: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  currentPlayer: PropTypes.object,
};

export const Board = ({ board, currentPlayer, onPlay }) => (
  <div>
    <Grid className="board">
      <Row>
        {/* eslint-disable react/no-array-index-key */}
        {board.map((piece, i) => (
          <Cell key={i} currentPlayer={currentPlayer} onClick={() => onPlay(i)} piece={piece} />
        ))}
      </Row>
    </Grid>
  </div>
);

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
  currentPlayer: PropTypes.object,
};

export const BoardPanel = ({ board, onPlay, currentPlayer }) => (
  <Grid className="panel">
    <Row>
      <Message currentPlayer={currentPlayer} />
    </Row>
    <Row>
      <Board board={board} onPlay={onPlay} currentPlayer={currentPlayer} />
    </Row>
  </Grid>
);

BoardPanel.propTypes = {
  board: PropTypes.array.isRequired,
  currentPlayer: PropTypes.object,
  onPlay: PropTypes.func.isRequired,
};
