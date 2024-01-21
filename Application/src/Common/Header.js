import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const { height, width } = Dimensions.get('window');
const Header = ({ title, icon, count, onClickIcon,goBackIcon }) => {
  const navigation = useNavigation()

  const handleLogout = async() => {
    await AsyncStorage.removeItem('USER').then(
      () => {
        { console.log('logout Sucessful') }
        navigation.navigate('Login')
      }
    )
  }

  return (
    <View style={styles.container}>
      {
        goBackIcon && (
          <View
          style={{
            width: 10,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <Image source={goBackIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        )
      }
      <Text style={styles.title}>{title}</Text>
      {icon && (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleLogout()
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
            }}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    elevation: 5,
    backgroundColor: '#fff',

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'purple',
  },
  icon: {
    width: 24,
    height: 24,
  },
  count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});