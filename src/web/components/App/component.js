import React from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { isStatusOver } from '../../game';
import './app.css';

const StartButton = ({ location, status, onStart, children }) => (
  <div className="start-button">
    <Button
      disabled={!(isStatusOver(status) && location.pathname === '/')}
      bsSize="lg"
      bsStyle="primary"
      onClick={onStart}
    >
      {' '}
      {children}{' '}
    </Button>
  </div>
);

StartButton.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onStart: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const About = () => (
  <Grid>
    <Row>
      <Col md={4} xs={12}>
        <span> ABOUT ABOUT ABOUT </span>
      </Col>
    </Row>
  </Grid>
);

const Help = () => (
  <Grid>
    <Row>
      <Col md={4} xs={12}>
        <span> Help dqsdsq dqsd sqdqs dqsdqs ME !!! </span>
      </Col>
    </Row>
  </Grid>
);

const Main = ({ player, history, currentPlayer, played, board, winner }) => (
  <Grid>
    <Row>
      <Col md={4} xs={12}>
        <PiePanel history={history} player={player} />
      </Col>
      <Col md={4} xs={12}>
        <BoardPanel winner={winner} board={board} currentPlayer={currentPlayer} onPlay={played} />
      </Col>
      <Col md={4} xs={12}>
        <HistoryPanel history={history} />
      </Col>
    </Row>
  </Grid>
);

Main.propTypes = {
  board: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  winner: PropTypes.object,
  currentPlayer: PropTypes.object,
  history: PropTypes.array.isRequired,
  played: PropTypes.func.isRequired,
};

const App = ({ location, titleIcon, player, status, startGame, ...rest }) => {
  const handleStart = () => startGame();
  return (
    <Grid>
      <Header player={player}>
        <HeaderLeft>
          <Icon fruit={titleIcon} />
          <Title name="TicTacToe" />
        </HeaderLeft>
        <HeaderRight>
          <StartButton status={status} onStart={handleStart} location={location}>
            Start The Game
          </StartButton>
          <Link to="/" className="spacer">
            Game
          </Link>
          <Link to="/about" className="spacer">
            About
          </Link>
          <Link to="/help" className="spacer">
            Help
          </Link>
        </HeaderRight>
      </Header>
      <Jumbotron className="content">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Route path="/" render={() => <Main {...rest} player={player} />} />
        </Switch>
      </Jumbotron>
    </Grid>
  );
};

App.propTypes = {
  player: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  titleIcon: PropTypes.object,
};

export default App;
