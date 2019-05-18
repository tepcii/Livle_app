import React from 'react';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextLiveMessage: {
    flex: 2,
    height: '22%',
    width: '80%',
    backgroundColor: '#3FD8B6',
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 0,
    shadowOpacity: 0.5,
    elevation: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextLiveMessageText: {
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 30,
  },
  calendar: {
    flex: 5,
    width: '100%',
  }
});

export default Styles;
