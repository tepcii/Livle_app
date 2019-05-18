import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Row from './Row';

class Header extends Component {
  render() {
    const { title, type } = this.props;
    let icon = null;

    if (type === "live") {
      icon = <Icon
        name={'music'}
        color={'#008dff'}
        style={styles.tabIconStyle}
      />
    } else if (type === "ticket"){
      icon = <Icon
        name={'ticket'}
        color={'#008dff'}
        style={styles.tabIconStyle}
      />
    }

    return (
      <Row style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>{icon}</View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '900',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  rightContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: {
    width: 24,
    height: 24,
    fontSize: 24,
  },
});

export default Header;
