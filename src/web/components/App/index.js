import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { O, getStatus, isStatusOver, GAME_RUNNING } from '../../game';
import './app.css';

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

class App extends React.Component {
  state = {
    board: this.props.board,
    status: this.props.status,
  };

  startGame = () => {
    this.setState({
      board: this.props.board,
      status: GAME_RUNNING,
    });
  };

  computerPlay = () => {
    const { board } = this.state;
    const firstEmptyCellIndex = board.indexOf(null);
    if (firstEmptyCellIndex !== -1) {
      const newBoard = board.map((cell, index) => {
        if (index === firstEmptyCellIndex) return O;
        return cell;
      });
      this.setState({
        board: newBoard,
        status: getStatus(newBoard),
      });
    }
  };

  render() {
    const { player, currentPlayer, history } = this.props;
    const { board, status } = this.state;
    return (
      <Grid>
        <Header player={player}>
          <HeaderLeft>
            <Icon type="trophy" />
            <Title name="TicTacToe" />
          </HeaderLeft>
          <HeaderRight>
            <StartButton status={status} onClick={this.startGame}>
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
                <BoardPanel
                  status={status}
                  computerPlay={this.computerPlay}
                  board={board}
                  currentPlayer={currentPlayer}
                />
              </Col>
              <Col md={4} xs={12}>
                <HistoryPanel history={history} />
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </Grid>
    );
  }
}

App.propTypes = {
  board: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  currentPlayer: PropTypes.object,
  status: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
};

export default App;
