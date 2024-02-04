import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      getUserDetails()
    }, 2000);
  }, [])

  const getUserDetails = async() => {
    const jsonValue = await AsyncStorage.getItem('USER')
    const data = JSON.parse(jsonValue)

    if(data != undefined){
      navigation.navigate('Home2')
    }else{
      navigation.navigate('Login')
    }
  }
  return (
    <View style={styles.container}>
      <Image 
      source={require('../Images/splash.png')}
      style={{height:200, width:250, objectFit:'fill'}}
      /> 
      <Text style={styles.logo}>DaDa Biryani</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: 'red'
  }
})
export default Splash