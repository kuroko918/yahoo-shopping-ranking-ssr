import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const middlewares = [logger, thunk];

const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      ...middlewares
    )
  );
}

export default createStore;
