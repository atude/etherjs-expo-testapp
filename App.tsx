import React from 'react';
import { StyleSheet, View } from 'react-native';

import AccountDetails from './components/AccountDetails';

export default function App() {
  return (
    <View style={styles.container}>
      <AccountDetails/>
    </View>
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
