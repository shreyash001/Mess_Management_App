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
} from 'react-native';
import React, { useState, useEffect } from 'react'

import Header from '../../Common/Header';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>

      <Header title={'Admin Pannel'} icon={require('../../Images/logout.png')} />

      <View style={styles.itemView}>
        <View style={styles.totalUserView}>
          <Text style={styles.nameText}>Total Users Registered</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('TotalUsers')
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.itemView}>
        <View style={styles.totalUserView}>
          <Text style={styles.nameText}>Plan Active Users</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('ActiveUsers')
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>View Plans</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('ViewPlan')
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>Attendence</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('Attendence')
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>Leave</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('Leave')
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>View Orders</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('view btn triggered')
              navigation.navigate('Orders')
            }}
            style={styles.viewBtn} >
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: 700, fontSize: 15 }}>View</Text>
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
    // backgroundColor: '#fff',
    backgroundColor: '#A6CF98',

    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  orderView: {
    width: '80%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalUserView:{
    width: '80%',
    margin: 10,
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '53%',
    margin: 10,
  },

  nameText: {
    fontSize: 18,
    fontWeight: '700',
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
    width: 100,
    borderRadius: 50
  },
});

export default Home