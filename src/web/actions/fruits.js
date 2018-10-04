import { reduce, times, prop } from 'ramda';
import axios from 'axios';

export const TITLE_FRUIT_LOADED = 'TITLE_FRUIT_LOADED';
export const CELL_FRUIT_LOADED = 'CELL_FRUIT_LOADED';

export const loadTitleFruit = () => dispatch =>
  axios
    .get('https://hook.io/eric-basley/fruit')
    .then(prop('data'))
    .then(fruit => dispatch({ type: TITLE_FRUIT_LOADED, fruit }));

// export const loadTitleFruit = () => dispatch => {
//   axios.get('https://hook.io/eric-basley/fruit')
//     .then(prop('data'))
//     .then(fruit => {
//       dispatch({ type: TITLE_FRUIT_LOADED, fruit })
//       if(fruit.icon !== 'paper-plane') dispatch(loadTitleFruit());
//     });
// }

// const getOneFruit = () => axios.get('https://hook.io/eric-basley/fruit').then(prop('data'));
const getOneFruit = () => axios.get('/api/fruit').then(prop('data'));

const loadOneFruit = index => dispatch =>
  getOneFruit().then(fruit => {
    dispatch({ type: CELL_FRUIT_LOADED, index, fruit });
    return fruit;
  });

export const loadFiveFruits = index => dispatch => {
  const loaders = times(() => () => dispatch(loadOneFruit(index)), 5);
  return reduce((acc, p) => acc.then(() => p()), Promise.resolve(), loaders);
};

const loadFruitsUntilPaperPlane = index => dispatch =>
  dispatch(loadOneFruit(index)).then(fruit => {
    if (fruit.icon !== 'paper-plane') return dispatch(loadFruitsUntilPaperPlane(index));
  });

export const loadFruits = () => dispatch => {
  // const promises = times(i => dispatch(loadOneFruit(i)), 9);
  const promises = times(i => dispatch(loadFiveFruits(i)), 9);
  // const promises = times(i => dispatch(loadFruitsUntilPaperPlane(i)), 9);
  return Promise.all(promises);
};
