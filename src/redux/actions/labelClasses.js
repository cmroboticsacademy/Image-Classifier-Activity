let nextLabelClassId = 1;

export const addLabelClass = () => {
  return {
    type: 'ADD_LABEL_CLASS',
    id: nextLabelClassId++,
    isCollapsed: false,
  };
};

export const setLabelClassName = (id, name) => {
  return {
    type: 'SET_LABEL_CLASS_NAME',
    id,
    name,
  };
};

export const setLabelClassColor = (id, color) => {
  return {
    type: 'SET_LABEL_CLASS_COLOR',
    id,
    color,
  };
};

export const deleteLabelClass = (id) => {
  return {
    type: 'DELETE_LABEL_CLASS',
    id,
  };
};

export const addImage = (id, image) => {
  return {
    type: 'ADD_IMAGE',
    id,
    image,
  };
};

export const removeImage = (id, imageIndex) => (dispatch) => {
  dispatch({
    type: 'REMOVE_IMAGE',
    id,
    imageIndex,
  });
  return Promise.resolve();
};

export const deleteAllImages = (id) => {
  return {
    type: 'DELETE_ALL_IMAGES',
    id,
  };
};

export const toggleDisposeState = (id) => {
  return {
    type: 'TOGGLE_DISPOSE_STATE',
    id,
  };
};

export const changeTargetClass = (id) => {
  return {
    type: 'CHANGE_TARGET_CLASS',
    id,
  };
};
