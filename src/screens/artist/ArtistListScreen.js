import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Alert,
  ListView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { deleteArtist } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Styles from '../styles/ArtistListStyles';
import Header from '../Header';
import Toolbar from './Toolbar'
import Row from './Row';
import BottomBar from './BottomBar';

export class ArtistListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedItem: null,
      rowData: null,
      totalMoney: null,
      totalPlan: null,
    };
  }

  deleteArtist() {
    this.setState({modalVisible: false});
    this.props.onDeleteArtist({
      key: this.state.rowData.key,
    });
  }

  onPressed(rowData, totalMoney, totalPlan) {
    this.setState({
      modalVisible: true,
      selectedItem: rowData.key,
      rowData: rowData,
      totalMoney: totalMoney,
      totalPlan: totalPlan,
    });
  }

  hideModal() {
    this.setState({modalVisible: false, selectedItem: false})
  }

  _onPressEditButton = () => {
    this.hideModal()
    console.log(this.state.rowData.key)
    Actions.editartist({
      artistid: this.state.rowData.key,
      artistName: this.state.rowData.name,
      image: this.state.rowData.image,
      color: this.state.rowData.color,
      description: this.state.rowData.description
    });
  }

  _onPressDeleteButton = (n) => {
    Alert.alert(
      'アーティストを削除しますか？',
      '',
      [
        {text: 'いいえ', style: 'cancel'},
        {text: 'はい', onPress: this.deleteArtist.bind(this)},
      ],
      { cancelable: false }
    )
  }

  renderRow(rowData, sectionID, rowID) {
    var totalMoney = 0;
    this.props.expenditure.map(exp => {
      if(exp.artistKey.indexOf(rowData.key) >= 0) {
        totalMoney += exp.amountOfMoney / exp.artistKey.length;
      }
    });

    var totalPlan = 0;
    this.props.eventList.map(eve => {
      if(eve.artistKey.indexOf(rowData.key) >= 0 && eve.eventType === 'live') {
        totalPlan += 1;
      }
    });

    var imageWidthAndHeight = (Dimensions.get('window').width - 20) / 2;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPressed(rowData, totalMoney, totalPlan)}
      >
        <View style={Styles.artistContent}>
          {(() => {
            if (rowData.image) {
              return (
                <Image
                  source={{uri: rowData.image}}
                  style={{flex: 1, height: imageWidthAndHeight, width: imageWidthAndHeight}}
                  />
              )
            } else {
              return (
                <Image
                  source={require('../../image/white.png')}
                  style={{flex: 1, height: imageWidthAndHeight, width: imageWidthAndHeight}}
                />
              )
            }
          })()}
          <View style={{padding: 10}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={Styles.artistName}>{rowData.name}</Text>
            <Text>イベント数：{totalPlan}回</Text>
            <Text>使ったお金：{Math.floor(totalMoney).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}円</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )

  }

  render() {
    var backImageWidthAndHeight = (Dimensions.get('window').width - 20);
    return (
      <View style={Styles.container}>
        <Toolbar />
        {(()=> {
          if (this.state.rowData !== null) {
            return (
              <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setState({modalVisible: false, selectedItem: false})
                }}
              >
                <ScrollView>
                  <View style={Styles.artistModal}>
                    {(() => {
                      if (this.state.rowData.image) {
                        return (
                          <ImageBackground
                            source={{uri: this.state.rowData.image}}
                            style={{height: backImageWidthAndHeight, width: backImageWidthAndHeight}}
                          >
                            <TouchableHighlight
                              onPress={() => {this.hideModal()}}
                            >
                              <View
                                style={{backgroundColor: 'rgba(0, 0, 0, 0)', height: 70, justifyContent: 'center'}}>
                                <View style={Styles.iconContainer}>
                                  <Icon
                                    name={'chevron-left'}
                                    color={'black'}
                                    style={Styles.tabIconStyle}
                                    />
                                </View>
                              </View>
                            </TouchableHighlight>
                          </ImageBackground>
                        )
                      } else {
                        return (
                          <ImageBackground
                            source={require('../../image/white.png')}
                            style={{height: backImageWidthAndHeight, width: backImageWidthAndHeight}}
                          >
                            <TouchableHighlight
                              onPress={() => {this.hideModal()}}
                              >
                              <View
                                style={{backgroundColor: 'rgba(0, 0, 0, 0)', height: 70, justifyContent: 'center'}}>
                                <View style={Styles.iconContainer}>
                                  <Icon
                                    name={'chevron-left'}
                                    color={'black'}
                                    style={Styles.tabIconStyle}
                                    />
                                </View>
                              </View>
                            </TouchableHighlight>
                          </ImageBackground>
                        )
                      }
                    })()}
                    <View style={{padding: 10}}>
                      <View style={Styles.itemContainer}>
                        <Row style={Styles.rowContainer}>
                          <Text style={Styles.artistName}>{this.state.rowData.name}</Text>
                        </Row>
                      </View>
                      <View style={Styles.itemContainer}>
                        <Row style={Styles.rowContainer}>
                          <View style={Styles.titleContainer}>
                            <Text>イベント数</Text>
                          </View>
                          <Text style={Styles.amountText}>{this.state.totalPlan}回</Text>
                        </Row>
                      </View>
                      <View style={Styles.itemContainer}>
                        <Row style={Styles.rowContainer}>
                          <View style={Styles.titleContainer}>
                            <Text>使ったお金</Text>
                          </View>
                          <Text style={Styles.amountText}>{Math.floor(this.state.totalMoney).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}円</Text>
                        </Row>
                      </View>
                      <View style={Styles.itemContainer}>
                        <Row style={Styles.rowContainer}>
                          <View style={Styles.titleContainer}>
                            <Text>説明</Text>
                          </View>
                        </Row>
                        <Row style={Styles.memoRowContainer}>
                          <Text style={Styles.amountText}>{this.state.rowData.description}</Text>
                        </Row>
                      </View>
                    </View>
                    <Row>
                      <View style={Styles.editIconContainer}>
                        <TouchableOpacity
                          onPress={this._onPressEditButton}>
                          <View style={Styles.editIconBack}>
                            <Icon
                              name="pencil"
                              color="white"
                              style={Styles.editIconStyle}
                              />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={Styles.deleteIconContainer}>
                        <TouchableOpacity
                          onPress={this._onPressDeleteButton}>
                          <View style={Styles.deleteIconBack}>
                            <Icon
                              name="times"
                              color="white"
                              style={Styles.deleteIconStyle}
                              />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Row>
                  </View>
                </ScrollView>
              </Modal>
            )
          }
        })()}
        <ScrollView>
          <ListView
            key={this.state.selectedItem}
            dataSource={this.props.artists}
            renderRow={(rowData,sectionID, rowID) => this.renderRow(rowData,sectionID, rowID)}
            enableEmptySections={true}
            removeClippedSubviews={false}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          />
        </ScrollView>
        <BottomBar />
      </View>
    );
  }
};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});


const mapStateToProps = state => {
  return {
    artists: ds.cloneWithRows(state.artists),
    expenditure: state.expenditure,
    eventList: state.liveEvent,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteArtist: event => dispatch(deleteArtist(event)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistListScreen);

export default Container;
