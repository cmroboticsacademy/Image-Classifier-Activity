import * as knn from '@tensorflow-models/knn-classifier'

const classifier = (state = knn.create(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default classifier