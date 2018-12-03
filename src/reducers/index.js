import { combineReducers } from 'redux';

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions';

const selectedSubreddit = (state='reactjs', action) => {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, 
  action) => {
    switch(action.type) {
      case INVALIDATE_SUBREDDIT:
        return Object.assign({}, state, { didInvalidate: true})
      case REQUEST_POSTS:
        return Object.assign({}, state, { isFetching: true })
      case RECEIVE_POSTS:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            lastUpdated: action.receivedAt
          }    
        )
      default:
        return state
    }
}