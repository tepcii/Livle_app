import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';


class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <Text>Menu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'white',
    marginLeft: '100%',
  },
  statusBar: {
    height: 24,
    backgroundColor: 'white',
  },
});

export default Menu;
