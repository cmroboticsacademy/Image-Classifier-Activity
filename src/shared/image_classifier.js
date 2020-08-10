import _ from 'lodash';

import { store } from '../index.js';
import {
  getLabelClassByName,
  labelClass as defaultLabelClass,
} from '../redux/reducers/labelClasses';
import classifier from '../redux/reducers/classifier.js';

export const addExample = (binary, label) => {
  const { featureExtractor, classifier } = store.getState();
  preProcessImageWithCallback(binary, (img) => {
    const features = featureExtractor.infer(img, 'conv_preds');
    classifier.addExample(features, label);
  });
};

export const reloadExamples = (labelClass) => {
  const { classifier, labelClasses } = store.getState();
  const labels = Object.keys(classifier.classDatasetMatrices);
  const label = labels[labelClass.id - 1];
  const updatedLabelClass = _.find(labelClasses.list, {
    id: labelClass.id,
  });
  try {
    classifier.clearClass(label);
  } catch (e) {
    console.log("error", e);
  }
  updatedLabelClass.images.forEach((img) => addExample(img, labelClass.name));
};

export const reloadAllExamples = () => {
  const { classifier, labelClasses } = store.getState();
  const labels = Object.keys(classifier.classDatasetMatrices);

  labelClasses.list.forEach(label => {
    const labelObject = labels[label.id - 1];
    classifier.clearClass(labelObject);
    label.images.forEach((img) => addExample(img, label.name));
  })
}




export const deleteExamples = (label) => {
  const { classifier } = store.getState();
  try {
    classifier.clearClass(label);
  } catch (e) { }
};

export const predict = (binary, uid) => {
  return new Promise((resolve, reject) => {
    const { featureExtractor, classifier, labelClasses } = store.getState();

    preProcessImageWithCallback(binary, (img) => {
      const features = featureExtractor.infer(img, 'conv_preds');
      classifier
        .predictClass(features)
        .then((result) => {
          const labelClass = getLabelClassByName(
            labelClasses.list,
            result.label
          );
          const confidences = result.confidences;
          if (labelClass) {
            resolve({
              ...labelClass,
              uid,
              confidences
            });
          } else {
            reject('rebuilding model');
          }
        })
        .catch((_) => {
          resolve({
            ...defaultLabelClass,
            uid,
            rgb: {
              a: 0,
              r: 0,
              g: 0,
              b: 0,
            },
          });
        });
    });
  });
};

const preProcessImageWithCallback = async (binary, callback) => {
  let img = new Image(800, 600);
  img.src = `data:image/png;base64, ${binary}`;
  img.onload = () => {
    callback(img);
  };
};
