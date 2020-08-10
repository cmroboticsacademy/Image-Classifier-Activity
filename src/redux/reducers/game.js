import { sendRequest } from "../../shared/cs2n_comms";

const cs2nDefaultProps = {
  game_settings: {
    scene_name: "default",
    difficulty: "level1",
  },
};

const game = (state = cs2nDefaultProps, action) => {
  switch (action.type) {
    case "LOAD_CS2N_DATA":
      return action.data;
    default:
      return state;
  }
};

export default game;
