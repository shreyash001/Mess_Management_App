/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
  FlatList,
  Button,
  BackHandler,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Common/Header';
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';

import * as api from '../../Action/api'

const Home = ({ navigation }) => {

  const [userData, setUserData] = useState({})
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
  const [date, setDate] = useState(new Date)

  useEffect(() => {
    getData()
    // console.log(userData)
  }, [])

  // useEffect( () => {
  //   // console.log("Updated user data: ",userData)
  //   api.updateUserData(userData)
  // },[userData])
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('USER');
      let data = JSON.parse(jsonValue)
      setUserData(data)
      // console.log('Data retrived sucessfully')
    } catch (e) {
      console.log('error reading async value')
    }
  };

  const handleLeaveBtn = async () => {
    console.log('leave triggered')
    const leaveData = await firestore().collection('Leave').doc(date.toDateString()).get()
    let tempLeave = []

    if (leaveData._data === undefined) {
      await firestore().collection('Leave').doc(date.toDateString())
        .set({
          date: date.toDateString(),
          leaveUsers: []
        })
      console.log('undefined handelled')
      handleLeaveBtn()
    } else {
      tempLeave = leaveData._data.leaveUsers
      if (toggleCheckBox1 || toggleCheckBox2) {
        tempLeave.push({
          _id: userData._id,
          name: userData.name,
          phoneNo: userData.phoneNo,
          lunchLeave: toggleCheckBox1,
          dinnerLeave: toggleCheckBox2
        })
        alert('Leave Request send')
      } else {
        alert("Invalid: Empty Leave")
      }

      await firestore().collection('Leave').doc(date.toDateString()).update({
        leaveUsers: tempLeave
      })
    }

  }

  return (
    <ScrollView style={styles.container}>

      <Header
        title={'DaDa Biryani'}
        icon={require('../../Images/logout.png')}
      />


      <View>
        <View style={styles.userData}>

          {/* <View style={styles.icon} >
            <TouchableOpacity >
              <Image source={require('../../Images/edit.png')}
                style={styles.icon} />
            </TouchableOpacity>
          </View> */}

          <Image
            source={require("../../Images/members.png")}
            style={styles.userImage}
          />

          <View style={styles.nameView}>
            <Text style={styles.userText}>Welcome:
              <Text style={{ color: 'green' }}>{"  " + userData.name}</Text>
            </Text>
            <View>
              {/* <Text style={[styles.nameText, { color: 'black' }]}>Meal Left: 60</Text> */}
            </View>
          </View>



        </View>
      </View>

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.userText}>View Orders</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('ViewOrder', {
                userData: userData
              })
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={[styles.leaveView, { backgroundColor: '#A6CF98' }]}>
        <Text style={{ fontWeight: 800, fontSize: 18, marginTop: 10 }}>Ask Leave {date.toLocaleDateString()}</Text>


        <View style={styles.orderView}>
          <View>
            <Text>Lunch</Text>
            <CheckBox
              disabled={false}
              value={toggleCheckBox1}
              tintColors={{ true: '#F15927', false: 'black' }}
              onValueChange={(newValue) => setToggleCheckBox1(newValue)}
            />
          </View>

          <View>
            <Text>Dinner</Text>
            <CheckBox
              disabled={false}
              value={toggleCheckBox2}
              tintColors={{ true: '#F15927', false: 'black' }}
              onValueChange={(newValue) => setToggleCheckBox2(newValue)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              handleLeaveBtn()
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>Request</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    backgroundColor: '#F2FFE9',
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#A6CF98',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  userData: {
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: '#fff',
    backgroundColor: '#A6CF98',
    // justifyContent:'space-evenly',
    elevation: 0,
    marginTop: 10,
    borderRadius: 15,
    height: 'auto',
    marginBottom: 10,
    paddingLeft: 10,
  },

  leaveView: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    marginBottom: 10,
    justifyContent: 'space-evenly',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
    alignSelf: 'center'
  },
  nameView: {
    width: '90%',
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center'
  },
  orderView: {
    width: '90%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  userText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'black'
  },
  memberCount: {
    fontSize: 20,
    color: 'green',
    fontWeight: '700',
  },
  viewBtn: {
    backgroundColor: 'green',
    margin: 10,
    padding: 10,
    width: 'auto',
    minWidth: 100,
    borderRadius: 50
  },
  saveBtn: {

  },
  icon: {
    width: 24,
    height: 24,
  },

});


export default Home