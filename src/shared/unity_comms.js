import _ from "lodash";
const pendingPromises = new Array();
const setUnityPromise = (promisedObject) => {
  pendingPromises.push(promisedObject);
}
export const sendUnityMessageAsync = (msg, unity, responseTopic) =>
  new Promise((resolve) => {
    respondToUnity(unity, (response) => {
      const serializedResponse = JSON.parse(response);
      if (serializedResponse.topic == responseTopic) {
        resolve(serializedResponse);
      }
    });
    
    sendUnityMessage(msg, unity);
  });

export const sendUnityMessage = (msg, unity) => {
  const message = JSON.stringify(msg);
  unity.send('UnityComms', 'OnMessageToUnity', message);
};

export const respondToUnity = (unity, callback) => {
  unity.on('MessageFromUnity', callback);
};
