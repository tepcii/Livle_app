import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addExpenditure, deleteExpenditure } from '../../actions';
import ReactNative, { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Alert, ListView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import Row from './Row';

const nanoid = require('nanoid/non-secure');


export class ExpenditureList extends Component {
  deleteExpenditure(key) {
    this.props.onDeleteExpenditure({
      key: key,
    });
  }

  _onPressEditButton(item) {
    Actions.editexpenditure({
      item: item
    })
  }

  _onPressDeleteButton(item) {
    Alert.alert(
      '削除しますか？',
      item.amountOfMoney + "円",
      [
        {text: 'いいえ', onPress: () => console.log("canseled")},
        {text: 'はい', onPress: () => this.deleteExpenditure(item.key)},
      ],
      { cancelable: false }
    )
  }

  _renderItem = ({item}) => {
    var artistList = [];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    item.artistKey.map(artist => {
      this.props.artists.map(propArtist => {
        if (artist === propArtist.key) {
          artistList.push(propArtist.name);
        }
      })
    })
    var dataSource = ds.cloneWithRows(artistList);

    return (
      <Row>
        <View style={styles.item}>
          <Row>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20}}>{item.amountOfMoney}円</Text>
            </View>
            <View style={{flex: 1}}>
              {(() => {
                if (item.type === 'ticket') {
                  return <Text style={{textAlign: 'right'}}>チケット</Text>
                } else if (item.type === 'goods') {
                  return <Text style={{textAlign: 'right'}}>グッズ</Text>
                } else if (item.type === 'transportationExpenses') {
                  return <Text style={{textAlign: 'right'}}>交通費</Text>
                } else if (item.type === 'accommodationFee') {
                  return <Text style={{textAlign: 'right'}}>宿泊費</Text>
                } else if (item.type === 'other') {
                  return <Text style={{textAlign: 'right'}}>その他</Text>
                }
              })()}
              <ListView
                dataSource={dataSource}
                renderRow={(rowData) => <Text style={{textAlign: 'right'}}>{rowData}</Text>}
              />
              <Text style={{textAlign: 'right'}}>{item.date}</Text>
            </View>
          </Row>
          <Row>
            <Text>{item.memo}</Text>
          </Row>
        </View>
        <TouchableOpacity
          style={{backgroundColor: "#008dff", flex: 1, margin: 5, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this._onPressEditButton(item)}>
          <Text style={{color: "white"}}>編集</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: "#ff2d4c", flex: 1, margin: 5, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this._onPressDeleteButton(item)}>
          <Text style={{color: "white"}}>削除</Text>
        </TouchableOpacity>
      </Row>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.expenditure}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    flex: 5,
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 2,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    elevation: 5,
  },
});

const mapStateToProps = state => {
  return {
    artists: state.artists,
    expenditure: state.expenditure,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteExpenditure: expenditure => dispatch(deleteExpenditure(expenditure)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenditureList);

export default Container;
