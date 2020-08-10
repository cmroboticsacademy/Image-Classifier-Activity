import { store } from '../../index.js';
import { sendUnityMessage, respondToUnity, sendUnityMessageAsync } from '../../shared/unity_comms';
import { predict, reloadAllExamples } from '../../shared/image_classifier';

import {
  addInference,
  displayInferences,
} from '../../redux/actions/inferences';
import {
  setUnityConveyorWaitingForScore,
  setUnityConveyorBeltAwake,
} from '../../redux/actions/unity.js';
import { batchScore, hiddenInferences } from '../../redux/reducers/inferences';
import { addScore } from '../../redux/actions/scores';

export const registerEvents = () => {
  respondToUnity(unity(), (request) => {
    const serializedRequest = JSON.parse(request);
    const callback = events[serializedRequest.topic];
    if (callback) {
      callback(serializedRequest);
    }
  });
};

export const requestInferenceBatch = () => {
  store.dispatch(setUnityConveyorWaitingForScore(true));
  console.log("Requesting Inferences");
  sendUnityMessage(
    {
      topic: 'inference',
      message: {
        api: 'inference_request',
      },
    },
    unity()
  );
};

const processInferenceRequest = (request) => {
  const { uid, img, name, rotation, dispose } = request.message;
  predict(img, uid)
    .then((pred) => {
      const payload = {
        uid,
        img,
        name,
        rotation,
        confidences: pred.confidences,
        expectedY: dispose,
        predictedY: pred.dispose,
      };
      store.dispatch(addInference(payload));
      sendPrediction(pred);
    })
    .catch((e) => {
      console.log('rejected', e);
      resetGameLoop();
    }
    );
};
const resetGameLoop = () => {
    reloadAllExamples();
    sendPrediction({ dispose: true, uid: "0000", color: { a: 1, b: 1, r: 1, g: 1 } })
}
const showScore = (request) => {
  const { inferences } = store.getState();
  const score = batchScore(hiddenInferences(inferences));
  store.dispatch(addScore(score));
  store.dispatch(displayInferences());
  store.dispatch(setUnityConveyorWaitingForScore(false));
};
const isContinuous = (_ => {
  sendUnityMessage(
    {
      topic: 'inference',
      message: {
        api: 'continuous',
        param: { continuous_mode: store.getState().unityConveyorBelt.continuousMode }
      },
    },
    unity()
  );
})

const unityAwake = async (_request) => {
  sendUnityMessageAsync(
    {
      topic: 'game_settings',
      message: {
        api: 'load_scene',
        param: { 'game_settings': store.getState().game.game_settings },
      },
    },
    unity(), "sim_awake_conveyor"
  ).then((_response) => {
    store.dispatch(setUnityConveyorBeltAwake());
  });
}
const sendPrediction = ({ dispose, uid, color: { rgb } }) => {
  console.log("sending Prediction");
  sendUnityMessage(
    {
      topic: 'inference',
      message: {
        api: 'prediction',
        param: {
          rgba: {
            ...rgb,
            a: 255 * 0.4,
          },
          dispose,
          uid,
        },
      },
    },
    unity()
  );
};

const unity = () => {
  const { unityConveyorBelt } = store.getState();
  return unityConveyorBelt.content;
};

const events = {
  inference: processInferenceRequest,
  show_score: showScore,
  sim_awake_conveyor: unityAwake,
  is_continuous: isContinuous,
};
