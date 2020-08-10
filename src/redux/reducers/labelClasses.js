import _ from 'lodash';

export const labelClass = {
  id: 0,
  name: 'name',
  color: {
    hex: '#9c27b0',
    rgb: {
      a: 1,
      r: 	61,
      g: 15,
      b: 69,
    },
  },
  dispose: false,
  images: [],
};

const labelClasses = (state = { targetClassId: 0, list: [] }, action) => {
  switch (action.type) {
    case 'ADD_LABEL_CLASS':
      return {
        ...state,
        targetClassId: action.id,
        list: [
          ...state.list,
          {
            ...labelClass,
            id: action.id,
            name: `Class ${action.id}`,
          },
        ],
      };
    case 'SET_LABEL_CLASS_NAME':
      return {
        ...state,
        list: _.map(state.list, (labelClass) => {
          if (labelClass.id === action.id) {
            return {
              ...labelClass,
              name: action.name,
            };
          }
          return labelClass;
        }),
      };
    case 'SET_LABEL_CLASS_COLOR':
      return {
        ...state,
        list: _.map(state.list, (labelClass) => {
          if (labelClass.id === action.id) {
            return {
              ...labelClass,
              color: action.color,
            };
          }
          return labelClass;
        }),
      };
    case 'DELETE_LABEL_CLASS':
      return {
        ...state,
        list: _.reject(state.list, {
          id: action.id,
        }),
      };
    case 'DELETE_ALL_IMAGES':
      return {
        ...state,
        list: _.map(state.list, (labelClass) => {
          if (labelClass.id === action.id) {
            return {
              ...labelClass,
              images: [],
            };
          }
          return labelClass;
        }),
      };
    case 'ADD_IMAGE':
      return {
        ...state,
        list: _.map(state.list, (labelClass) => {
          if (labelClass.id === action.id) {
            return {
              ...labelClass,
              images: [...labelClass.images, action.image],
            };
          }
          return labelClass;
        }),
      };
    case 'REMOVE_IMAGE':
      return {
        ...state,
        list: _.map(state.list, (labelClass) => {
          if (labelClass.id === action.id) {
            return {
              ...labelClass,
              images: _.reject(
                labelClass.images,
                (_, i) => i === action.imageIndex
              ),
            };
          }
          return labelClass;
        }),
      };
    case 'TOGGLE_DISPOSE_STATE':
      return {
        ...state,
        list: _.map(state.list, (labelClass) => {
          if (labelClass.id === action.id) {
            return {
              ...labelClass,
              dispose: !labelClass.dispose,
            };
          }
          return labelClass;
        }),
      };
    case 'CHANGE_TARGET_CLASS':
      return {
        ...state,
        targetClassId: action.id,
      };
    default:
      return state;
  }
};

export const getLabelClassByName = (labelClasses, name) => {
  return _.find(labelClasses, (lc) => lc.name === name);
};

export default labelClasses;
