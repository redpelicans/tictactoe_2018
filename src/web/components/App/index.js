import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startGame, played } from '../../actions/game';
import App from './component';

const actions = { startGame, played };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => state;

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(App);
