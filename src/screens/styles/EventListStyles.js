import React from 'react';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  eventContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 20,
  }
});

export default Styles;
