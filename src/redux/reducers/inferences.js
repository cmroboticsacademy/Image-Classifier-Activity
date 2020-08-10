import _ from 'lodash'

const inference = {
  uid: '',
  name: '',
  rotation: {},
  expectedY: false,
  predictedY: false,
  confidences: {},
  img: '',
  display: false,
  selected: false
}

const correctInferences = (batch) => {
  return _.filter(batch, (inference) => inference.expectedY === inference.predictedY)
}

export const batchScore = (batch) => {
  return (correctInferences(batch).length / batch.length) * 100
}

export const hiddenInferences = (state) => _.filter(state, {
  display: false
})

const visibleInferences = (state) => _.filter(state, {
  display: true
})

const deselect = (item) => ({
  ...item,
  selected: false
})

const select = (item) => ({
  ...item,
  selected: true
})

const displayImage = (item) => ({
  ...item,
  display: true
})

export const cmQuadrantSelector = (state, expected, predicted) => {
  return _.filter(visibleInferences(state), {
    expectedY: expected,
    predictedY: predicted
  })
}

const inferences = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INFERENCE':
      const {
        payload
      } = action
      return [...state, {
        ...inference,
        uid: payload.uid,
        name: payload.name,
        rotation: payload.rotation,
        expectedY: payload.expectedY,
        predictedY: payload.predictedY,
        confidences: payload.confidences,
        img: payload.img,
        display: false
      }]
    case 'DISPLAY_INFERENCES':
      return hiddenInferences(state).map(displayImage)
    case 'SELECT_INFERENCE':
      return state.map((inference) => {
        if (inference.uid === action.inference.uid) {
          return select(inference)
        }
        return deselect(inference)
      })
    default:
      return state
  }
}

export default inferences