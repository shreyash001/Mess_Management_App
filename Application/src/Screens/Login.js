import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, BackHandler, Alert, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Login = ({ navigation }) => {

  const isFocused = useIsFocused()

  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  // const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 2);

  useEffect(() => {
    // checkStoredData()

    // console.log(buttonWidth)
    
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );

    // return () => (backHandler.remove());


  }, [isFocused])

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to Exit App ?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };


  const checkStoredData = async () => {
    const jsonValue = await AsyncStorage.getItem('USER')
    const data = JSON.parse(jsonValue)

    // console.log(data)

    if (data !== null) {
      setPhoneNo(data.phoneNo)
      setPassword(data.password)
      console.log('Retrived Login Info ')
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('USER', jsonValue);
      console.log('User Data Saved')

    } catch (e) {
      console.log('async storage error')
    }

  };

  const handleLogin = async () => {

    if (phoneNo !== '' && password !== '') {
      const Users = await firestore()
        .collection('Users')
        .where('_id', "==", phoneNo)
        .get()

      if (Users._docs != '') {
        if (phoneNo === Users.docs[0]._data.phoneNo && password === Users.docs[0]._data.password) {
          if (!Users.docs[0]._data.isUser) {
            navigation.navigate('AdminHome')
          } else {
            storeData(Users.docs[0]._data)
            // navigation.navigate('UserHome')
            navigation.navigate('Home2')

          }
          // console.log("Login Triggerd")
        } else {
          alert('Enter Valid password')
        }
      } else {
        alert('Enter Valid Mobile No./Password')
      }

    } else {
      alert('Enter the correct details')
    }


    // console.log(email,password)
    console.log('handel login function triggered')

  }


  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/splash.png')}
        style={{ height: 175, width: 250, objectFit: 'fill', alignSelf: 'center' }}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.inputStyle}
        placeholder='Enter Mobile No.'
        keyboardType='number-pad'
        placeholderTextColor='black'
        value={phoneNo}
        onChangeText={txt => setPhoneNo(txt)} />
      <TextInput style={styles.inputStyle}
        placeholder='Enter Password'
        placeholderTextColor='black'
        value={password}
        secureTextEntry={true}
        onChangeText={txt => setPassword(txt)} />


      <View style={{...styles.btnControl}}>

        <TouchableOpacity style={styles.loginBt} onPress={() => {
          navigation.navigate('Register')
        }}>
          <Text style={{ fontWeight: '500', fontSize: 18, color: 'white' }}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBt} onPress={() => {
          handleLogin()
        }}>
          <Text style={{ fontWeight: '500', fontSize: 18, color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    marginBottom: 5,
    justifyContent:'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 20,
    alignSelf: 'center',
  },
  btnControl:{
    flexDirection:"row",
    alignSelf:'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.80,
    borderRadius: 10,
    width: '90%',
    color: 'black',
  },
  loginBt: {
    backgroundColor: 'green',
    width: 'auto',
    minWidth: 100,
    height: 50,
    alignSelf: 'center',
    borderRadius: 50,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  

})

export default Login