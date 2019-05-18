import React from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(112),
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions().then(() => {
      this.showAnimation(this.props);
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isHidden && nextProps.isHidden) {
      this.hideAnimation(nextProps);
    }
  }
  showAnimation(props) {
    Animated.timing(this.state.translateY, {
      easing: Easing.out(Easing.back()),
      toValue: 0,
      delay: props.delay,
    }).start();
  }
  hideAnimation(props) {
    Animated.timing(this.state.translateY, {
      easing: Easing.in(Easing.back()),
      toValue: 112,
      delay: props.delay,
    }).start();
  }
  render() {
    const { backgroundColor, name } = this.props;
    const { translateY } = this.state;

    const animationStyle = {
      transform: [{ translateY }],
    };

    return (
      <Animated.View
        style={[styles.iconContainer, { backgroundColor }, animationStyle]}
      >
        <Icon
          name={name}
          color={'white'}
          style={styles.tabIconStyle}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: {
    width: 24,
    height: 24,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Button;
