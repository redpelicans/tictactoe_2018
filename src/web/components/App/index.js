import { connect } from 'react-redux';
import { compose } from 'ramda';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { startGame, played } from '../../actions/game';
import App from './component';

const actions = { startGame, played };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => state;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));
export default enhance(App);
