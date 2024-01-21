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

  const [orderData, setOrderData] = useState()
  const isFocused = useIsFocused()

  useEffect(() => {
    getOrderDetails()
  }, [isFocused])

  const getOrderDetails = async () => {
    await firestore().collection('Orders').get().then(querySnapshot => {
      let tempData = [];
      // querySnapshot = querySnapshot.order_by_child('orderDate')
      querySnapshot.forEach(documentSnapshot => {
        tempData.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data(),
        });
      });
      setOrderData(tempData);
    });
    // console.log(orderData)
  }

  return (
    <ScrollView>
      <Header 
      title={'Transactions'}
      />
      <View style={styles.container}>
        <FlatList
          data={orderData}
          renderItem={(item, index) => {
            return (
              <View>
                <View key={index} style={styles.contentView}>
                  <Text style={styles.nameText}>{item.item.data.userData.userName}</Text>
                  <Text >{item.item.data.userData.userMobile}</Text>
                  <Text >{item.item.data.data.orderDate}</Text>
                  <Text style={styles.memberCount}>{item.item.data.data.orderTotal}</Text>
                  <Text >{item.item.data.data.paymentId}</Text>

                </View>
                {/* {
                  console.log(item.item.data.data)
                } */}
              </View>
            )
          }}

        />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,

  },
  contentView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    elevation: 4
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
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
});

export default Transaction