import React from 'react';
import { Platform, StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  inputMoneyParent: {
    flexDirection: 'row',
  },
  textInputMoney: {
    borderColor: '#D8D8D8',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 50,
    textAlign: 'right',
    flex: 1,
  },
  textInput: {
    borderColor: '#D8D8D8',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  textInputMemo: {
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: 'white',
    padding: 10,
  },
  timePicker: {
    height: 50,
    borderColor: '#D8D8D8',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePicker: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    marginBottom: 20,
  },
  typePicker: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    marginBottom: 20,
  },
  artistsPicker: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketsPicker: {
  },
  backNextButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
  },
  backNextButton: {
    height: 50,
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
  addArtistButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#848484',
    marginBottom: 10,
  },
  addArtistButton: {
    height: 50,
    width: '100%',
  },
  tabIconStyle: {
    width: 24,
    height: 24,
    fontSize: 24,
    marginLeft: 10,
  },
});

export default Styles;
