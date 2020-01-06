import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureSore from '../configureStore';
import AsyncApp from './AsyncApp';

const store = configureSore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}