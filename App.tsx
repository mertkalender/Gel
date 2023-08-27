import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Root from './src/root';

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
 }