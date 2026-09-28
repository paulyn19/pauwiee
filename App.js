import React from 'react';
import { StatusBar } from 'react-native';
import MarketScreen from './MarketScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <MarketScreen />
    </>
  );
}
