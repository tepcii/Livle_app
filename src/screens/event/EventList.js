import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ListView, TouchableOpacity, ScrollView, Animated, InteractionManager } from 'react-native';
import { SharedElementRenderer } from 'react-native-motion';
import moment from 'moment';
import List from './List';
import Detail from './Detail';
import Menu from './Menu';
import ToolbarBackground from './ToolbarBackground';

export class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      phase: 'phase-0',
    };
  }

  onItemPressed = item => {
    this.setState({
      phase: 'phase-1',
      selectedItem: item,
    });
  };

  onBackPressed = () => {
    this.setState({
      phase: 'phase-3',
    });
  };

  onSharedElementMovedToDestination = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        phase: 'phase-2',
      });
    });
  };

  onSharedElementMovedToSource = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        selectedItem: null,
        phase: 'phase-0',
      });
    });
  };

  renderPage() {
    const { selectedItem, phase, detailItem, position } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <List
          selectedItem={selectedItem}
          onItemPress={this.onItemPressed}
          phase={phase}
          eventList={this.props.eventList}
          artists={this.props.artists}
        />
        <Detail
          phase={phase}
          selectedItem={selectedItem}
          onBackPress={this.onBackPressed}
          onSharedElementMovedToDestination={
            this.onSharedElementMovedToDestination
          }
          onSharedElementMovedToSource={this.onSharedElementMovedToSource}
          eventList={this.props.eventList}
          artists={this.props.artists}
        />

      </View>
    );
  }

  render() {
    const {
      selectedItem,
      phase,
      position,
      goBackRequest,
    } = this.state;

    return (
      <SharedElementRenderer>
        <View style={styles.container}>
          <ToolbarBackground
            isHidden={phase !== 'phase-1' && phase !== 'phase-2'}
          />
          {this.renderPage()}
        </View>
      </SharedElementRenderer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    eventList: state.liveEvent,
    artists: state.artists,
  };
};

const Container = connect(
  mapStateToProps,
)(EventList);

export default Container;
