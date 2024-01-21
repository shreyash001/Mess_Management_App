import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 3000);
  }, [])
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