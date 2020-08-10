import {
  selectObject
} from "../../containers/UnityLabeler/unity_api"

export const addInference = (payload) => {
  return {
    type: 'ADD_INFERENCE',
    payload
  }
}

export const displayInferences = () => {
  return {
    type: 'DISPLAY_INFERENCES'
  }
}
export const calculateScore = () => {
  return {
    type: 'CALC_SCORE'
  }
}

export const selectInference = (inference) => {
  selectObject(inference)
  return {
    type: 'SELECT_INFERENCE',
    inference
  }
}