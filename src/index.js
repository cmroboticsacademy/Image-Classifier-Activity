import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import rootReducer from './redux/reducers';
import App from './App';

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.myStore = store;

const RahImageClassier = ({ game }) => {
  return (
    <Provider store={store}>
      <App game={game} />
    </Provider>
  );
};

export default RahImageClassier;
