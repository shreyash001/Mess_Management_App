import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Header from '../../Common/Header';

let userId = '';

const UserCart = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getCartItems();
  }, [isFocused]);


  const getCartItems = async () => {
    let jsonValue = await AsyncStorage.getItem('USER');
    let data = JSON.parse(jsonValue)
    userId = data._id
    // console.log(userId)
    const user = await firestore().collection('Users').doc(userId).get();
    setCartList(user._data.cart);
  };

  const addItem = async (item) => {
    const user = await firestore().collection('Users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;

    tempDart.map(itm => {
      // console.log(itm.id)
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty + 1;
      }
    });

    await firestore().collection('Users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };


  const removeItem = async (item) => {
    const user = await firestore().collection('Users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;

    console.log(user._data)
    tempDart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty - 1;
      }
    });

    await firestore().collection('Users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };


  const deleteItem = async (index) => {
    const user = await firestore().collection('Users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.splice(index, 1);

    await firestore().collection('Users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };


  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + item.data.qty * item.data.price;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Cart'}
      />
      <View style={styles.topAlert}>
        <Text style={{ color: 'white' }}>Place single order only with total 1 item in cart</Text>
      </View>
      <FlatList
        data={cartList}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemView}>

              <Image
                source={{ uri: item.data.imageUrl }}
                style={styles.itemImage}
              />

              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {'Rs ' + item.data.price}
                  </Text>
                </View>
              </View>

              <View style={styles.addRemoveView}>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 15,
                    },
                  ]}
                  onPress={() => {
                    if (item.data.qty > 1) {
                      removeItem(item);
                    } else {
                      deleteItem(index);
                    }
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
                  {item.data.qty}
                </Text>
                {/* <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 15,
                    },
                  ]}
                  onPress={() => {
                    addItem(item);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    +
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>

          )
        }}
      />



      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <Text style={{ color: '#000', fontWeight: '600' }}>
            {'Items(' + cartList.length + ')\nTotal: Rs ' + getTotal()}
          </Text>
          <TouchableOpacity
            style={[
              styles.addToCartBtn,
              {
                width: 100,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Text style={{ color: '#fff' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

      {
        cartList.length < 1 && (
          <View style={styles.checkoutView}>
            <Text>No item in cart</Text>
          </View>
        )
      }

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFE9',
    marginBottom:120
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
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly'
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '30%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black'
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  checkoutView: {
    width: '100%',
    height: 60,
    // backgroundColor: '#fff',
    backgroundColor: '#A6CF98',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: -60
  },
  topAlert: {
    margin: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10
  }
});


export default UserCart;
