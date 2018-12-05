import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPostsIfNeeded } from './actions';
import rootReducer from './reducers';
import './assets/css/index.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
);

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => console.log(store.getState()));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
