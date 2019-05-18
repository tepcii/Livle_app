import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addLiveEvent, addTicketEvent, addOtherEvent } from '../../actions';
import ReactNative, { StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView, Picker, AsyncStorage, FlatList, Image, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePicker } from 'expo';
import Styles from '../styles/AddPlanStyles';
import Header from '../Header';
import date from '../Date';

const nanoid = require('nanoid/non-secure');
const today = new Date();

export class AddEvent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      eventid: nanoid(),
      date: moment(today).format('YYYY-MM-DD'),
      artistKey: [],
      artistName: [],
      ticket: null,
      title: null,
      venue: null,
      openTime: null,
      startTime: null,
      time: null,
      memo: null,
      eventtype: null,
      isOpenTimePickerVisible: false,
      isTimePickerVisible: false,
      textInputMemoBorderColor: '#ededed',
      artistCount: 1,
      requiredLiveMessageVisible: false,
      requiredTicketMessageVisible: false,
      requiredOtherMessageVisible: false,
      image: [],
    };
  };

  _showOpenTimePicker = () => this.setState({ isOpenTimePickerVisible: true });

  _hideOpenTimePicker = () => this.setState({ isOpenTimePickerVisible: false });

  _handleOpenTimePicker = (selectTime) => {
    this.setState({openTime: moment(selectTime).format('HH:mm')});
    this._hideOpenTimePicker();
  };

  _showStartTimePicker = () => this.setState({ isStartTimePickerVisible: true });

  _hideStartTimePicker = () => this.setState({ isStartTimePickerVisible: false });

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicker = (selectTime) => {
    this.setState({time: moment(selectTime).format('HH:mm')});
    this._hideTimePicker();
  };

  _handleStartTimePicker = (selectTime) => {
    this.setState({startTime: moment(selectTime).format('HH:mm')});
    this._hideStartTimePicker();
  };

  _handleChangeOptionTickets = (val) => {
    if (val !== 0) {
      this.setState({ticket: val})
    }
  }

  onPressLiveConfirmButton(e) {
    if (this.state.title) {
      this.props.onAddLiveEvent({
        eventid: this.state.eventid,
        date: this.state.date,
        title: this.state.title,
        artistKey: this.state.artistKey,
        venue: this.state.venue,
        openTime: this.state.openTime,
        startTime: this.state.startTime,
        memo: this.state.memo,
        eventType: this.state.eventtype,
      });
      Actions.eventlist();
    } else {
      this.setState({requiredLiveMessageVisible: true});
    }
  };

  onPressTicketConfirmButton(e) {
    if (this.state.title) {
      this.props.onAddTicketEvent({
        eventid: this.state.eventid,
        date: this.state.date,
        title: this.state.title,
        artistKey: this.state.artistKey,
        ticket: this.state.ticket,
        time: this.state.time,
        memo: this.state.memo,
        eventType: this.state.eventtype,
      });
      Actions.eventlist();
    } else {
      this.setState({requiredTicketMessageVisible: true});
    }
  };

  onPressOtherConfirmButton(e) {
    if (this.state.title) {
      this.props.onAddTicketEvent({
        eventid: this.state.eventid,
        date: this.state.date,
        title: this.state.title,
        artistKey: this.state.artistKey,
        memo: this.state.memo,
        eventType: this.state.eventtype,
      });
      Actions.eventlist();
    } else {
      this.setState({requiredOtherMessageVisible: true});
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
    if (this.state.eventtype === "live") {
      Actions.addplanlivetitle();
    } else if (this.state.eventtype === 'ticket') {
      Actions.addplantickets();
    }
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
        <View style={Styles.typePicker}>
          <Picker
            selectedValue={this.state.eventtype}
            onValueChange={(itemValue) => this.setState({eventtype: itemValue})}>
            <Picker.Item label='選択してください' value='0' />
            <Picker.Item label="ライブ" value="live" />
            <Picker.Item label="チケット" value="ticket" />
            <Picker.Item label="その他" value="other" />

          </Picker>
        </View>
        {(() => {
          if (this.state.eventtype === 'live') {
            return (
              <View>
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

                <View style={Styles.textInputParent}>
                  <Text>タイトル</Text>
                  <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="#C7C7C7"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.state.title}
                    onChangeText={(text) => this.setState({title: text})}
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

                <View style={Styles.textInputParent}>
                  <Text>場所</Text>
                  <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="#C7C7C7"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.state.venue}
                    onChangeText={(text) => this.setState({venue: text})}
                    />
                </View>

                <View>
                  <Text>開場時間</Text>
                  <TouchableOpacity style={Styles.timePicker} onPress={this._showOpenTimePicker}>
                    <Text>{this.state.openTime}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <Text>開演時間</Text>
                  <TouchableOpacity style={Styles.timePicker} onPress={this._showStartTimePicker}>
                    <Text>{this.state.startTime}</Text>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  isVisible={this.state.isOpenTimePickerVisible}
                  onConfirm={this._handleOpenTimePicker}
                  onCancel={this._hideOpenTimePicker}
                  mode='time'
                  datePickerModeAndroid='spinner'
                  />

                <DateTimePicker
                  isVisible={this.state.isStartTimePickerVisible}
                  onConfirm={this._handleStartTimePicker}
                  onCancel={this._hideStartTimePicker}
                  mode='time'
                  datePickerModeAndroid='spinner'
                  />

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
                  if (this.state.requiredLiveMessageVisible) {
                    return (
                      <View>
                        <Text style={{color: 'red'}}>タイトルは入力必須です。</Text>
                      </View>
                    )
                  }
                })()}

                <View style={Styles.backNextButtonContainer}>
                  <View style={Styles.confirmButton}>
                    <Button
                      borderRadius={25}
                      containerViewStyle={{borderRadius:25}}
                      onPress={this.onPressLiveConfirmButton.bind(this)}
                      title="確定"
                      buttonStyle={{
                        backgroundColor: "#3FD8B6",
                      }}
                      />
                  </View>
                </View>
              </View>
            )
          } else if (this.state.eventtype === "ticket") {
            return (
              <View>
                <View style={Styles.textInputParent}>
                  <Text>タイトル</Text>
                  <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="#C7C7C7"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.state.title}
                    onChangeText={(text) => this.setState({title: text})}
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

                <Text>チケット</Text>
                <View style={Styles.ticketsPicker}>
                  <Picker
                    selectedValue={this.state.ticket}
                    onValueChange={this._handleChangeOptionTickets}>
                    <Picker.Item label='選択してください' value='0' />
                    <Picker.Item label={"申し込み"} value={"subscription"}/>
                    <Picker.Item label={"支払い期限"} value={"payment"}/>
                    <Picker.Item label={"当落発表"} value={"announcement"}/>
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

                <View>
                  <Text>時間</Text>
                  <TouchableOpacity style={Styles.timePicker} onPress={this._showTimePicker}>
                    <Text>{this.state.time}</Text>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  isVisible={this.state.isTimePickerVisible}
                  onConfirm={this._handleTimePicker}
                  onCancel={this._hideTimePicker}
                  mode='time'
                  datePickerModeAndroid='spinner'
                />

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
                  if (this.state.requiredTicketMessageVisible) {
                    return (
                      <View>
                        <Text style={{color: 'red'}}>タイトルは入力必須です。</Text>
                      </View>
                    )
                  }
                })()}

              <View style={Styles.backNextButtonContainer}>
                <View style={Styles.confirmButton}>
                  <Button
                    borderRadius={25}
                    containerViewStyle={{borderRadius:25}}
                    onPress={this.onPressTicketConfirmButton.bind(this)}
                    title="確定"
                    buttonStyle={{
                      backgroundColor: "#3FD8B6",
                    }}
                  />
                </View>
              </View>
              </View>
            )
          } else if (this.state.eventtype === 'other') {
            return (
              <View>
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

                <View style={Styles.textInputParent}>
                  <Text>タイトル</Text>
                  <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="#C7C7C7"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.state.title}
                    onChangeText={(text) => this.setState({title: text})}
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

                <View style={Styles.textInputParent}>
                  <Text>場所</Text>
                  <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="#C7C7C7"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.state.venue}
                    onChangeText={(text) => this.setState({venue: text})}
                    />
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
                  if (this.state.requiredOtherMessageVisible) {
                    return (
                      <View>
                        <Text style={{color: 'red'}}>タイトルは入力必須です。</Text>
                      </View>
                    )
                  }
                })()}

                <View style={Styles.backNextButtonContainer}>
                  <View style={Styles.confirmButton}>
                    <Button
                      borderRadius={25}
                      containerViewStyle={{borderRadius:25}}
                      onPress={this.onPressOtherConfirmButton.bind(this)}
                      title="確定"
                      buttonStyle={{
                        backgroundColor: "#3FD8B6",
                      }}
                      />
                  </View>
                </View>
              </View>
            )
          }
        })()}


    </KeyboardAwareScrollView>
    );
  }
};

const mapStateToProps = state => {
  return {
    liveEvent: state.liveEvent,
    artists: state.artists,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddLiveEvent: event => dispatch(addLiveEvent(event)),
    onAddTicketEvent: event => dispatch(addTicketEvent(event)),
    onAddOtherEvent: event => dispatch(addOtherEvent(event)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);

export default Container;
