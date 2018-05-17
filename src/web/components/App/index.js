import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { isStatusOver } from '../../game';
import './app.css';

const StartButton = ({ status, children }) => {
  if (isStatusOver(status)) {
    return (
      <div className="start-button">
        <Button bsSize="lg" bsStyle="primary">
          {' '}
          {children}{' '}
        </Button>
      </div>
    );
  }
  return <div />;
};

StartButton.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const App = ({ board, player, currentPlayer, status }) => (
  <Grid>
    <Header player={player}>
      <HeaderLeft>
        <Icon type="trophy" />
        <Title name="TicTacToe" />
      </HeaderLeft>
      <HeaderRight>
        <StartButton status={status}>Start The Game</StartButton>
      </HeaderRight>
    </Header>
    <Jumbotron className="content">
      <Row>
        <Col md={12} xs={12}>
          <BoardPanel board={board} currentPlayer={currentPlayer} />
        </Col>
      </Row>
    </Jumbotron>
  </Grid>
);

App.propTypes = {
  board: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  currentPlayer: PropTypes.object,
  status: PropTypes.string.isRequired,
};

export default App;
