import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import Row from './Row';

class Content extends Component {
  render() {
    const { artistKey, artists, title, memo, date, venue, isReceived } = this.props;
    var newdate = moment(date).format("YYYY年MM月DD日");
    var colorList = [];
    let colorIcon = [];

    artistKey.map(artist => {
      this.props.artists.map(propArtist => {
        if (artist === propArtist.key) {
          colorList.push(propArtist.color)
        }
      })
    })

    colorList.map(color => {
      colorIcon.push(
        <Icon
          key={color}
          name={'circle'}
          color={color}
          style={styles.tabIconStyle}
        />
      )
    })

    return (
      <Row style={styles.container}>
        <View style={styles.cellContainer}>
          {colorIcon}
          <Text style={styles.dateText}>{newdate}</Text>
        </View>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 10,
    color: 'gray',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '900',
  },
  venueText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'right'
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'right',
  },
  tabIconStyle: {
    marginLeft: 15,
    width: 24,
    height: 24,
    fontSize: 24,
  },
});

const mapStateToProps = state => {
  return {
    artists: state.artists,
  };
};

const Container = connect(
  mapStateToProps,
)(Content);

export default Container;
