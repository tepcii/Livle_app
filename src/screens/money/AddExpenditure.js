import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addExpenditure } from '../../actions';
import ReactNative, { StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView, Picker, AsyncStorage, FlatList, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { Actions, ActionConst } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Styles from '../styles/AddExpenditureStyles';
import Header from '../Header';
import date from '../Date';

const nanoid = require('nanoid/non-secure');
const today = new Date();

export class AddExpenditure extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: nanoid(15),
      type: null,
      date: moment(today).format('YYYY-MM-DD'),
      artistKey: [],
      artistName: [],
      amountOfMoney: null,
      amountOfMoneyWithComma: null,
      memo: null,
      textInputMemoBorderColor: '#ededed',
      artistCount: 1,
      requiredMessageVisible: false,
    };
  };


  _handleChangeOption = (val) => {
    if (val !== 0) {
      this.setState({type: val})
    }
  }

  onPressConfirmButton(e) {
    if (this.state.amountOfMoney) {
      this.props.onAddExpenditure({
        amountOfMoney: this.state.amountOfMoney,
        id: this.state.id,
        date: this.state.date,
        artistKey: this.state.artistKey,
        memo: this.state.memo,
        type: this.state.type,
      });
      Actions.money({ type: ActionConst.RESET });
    } else {
      this.setState({requiredMessageVisible: true});
    }
  };

  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.refs.scroll.scrollToFocusedInput(reactNode)
  };

  changeArtistKey(i, newKey) {
    const artistKeyCopy = this.state.artistKey.slice();
    artistKeyCopy[i] = newKey;
    const artistNameCopy = this.state.artistName.slice();
    var selectedArtist = this.props.artists.filter(artist => artist.key === newKey);
    artistNameCopy[i] = selectedArtist[0].name
    this.setState({artistKey: artistKeyCopy, artistName: artistNameCopy});
  };

  removeArtist = (index) => {
    var artistKeyCopy = this.state.artistKey.slice();
    var artistNameCopy = this.state.artistName.slice();
    artistKeyCopy.splice(index.i, 1);
    artistNameCopy.splice(index.i, 1);
    this.setState({artistKey: artistKeyCopy, artistName: artistNameCopy, artistCount: this.state.artistCount - 1});
  }

  _holdText(selectorIndex) {
    return selectorIndex;
  }

  onPressNext () {
  }

  onChangedMoney(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("数字を入力してください。");
        }
    }
    this.setState({ amountOfMoney: newText , amountOfMoneyWithComma: newText.toLocaleString()});
}

  render() {
    let my = this;
    const data = [];
    this.props.artists.map(function(i) {
      if (my.state.artistKey.indexOf(i.key) == -1) {
        data.push({key: i.key, label: i.name})
      }
    });

    var artistPicker = [];

    for (let i = 0; i < this.state.artistCount; i++) {
      artistPicker.push(
        <View style={Styles.artistsPicker} key={i}>
          <ModalSelector
            style={{flex: 1}}
            data={data}
            initValue="選択してください"
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => {this.changeArtistKey(i, option.key)}}
            >
            <TextInput
              style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50}}
              editable={false}
              placeholder="選択してください"
              selectorIndex={1}
              value={this.state.artistName[i]} />
          </ModalSelector>
          {(() => {
            if (this.state.artistCount > 1) {
              return (
                <TouchableOpacity
                  onPress={() => {this.removeArtist({i})}}
                  >
                  <Icon
                    name={'times'}
                    color={'#000'}
                    style={Styles.tabIconStyle}
                  />
                </TouchableOpacity>
              )
            }
          })()}
        </View>
      );
    }


    return (
      <KeyboardAwareScrollView style={Styles.container} ref="scroll" extraScrollHeight={156} enableOnAndroid={true} keyboardShouldPersistTaps='handled'>
        <View>
          <View style={Styles.textInputParent}>
            <Text>金額</Text>
            <View style={Styles.inputMoneyParent}>
              <TextInput
                style={Styles.textInputMoney}
                keyboardType='numeric'
                placeholderTextColor="#C7C7C7"
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.amountOfMoneyWithComma}
                onChangeText={(text) => this.onChangedMoney(text)}
              />
            <Text style={{textAlignVertical: 'bottom', fontSize: 20}}>円</Text>
            </View>

          </View>

          <Text>種類</Text>
          <View style={Styles.ticketsPicker}>
            <Picker
              selectedValue={this.state.type}
              onValueChange={this._handleChangeOption}>
              <Picker.Item label='選択してください' value='0' />
              <Picker.Item label={"チケット"} value={"ticket"}/>
              <Picker.Item label={"グッズ"} value={"goods"}/>
              <Picker.Item label={"交通費"} value={"transportationExpenses"}/>
              <Picker.Item label={"宿泊費"} value={"accommodationFee"}/>
              <Picker.Item label={"その他"} value={"other"}/>
            </Picker>
          </View>

          <Text>日付</Text>
          <View style={Styles.datePicker}>
            <DatePicker
              customStyles={{dateInput:{borderWidth: 0}}}
              locale={'ja'}
              date={this.state.date}
              format='YYYY-MM-DD'
              confirmBtnText='確定'
              androidMode='spinner'
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>

          <Text style={{marginBottom: 20}}>アーティスト</Text>
          {artistPicker}
          <View style={Styles.addArtistButtonContainer}>
            <View style={Styles.addArtistButton}>
              <Button
                borderRadius={25}
                containerViewStyle={{borderRadius:25}}
                title="追加"
                icon={{ name:'add', size:24, color:'#000' }}
                color="#000"
                onPress={() => {this.setState({artistCount: this.state.artistCount+1})}}
                buttonStyle={{
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>

          <Text>メモ</Text>
          <TextInput
            multiline
            blurOnSubmit={false}
            style={Styles.textInputMemo}
            placeholderTextColor="#C7C7C7"
            underlineColorAndroid='rgba(0,0,0,0)'
            value={this.state.memo}
            onChangeText={(text) => this.setState({memo: text})}
            onFocus={
              (event: Event) => {
                this._scrollToInput(ReactNative.findNodeHandle(event.target))
              }
            }
          />
          {(() =>{
            if (this.state.requiredMessageVisible) {
              return (
                <View>
                  <Text style={{color: 'red'}}>金額は入力必須です。</Text>
                </View>
              )
            }
          })()}
          <View style={Styles.backNextButtonContainer}>
            <View style={Styles.confirmButton}>
              <Button
                borderRadius={25}
                containerViewStyle={{borderRadius:25}}
                onPress={this.onPressConfirmButton.bind(this)}
                title="確定"
                buttonStyle={{
                  backgroundColor: "#3FD8B6",
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
};

const mapStateToProps = state => {
  return {
    artists: state.artists,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddExpenditure: expenditure => dispatch(addExpenditure(expenditure)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpenditure);

export default Container;
