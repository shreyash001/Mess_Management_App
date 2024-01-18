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
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import { useIsFocused } from '@react-navigation/native';
import Header from '../../Common/Header';

const Transaction = () => {

  const [orderData, setOrderData] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    getOrderDetails()
  }, [])

  const getOrderDetails = async () => {
    await firestore()
    .collection('Orders')
    .get()
    .then(querySnapshot => {
      let tempData = [];
      querySnapshot.forEach(documentSnapshot => {
        tempData.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data(),
        });
      });
      setOrderData(tempData);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Transactions'}
      />
      <View>
        <FlatList
          data={orderData.sort((a, b) => new Date(b.data.data.orderDate) - new Date(a.data.data.orderDate))}
          renderItem={(item, index) => {
            return (
              <View>
                <View key={index} style={styles.contentView}>
                  <Text style={styles.nameText}>{item.item.data.userData.userName}</Text>
                  <Text>{item.item.data.userData.userMobile}</Text>
                  <Text>{item.item.data.data.orderDate}</Text>
                  <Text style={styles.memberCount}>{item.item.data.data.orderTotal}</Text>
                  <Text>{item.item.data.data.paymentId}</Text>
                </View>
              </View>
            );
          }}
        />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,

  },
  contentView: {
    margin: 10,
    // backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 4,
    height:'auto',
    width:'auto',
    // flex:'row',
    // alignContent:'center',
    // alignItems:'center',
    // alignSelf:'center',
  },
  nameView: {
    width: '53%',
    margin: 10,
  },

  nameText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop:3
  },

  memberCount: {
    fontSize: 20,
    color: 'green',
    fontWeight: '700',
  },
});

export default Transaction