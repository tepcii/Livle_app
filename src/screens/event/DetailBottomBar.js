import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { deleteEvent } from '../../actions';
import Button from './Button';
import Row from './Row';

class DetailBottomBar extends PureComponent {
  deleteContent(e) {
    this.props.onDeleteEvent({
      eventKey: this.props.eventKey,
    });
    this.props.onBackPress();
  }

  _onPressEditButton = () => {
    if (this.props.eventType === "live") {
      Actions.editevent({
        eventid: this.props.eventKey,
        date: this.props.date,
        title: this.props.title,
        artistKey: this.props.artistKey,
        venue: this.props.venue,
        openTime: this.props.openTime,
        startTime: this.props.startTime,
        memo: this.props.memo,
        eventType: this.props.eventType,
      });
      this.props.onBackPress();
    } else if (this.props.eventType === "ticket") {
      Actions.editevent({
        eventid: this.props.eventKey,
        date: this.props.date,
        time: this.props.time,
        title: this.props.title,
        artistKey: this.props.artistKey,
        ticket: this.props.ticket,
        memo: this.props.memo,
        eventType: this.props.eventType,
      });
      this.props.onBackPress();
    } else if (this.props.eventType === "other") {
      Actions.editevent({
        eventid: this.props.eventKey,
        date: this.props.date,
        title: this.props.title,
        artistKey: this.props.artistKey,
        memo: this.props.memo,
        eventType: this.props.eventType,
      });
      this.props.onBackPress();
    }
  }

  _onPressDeleteButton = () => {
    Alert.alert(
      'イベントを削除しますか？',
      '',
      [
        {text: 'いいえ', style: 'cancel'},
        {text: 'はい', onPress: this.deleteContent.bind(this)},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { isHidden } = this.props;

    return (
      <Row style={styles.container}>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={this._onPressEditButton}
          >
            <Button
              isHidden={isHidden}
              name="pencil"
              backgroundColor="#008dff"
              />
          </TouchableOpacity>
        </View>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            onPress={this._onPressDeleteButton}
          >
            <Button
              isHidden={isHidden}
              name="times"
              backgroundColor="#ff2d4c"
              delay={125}
              />
          </TouchableOpacity>
        </View>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteEvent: event => dispatch(deleteEvent(event)),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 112,
    marginHorizontal: 16,
  },
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailBottomBar);

export default Container;
