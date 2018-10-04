import { connect } from 'react-redux';
import { compose } from 'ramda';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { startGame, played } from '../../actions/game';
import App from './component';
import { getVisibleHistory } from '../../selectors/game';

const actions = { startGame, played };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => ({ ...state, history: getVisibleHistory(state) });

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));
export default enhance(App);
