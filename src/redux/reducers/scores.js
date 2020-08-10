import _ from 'lodash';

const scores = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SCORE':
      return [...state, action.score];
    default:
      return state;
  }
};

const formatScore = (state) => {
  var percentage = Math.round(
    _.sum(last10Scores(state)) / last10Scores(state).length
  );
  const cycle = state.length > 10 ? 10 : state.length;
  return `${percentage}% correct in the last ${cycle} batch(es)..`;
};

const last10Scores = (state) => {
  return _.takeRight(state, 10);
};

export const calculatedScore = (state) => {
  if (state.length === 0) {
    return `Waiting for batches..`;
  }
  return formatScore(state);
};

export default scores;
