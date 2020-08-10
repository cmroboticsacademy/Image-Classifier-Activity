const featureExtractor = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_MOBILENET':
      return action.model;
    default:
      return state;
  }
};

export default featureExtractor