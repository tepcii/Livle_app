import React from 'react';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'stretch',
  },
  eventContent: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 20,
    marginVertical: 15,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 0,
    shadowOpacity: 0.5,
    elevation: 10,
    height: this._animation,
  },
  eventTitle: {
    fontSize: 20,
  }
});

export default Styles;
