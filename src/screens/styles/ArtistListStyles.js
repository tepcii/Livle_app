import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

this.itemWidth = (Dimensions.get('window').width - 20) / 2;
this.selectedItemWidth = Dimensions.get('window').width - 20;
this.selectedItemHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    top: 10,
    left: 10,
  },
  tabIconStyle: {
    width: 20,
    height: 20,
    fontSize: 20,
  },
  editIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  deleteIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  editIconBack: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 5,
    backgroundColor: '#008dff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIconBack: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 5,
    backgroundColor: '#ff2d4c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconStyle: {
    width: 20,
    height: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  deleteIconStyle: {
    width: 20,
    height: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  artistList: {
    flex: 1,
    flexDirection: 'row',
  },
  artistContent: {
    backgroundColor: '#fff',
    width: this.itemWidth,
    margin: 5,
    borderRadius: 2,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    elevation: 5,
  },
  artistModal: {
    backgroundColor: '#fff',
    minHeight: this.selectedItemHeight,
    width: this.selectedItemWidth,
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    borderRadius: 2,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    elevation: 5,
  },
  itemContainer: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ededed'
  },
  rowContainer: {
    alignItems: 'center',
  },
  memoRowContainer: {
    marginTop: 10,
    marginBottom: 120,
    padding: 5,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'right',
  },
  artistName: {
    fontSize: 20,
  },
});

export default Styles;
