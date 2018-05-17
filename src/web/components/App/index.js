import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { BoardPanel } from '../Board';
import { PiePanel } from '../Pie';
import { HistoryPanel } from '../History';
import { Header, HeaderLeft, HeaderRight } from '../Header';
import { Icon, Title } from '../Widgets';
import { O, isStatusOver } from '../../game';
import './app.css';

const StartButton = ({ status, children }) => {
  if (isStatusOver(status)) {
    return (
      <div className="start-button">
        <Button bsSize="lg" bsStyle="primary">
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
};

class App extends React.Component {
  state = {
    board: this.props.board,
  };

  computerPlay = () => {
    const { board } = this.state;
    const firstEmptyCellIndex = board.indexOf(null);
    if (firstEmptyCellIndex !== -1) {
      const newBoard = board.map((cell, index) => {
        if (index === firstEmptyCellIndex) return O;
        return cell;
      });
      this.setState({ board: newBoard });
    }
  };

  render() {
    const { player, currentPlayer, status, history } = this.props;
    const { board } = this.state;
    return (
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
          <Grid>
            <Row>
              <Col md={4} xs={12}>
                <PiePanel history={history} player={player} />
              </Col>
              <Col md={4} xs={12}>
                <BoardPanel computerPlay={this.computerPlay} board={board} currentPlayer={currentPlayer} />
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
