import { createSelector } from 'reselect';
import { compose, slice, reverse, prop } from 'ramda';

export const getHistory = prop('history');
export const getVisibleHistory = createSelector(getHistory, compose(slice(0, 20), reverse));
