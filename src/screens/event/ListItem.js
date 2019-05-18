import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaleAndOpacity } from 'react-native-motion';
import Header from './Header';
import Content from './Content';


export class ListItem extends Component {
  onPressed = event => {
    const { onPress, item } = this.props;
    onPress(item, event.nativeEvent);
  }

  render() {
    const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
    const { title, artistKey, eventType, isReceived, ...rest } = item;

    return (
      <ScaleAndOpacity
        isHidden={isHidden}
        animateOnDidMount={animateOnDidMount}
      >
        <TouchableWithoutFeedback onPress={this.onPressed}>
          <View style={[styles.container, style]} pointerEvents="box-only">
            <Header title={title} type={eventType}  />
            <Content title={title} artistKey={artistKey} {...rest} />
          </View>
        </TouchableWithoutFeedback>
      </ScaleAndOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    zIndex: 1,
    elevation: 3,
  },
});

export default ListItem;
