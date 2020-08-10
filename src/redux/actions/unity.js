export const setUnityConveyorBelt = (content) => {
  return {
    type: 'SET_UNITY_CONVEYOR_BELT',
    content,
  };
};

export const setUnityConveyorBeltAwake = () => {
  return {
    type: 'SET_UNITY_CONVEYOR_BELT_AWAKE',
  };
};

export const setUnityConveyorBeltContinuousMode = (value) => {
  return {
    type: 'SET_UNITY_CONVEYOR_BELT_CONTINOUS_MODE',
    value,
  };
};

export const setUnityConveyorWaitingForScore = (value) => (dispatch) => {
  dispatch({
    type: 'SET_UNITY_CONVEYOR_BELT_WAITING_FOR_SCORE',
    value,
  });
  return Promise.resolve();
};

export const setUnityImageLabeler = (content) => {
  return {
    type: 'SET_UNITY_IMAGE_LABELER',
    content,
  };
};

export const setUnityImageLabelerAwake = () => {
  return {
    type: 'UNITY_IMAGE_LABELER_AWAKE',
  };
};
