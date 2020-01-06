import { createStore, applyMiddleware } from 'redux';
import thunkMiddlware  from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const configureStore = initialState => (
  createStore(
    rootReducer, 
    initialState,
    applyMiddleware(thunkMiddlware, loggerMiddleware)
  ) 
);

export default configureStore;