const unityConveyorBelt = (
  state = {
    content: null,
    continuousMode: false,
    waitingForScore: false,
    unityAwake: false,
  },
  action
) => {
  switch (action.type) {
    case 'SET_UNITY_CONVEYOR_BELT':
      return {
        ...state,
        content: action.content,
      };
    case 'SET_UNITY_CONVEYOR_BELT_AWAKE':
      return {
        ...state,
        unityAwake: true,
      };
    case 'SET_UNITY_CONVEYOR_BELT_WAITING_FOR_SCORE':
      return {
        ...state,
        waitingForScore: action.value,
      };
    case 'SET_UNITY_CONVEYOR_BELT_CONTINOUS_MODE':
      return {
        ...state,
        continuousMode: action.value,
      };
    default:
      return state;
  }
};

export default unityConveyorBelt;
