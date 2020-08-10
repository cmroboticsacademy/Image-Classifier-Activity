const unityImageLabeler = (state = { content: null, awake: false }, action) => {
  switch (action.type) {
    case 'SET_UNITY_IMAGE_LABELER':
      return { ...state, content: action.content };
    case 'UNITY_IMAGE_LABELER_AWAKE':
      return { ...state, awake: true };
    default:
      return state;
  }
};

export default unityImageLabeler;
