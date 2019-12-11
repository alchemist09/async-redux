import { createStore, appleMiddleware } from 'redux';
import thunkMiddlware  from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const configureStore = initialState => (
  createStore(
    rootReducer, 
    initialState,
    appleMiddleware(thunkMiddlware, loggerMiddleware)
  ) 
);

export default configureStore;