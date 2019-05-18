import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Row from './Row';
import translateAndOpacity from './translateAndOpacity';

class Toolbar extends Component {
  render() {
    const { onBackPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <TouchableWithoutFeedback onPress={onBackPress}>
          <View>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <Icon
                  name={'chevron-left'}
                  color={'white'}
                  style={styles.tabIconStyle}
                />
                <Text style={styles.titleBackText}>Back</Text>
              </Row>
            </Row>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statusBar: {
    height: 24,
    backgroundColor: '#FF9500',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
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
    width: 20,
    height: 20,
    fontSize: 20,
  }
});

export default translateAndOpacity(Toolbar);
