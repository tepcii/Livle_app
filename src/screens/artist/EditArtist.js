import React, {Component} from 'react';
import { connect } from 'react-redux';
import { editArtist } from '../../actions';
import ReactNative, {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Picker,
  AsyncStorage,
  CameraRoll,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-native-color';
import tinycolor from 'tinycolor2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Styles from '../styles/AddArtistStyles';
import Header from '../Header';
import date from '../Date';
import { ImagePicker, Permissions } from 'expo';


const nanoid = require('nanoid/non-secure');

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class EditArtist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      artistid: this.props.artistid,
      name: this.props.artistName,
      description: this.props.description,
      color: tinycolor(this.props.color).toHsl(),
      pickedImage: this.props.image,
      images: [],
      imageSel: [],
      selPhoto: "",
      image: this.props.image,
    };
  }

  componentDidMount() {

    let svThis = this
    CameraRoll.getPhotos({first:25})
      .then(function(obj){
        console.log(obj)
        svThis.storeImages(obj.edges, svThis)
      })
  }

  storeImages(edges,svThis) {
    const images = edges.map((asset) => {
      //Alert.alert(asset.node.image.uri)
      return asset.node.image
    })

    let imgSel = []
    images.map((img) => {
      imgSel.push({uri: img.uri, selected: false})
    })

    svThis.setState({images: images, imageSel: imgSel})
  }

  updateHue = h => this.setState({ color: { ...this.state.color, h } });
  updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
  updateLightness = l => this.setState({ color: { ...this.state.color, l } });

  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.refs.scroll.scrollToFocusedInput(reactNode)
  };

  onPressConfirmButton(e) {
    this.props.onEditArtist({
      artistid: this.state.artistid,
      name: this.state.name,
      description: this.state.description,
      color: tinycolor(this.state.color).toHslString(),
      image: this.state.image,
    });
    Actions.artist({ type: ActionConst.RESET });
  };

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [1, 1]
      });
      console.log(result);

      if (!result.cancelled) {
        this.setState({image: result.uri});
      }
    }

  }

  render() {
    let { image } = this.state;

    return (
      <KeyboardAwareScrollView style={Styles.container} ref="scroll" extraScrollHeight={156} enableOnAndroid={true} keyboardShouldPersistTaps='handled'>
        <View>
          <View style={Styles.addPlanForm}>
            <View style={Styles.textInputParent}>
              <Text>アーティスト名</Text>
              <TextInput
                style={Styles.textInput}
                placeholder="アーティスト名"
                placeholderTextColor="#C7C7C7"
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.state.name}
                onChangeText={(text) => this.setState({name: text})}
                />
            </View>

            <Text>アーティスト画像</Text>
            <View style={Styles.artistImage}>

              <Button
                onPress={this._pickImage}
                title="カメラロールから選択"
                />

              {
                image &&
                <Image
                  source={{uri: image}}
                  style={{width: 300, height: 300}}
                  />
              }
            </View>

            <View>
              <Text>イメージカラー</Text>
              <View style={Styles.imageColor}>
                <Icon
                  name={'circle'}
                  color={tinycolor(this.state.color).toHslString()}
                  style={Styles.tabIconStyle}
                  />
              </View>

              <HueSlider
                style={Styles.sliderRow}
                gradientSteps={40}
                value={this.state.color.h}
                onValueChange={this.updateHue}
                />
              <SaturationSlider
                style={Styles.sliderRow}
                gradientSteps={20}
                value={this.state.color.s}
                color={this.state.color}
                onValueChange={this.updateSaturation}
                />
              <LightnessSlider
                style={Styles.sliderRow}
                gradientSteps={20}
                value={this.state.color.l}
                color={this.state.color}
                onValueChange={this.updateLightness}
                />
            </View>
            <Text>説明</Text>
            <TextInput
              multiline
              blurOnSubmit={false}
              style={Styles.textInputDescription}
              placeholderTextColor="#C7C7C7"
              underlineColorAndroid='rgba(0,0,0,0)'
              value={this.state.description}
              onChangeText={(text) => this.setState({description: text})}
              onFocus={
                (event: Event) => {
                  this._scrollToInput(ReactNative.findNodeHandle(event.target))
                }
              }
            />
            <View style={Styles.backNextButtonContainer}>
              <View style={Styles.confirmButton}>
                <Button
                  borderRadius={25}
                  containerViewStyle={{borderRadius:25}}
                  onPress={this.onPressConfirmButton.bind(this)}
                  title="変更"
                  buttonStyle={{
                    backgroundColor: "#3FD8B6",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
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
    onEditArtist: artist => dispatch(editArtist(artist)),
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArtist);

export default Container;
