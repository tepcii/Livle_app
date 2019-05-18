import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions, ActionConst } from 'react-native-router-flux';
import { isIphoneX } from 'react-native-iphone-x-helper';

import Row from './Row';

const SCREEN_HEIGHT = Dimensions.get("window").height;

class BottomBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(0),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isHidden && nextProps.isHidden) {
      this.hideAnimation();
    }
    if (this.props.isHidden && !nextProps.isHidden) {
      this.showAnimation();
    }
  }
  hideAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: 56,
      useNativeDriver: true,
    }).start();
  }
  showAnimation() {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: this.state.translateY,
              },
            ],
          },
        ]}
      >
        <Row style={styles.barContainer}>
          <TouchableWithoutFeedback onPress={() => Actions.event({ type: ActionConst.RESET })}>
            <View style={styles.iconContainer}>
              <Icon
                name={'calendar'}
                color={'#ddd'}
                style={styles.tabIconStyle}
                />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.iconContainer}>
            <Icon
              name={'list-ul'}
              color={'#FF9500'}
              style={styles.tabIconStyle}
              />
          </View>
          <TouchableWithoutFeedback onPress={() => Actions.money({ type: ActionConst.RESET })}>
            <View style={styles.iconContainer}>
              <Icon
                name={'yen'}
                color={'#ddd'}
                style={styles.tabIconStyle}
                />
            </View>
          </TouchableWithoutFeedback>
        </Row>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: isIphoneX() ? SCREEN_HEIGHT * 0.12 : SCREEN_HEIGHT * 0.07,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  barContainer: {},
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default BottomBar;
