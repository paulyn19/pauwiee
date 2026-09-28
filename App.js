import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import GroceryList from './GroceryList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <GroceryList />
    </SafeAreaView>
  );
}
