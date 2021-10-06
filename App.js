import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SoundsScreen from './app/screens/SoundsScreen';
import SoundsScreen2 from './app/screens/SoundScreens2';

export default function App() {
  return (
    // <View style={styles.container}>
      <SoundsScreen />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
