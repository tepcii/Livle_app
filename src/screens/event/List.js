import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { SharedElement } from 'react-native-motion';
import moment from 'moment';
import Header from '../Header';
import ListItem from './ListItem';
import Toolbar from './Toolbar2';
import Menu from './Menu';
import BottomBar from './BottomBar';


export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacityOfSelectedItem: 1,
      selectedItem: null,
      filter: 'since',
    };
    this.sharedElementRefs = {};
  }

  onListItemPressed = item => {
    const { onItemPress } = this.props;
    this.setState({ selectedItem: item });

    onItemPress(item);

    this.sharedElementRefs[item.key].moveToDestination();
  };

  onMoveToDestinationWillStart = () => {
    this.setState({ opacityOfSelectedItem: 0 });
  };

  onMoveToSourceDidFinish = () => {
    this.setState({ opacityOfSelectedItem: 1 });
  };

  getSharedNode = props => {
    const { item } = props;

    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <ListItem item={item} animateOnDidMount={false} isHidden={false} />
      </View>
    );
  };

  filterAll = () => {
    this.setState({ filter: 'all' });
    this.forceUpdate();
  };

  filterUntil = () => {
    this.setState({ filter: 'until' });
    this.forceUpdate();
  };

  filterSince = () => {
    this.setState({ filter: 'since' });
    this.forceUpdate();
  };

  renderItem = ({ item }) => {
    const { opacityOfSelectedItem } = this.state;
    const { selectedItem } = this.props;

    const isHidden = selectedItem && selectedItem.key !== item.key;
    const isSelected = selectedItem && selectedItem.key === item.key;
    const id = item.key;

    return (
      <SharedElement
        easing={Easing.in(Easing.back())}
        ref={node => (this.sharedElementRefs[id] = node)}
        id={id}
        onMoveToDestinationWillStart={this.onMoveToDestinationWillStart}
        onMoveToSourceDidFinish={this.onMoveToSourceDidFinish}
        getNode={this.getSharedNode}
        item={item}
      >
        <View style={{opacity: opacityOfSelectedItem, backgroundColor: 'transparent'}}>
          <ListItem
            item={item}
            onPress={this.onListItemPressed}
            isHidden={isHidden}
          />
        </View>
      </SharedElement>
    )
  }

  render() {
    const { opacityOfSelectedItem, filter } = this.state;
    const { selectedItem, phase, eventList, artists } = this.props;
    var nowDate = new Date();
    var today = moment(nowDate).format("YYYY-MM-DD");
    var data = null;

    switch (filter) {
      case 'empty':
        var data = null;
        break;
      case 'all':
        var data = eventList.slice(0, eventList.length);
        break;
      case 'until':
        var data = eventList.filter(eventObj => eventObj.date <= today);
        break;
      case 'since':
        var data = eventList.filter(eventObj => eventObj.date >= today);
        break;
      default:
        var data = eventList.slice(0, eventList.length);
    }

    return (
      <View style={styles.container}>
        <Toolbar
          isHidden={phase !== 'phase-0'}
          onBackPress={this.onBackPressed}
          eventList={eventList}
          artists={artists}
          filterUntil={() => { this.filterUntil(); }}
          filterSince={() => { this.filterSince(); }}
          filterAll={() => { this.filterAll(); }}
        />
        <FlatList
          data={data}
          dataExtra={{ phase, opacityOfSelectedItem }}
          keyExtractor={item => item.key}
          renderItem={this.renderItem}
        />
        <BottomBar isHidden={phase !== 'phase-0'} />
        <Menu />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default List;
