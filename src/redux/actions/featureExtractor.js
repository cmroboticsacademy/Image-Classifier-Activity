import * as MobileNetModule from '@tensorflow-models/mobilenet';

const loadMobileNet = (model) => {
  return {
    type: 'LOAD_MOBILENET',
    model,
  };
};

export const loadMobileNetAsync = () => {
  return (dispatch) => {
    MobileNetModule.load().then((m) => {
      dispatch(loadMobileNet(m));
    });
  };
};