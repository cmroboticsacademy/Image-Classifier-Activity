import { combineReducers } from 'redux';

import classifier from './classifier';
import featureExtractor from './featureExtractor';
import inferences from './inferences';
import labelClasses from './labelClasses';
import scores from './scores';
import unityConveyorBelt from './unityConyeorBelt';
import unityImageLabeler from './unityImageLabeler';
import game from './game';

export default combineReducers({
  classifier,
  inferences,
  featureExtractor,
  labelClasses,
  scores,
  unityConveyorBelt,
  unityImageLabeler,
  game,
});
