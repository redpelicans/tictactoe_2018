import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Title } from '../Widgets';
import { isStatusOver } from '../../game';
import './app.css';

const StartButton = ({ status, onStart, children }) => (
  <div className="start-button">
    <Button disabled={!isStatusOver(status)} bsSize="lg" bsStyle="primary" onClick={onStart}>
      {' '}
      {children}{' '}
    </Button>
  </div>
);

StartButton.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onStart: PropTypes.func.isRequired,
};

const App = ({ board, player, currentPlayer, status, history, startGame }) => {
  const handleStart = () => startGame();
  return (
    <Grid>
      <Header player={player}>
        <HeaderLeft>
          <Title name="TicTacToe" />
        </HeaderLeft>
        <HeaderRight>
          <StartButton status={status} onStart={handleStart}>
            Start The Game
          </StartButton>
        </HeaderRight>
      </Header>
      <Jumbotron className="content">
        <Grid>
          <Row>
            <Col md={4} xs={12}>
              <PiePanel history={history} player={player} />
            </Col>
            <Col md={4} xs={12}>
              <BoardPanel board={board} currentPlayer={currentPlayer} />
            </Col>
            <Col md={4} xs={12}>
              <HistoryPanel history={history} />
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    </Grid>
  );
};

App.propTypes = {
  board: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  currentPlayer: PropTypes.object,
  status: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;
