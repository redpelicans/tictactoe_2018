// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
// require('babel-core').transform('code', { plugins: ['dynamic-import-node'] });
import 'babel-polyfill';
import 'url-search-params-polyfill';
import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
