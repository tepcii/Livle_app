import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Row from './Row';
import translateAndOpacity from './translateAndOpacity';
import NextMessage from './NextMessage';

const propTypes = {
  filterUntil: PropTypes.func,
  filterSince: PropTypes.func,
};

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'since',
    };
  };

  onMenuButtonPress() {
    console.log("menu!");
  };

  onPlusButtonPress() {
    if (this.props.artists.length === 0) {
      Alert.alert(
        'はじめにアーティストを登録してください。',
        '',
        [
          {text: 'OK', onPress: () => Actions.artist()},
        ],
        { cancelable: false }
      )
    } else {
      Actions.addevent()
    }
  };

  onFilterButtonPress() {
    this.setState({filter: 'until'});
    return this.props.filterUntil();
  };

  onFilter2ButtonPress() {
    this.setState({filter: 'since'});
    return this.props.filterSince();
  };

  onFilter3ButtonPress() {
    this.setState({filter: 'all'});
    return this.props.filterAll();
  };

  render() {
    const { eventList, artists } = this.props;
    const { filter } = this.state;
    let filterIcon = null;

    if (filter === 'all') {
      filterIcon =
      <TouchableOpacity onPress={() => {this.onFilterButtonPress();}}>
        <View style={styles.menuIconContainer}>
          <Icon
            name={'sort'}
            color={'#FF9500'}
            style={styles.tabIconStyle}
          />
        </View>
      </TouchableOpacity>
    } else if (filter === 'until') {
      filterIcon =
      <TouchableOpacity onPress={() => {this.onFilter2ButtonPress();}}>
        <View style={styles.menuIconContainer}>
          <Icon
            name={'sort-up'}
            color={'#FF9500'}
            style={styles.tabIconStyle}
          />
        </View>
      </TouchableOpacity>
    } else if (filter === 'since'){
      filterIcon =
      <TouchableOpacity onPress={() => {this.onFilter3ButtonPress();}}>
        <View style={styles.menuIconContainer}>
          <Icon
            name={'sort-down'}
            color={'#FF9500'}
            style={styles.tabIconStyle}
          />
        </View>
      </TouchableOpacity>
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View>
          <Row style={styles.toolbarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>イベントリスト</Text>
            </View>
            {filterIcon}
            <TouchableOpacity onPress={() => {this.onPlusButtonPress();}}>
              <View style={styles.menuIconContainer}>
                <Icon
                  name={'plus'}
                  color={'#FF9500'}
                  style={styles.tabIconStyle}
                />
              </View>
            </TouchableOpacity>
          </Row>
          <NextMessage eventList={eventList} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#FF9500',
  },
  item: {

  },
  statusBar: {
    height: 24,
    backgroundColor: 'white',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: {
    width: 24,
    height: 24,
    fontSize: 24,
  },
});

Toolbar.propTypes = propTypes;
export default translateAndOpacity(Toolbar);
