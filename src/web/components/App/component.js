import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import './app.css';
import { isStatusOver } from '../../game';

const StartButton = ({ status, children, onClick }) => {
  if (isStatusOver(status)) {
    return (
      <div className="start-button">
        <Button className="start-game-button" bsSize="lg" bsStyle="primary" onClick={onClick}>
          {children}
        </Button>
      </div>
    );
  }
  return <div />;
};

StartButton.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const App = ({ board, status, player, currentPlayer, history, onStart, onPlay }) => {
  return (
    <Grid>
      <Header player={player}>
        <HeaderLeft>
          <Icon type="trophy" />
          <Title name="TicTacToe" />
        </HeaderLeft>
        <HeaderRight>
          <StartButton status={status} onClick={onStart}>
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
              <BoardPanel status={status} board={board} onPlay={onPlay} currentPlayer={currentPlayer} />
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
  onStart: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default App;
