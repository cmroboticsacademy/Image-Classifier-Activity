import { store } from '../../index.js';
import { addImage } from '../../redux/actions/labelClasses';
import { addExample } from '../../shared/image_classifier';
import { setUnityImageLabelerAwake } from '../../redux/actions/unity';
import {
  sendUnityMessage,
  sendUnityMessageAsync,
  respondToUnity,
} from '../../shared/unity_comms';

const unity = () => {
  const { unityImageLabeler } = store.getState();
  return unityImageLabeler.content;
};

const unityAwake = (_) => {
  store.dispatch(setUnityImageLabelerAwake());
};

const events = {
  sim_awake_labeler: unityAwake,
};

export const registerEvents = () => {
  respondToUnity(unity(), (request) => {
    const serializedRequest = JSON.parse(request);
    const callback = events[serializedRequest.topic];
    if (callback) {
      callback(serializedRequest);
    }
  });
};

export const selectObject = ({ name, rotation }) => {
  sendUnityMessage(
    {
      topic: 'label_view',
      message: {
        api: 'change_object',
        param: {
          name,
          rotation,
        },
      },
    },
    unity()
  );
};

export const takeSnapshot = (id, label) => {
  sendUnityMessageAsync(
    {
      topic: 'label_view',
      message: {
        api: 'get_image_view',
      },
    },
    unity(), "img_raw"
  ).then((response) => {
    const binary = response.message.value;
    addExample(binary, label);
    store.dispatch(addImage(id, binary));
  });
};

export const keyboardOverride = (keyevent) => {
  sendUnityMessage(
    {
      topic: 'keyboard_override',
      message: {
        api: keyevent,
      },
    },
    unity()
  );
};
