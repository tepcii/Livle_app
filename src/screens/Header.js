import React from 'react';
import { Text, View } from 'react-native';
import Styles from './styles/HeaderStyles'

const Header = () => {
  return (
    <View style={Styles.header}>
      <Text style={Styles.headerText}>Livle</Text>
    </View>
  );
};

export default Header;
