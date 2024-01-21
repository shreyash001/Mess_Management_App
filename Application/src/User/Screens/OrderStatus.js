import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const OrderStatus = ({ navigation }) => {

  const route = useRoute();

  useEffect(() => {
    if (route.params.status == 'success') {
      placeOrder();
    }
  }, []);

  const placeOrder = async () => {

    await firestore().collection('Users').doc(route.params.userId).update({

      orders: {
        items: route.params.cartList,
        orderTotal: route.params.total,
        paymentId: route.params.paymentId,
        orderDate: route.params.purchedDate,
        startDate: route.params.startDate,
      },
      cart: [],
      planPurched:{
        planAmount: route.params.total,
        planStartDate: route.params.purchedDate,
        planName: route.params.cartList[0].data.name,
        planDayRemaning: route.params.cartList[0].data.qty * 30
      }
    });

    await firestore()
      .collection('Orders')
      .add({
        orderBy: route.params.userId,
        paymentId: route.params.paymentId,
        userData: {
          userName: route.params.userName,
          userEmail: route.params.userEmail,
          userMobile: route.params.userMobile,
          address: route.params.address,
        },
        data: {
          items: route.params.cartList,
          orderTotal: route.params.total,
          orderDate: route.params.purchedDate,
          startDate: route.params.startDate,
        },
      }).then( () => {
        console.log('Order Placed')
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={
          route.params.status == 'success'
            ? require('../../Images/verified.gif')
            : require('../../Images/fail.gif')
        }
        style={styles.icon}
      />
      <Text style={styles.msg}>
        {route.params.status == 'success'
          ? 'Order Placed Successfully !!'
          : 'Order Failed !!'}
      </Text>
      <TouchableOpacity
        style={styles.backToHome}
        onPress={() => {
          navigation.navigate('UserHome');
        }}>
        <Text>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderStatus;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '70%',
    height: '40%',
    alignSelf: 'center',
    marginBottom: 20
  },
  msg: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: -50,
  },
  backToHome: {
    width: '50%',
    height: 50,
    borderWidth: 0.5,
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});