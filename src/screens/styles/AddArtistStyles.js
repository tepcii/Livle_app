import React from 'react';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addPlanForm: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
  },
  textInputParent: {
    marginBottom: 20,
  },
  textInput: {
    borderColor: '#D8D8D8',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  textInputDescription: {
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: 'white',
    padding: 10,
  },
  artistImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderRow: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12
  },
  timePicker: {
    flex: 1,
    height:40,
    borderColor: '#3FD8B6',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePicker: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typePicker: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#f0f0f0'
  },
  backNextButtonContainer: {
    flexDirection: 'row',
  },
  backNextButton: {
    flex: 1,
    margin: 10,
    position: 'relative',
    bottom: 0,
  },
  confirmButton: {
    height: 50,
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },
  imageColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabIconStyle: {
    width: 200,
    height: 200,
    fontSize: 200,
  }
});

export default Styles;
