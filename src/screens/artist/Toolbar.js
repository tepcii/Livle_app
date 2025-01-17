import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions, ActionConst, } from 'react-native-router-flux';
import Row from './Row';

class Toolbar extends Component {
  renderDetail() {
    const { opacityValue, translateY } = this.state;
    const { onBackPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <TouchableWithoutFeedback onPress={onBackPress}>
          <Animated.View style={animationStyle}>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <Ionicons name="ios-arrow-back" size={24} color="white" />
                <Text style={styles.titleBackText}>Back</Text>
              </Row>
              <View style={styles.menuIconContainer}>
                <Feather name="share" size={24} color="white" />
              </View>
            </Row>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  onMenuButtonPress() {
    console.log("menu!");
  };

  onPlusButtonPress() {
    Actions.addartist();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View>
          <Row style={styles.toolbarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>アーティスト</Text>
            </View>
            <TouchableOpacity onPress={this.onPlusButtonPress}>
              <View style={styles.menuIconContainer}>
                <Icon
                  name={'plus'}
                  color={'#FF9500'}
                  style={styles.tabIconStyle}
                />
              </View>
            </TouchableOpacity>
          </Row>
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
    backgroundColor: '#008dff',
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

export default Toolbar;
