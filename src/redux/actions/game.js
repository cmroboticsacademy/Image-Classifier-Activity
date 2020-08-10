export const loadgame = (data) => {
  return {
    type: 'LOAD_CS2N_DATA',
    data,
  };
};
export const completedMilestone = (game) => {
  return {
    type: 'COMPLETE_MILESTONE',
    game,

  }
}
