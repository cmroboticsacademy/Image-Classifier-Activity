export const addScore = (score) => {
  return {
    type: 'ADD_SCORE',
    score,
  };
};
export const checkWinState = () => {
  return {
    type: 'CHECK_WIN_STATE',
  };
};
