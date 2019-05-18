import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';

const propsTypes = {
  dataImage: PropTypes.func,
};

class ImagePickerSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    }
    this.func = this.func.bind(this);
  }

  func() {
    return this.props.changeImageFunc(image);
  }

  // カメラを起動
  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  // カメラロールから選択
  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.READ_EXTERNAL_STORAGE);

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

    return(
      <View style={styles.containerStyle}>
        <Text>アーティスト画像</Text>

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
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15
  }
}

export default ImagePickerSample;
