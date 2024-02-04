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
} from 'react-native';
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';


import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Common/Header';

const Plans = () => {

  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState({})
  const [cartCount, setCartCount] = useState(0);

  let userId = ''

  const isFocused = useIsFocused();
  const navigation = useNavigation()

  useEffect(() => {
    getItems()
    getUserDeatils()
    // updateCart()
  }, [isFocused])



  const getItems = async () => {
    await firestore()
      .collection('Plans')
      .get()
      .then(querySnapshot => {
        let tempData = [];

        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };

  const getUserDeatils = async () => {
    const jsonValue = await AsyncStorage.getItem('USER')
    const data = JSON.parse(jsonValue)

    setUserData(data)
  }

  const onAddToCart = async (item, index) => {
    userId = userData._id
    
    const user = await firestore().collection('Users').doc(userId).get();
    // console.log(user._data.cart)

    let tempDart = [];
    tempDart = user._data.cart;

    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map(itm => {
        if (itm.id == item.id) {
          existing = true;
          itm.data.qty = itm.data.qty + 1;
          console.log("Item Updated to cart");

        }
      });
      if (existing == false) {
        tempDart.push(item);
        console.log("Item Added to cart");

      }
    } else {
      tempDart.push(item);
    }

    await firestore().collection('Users').doc(userId).update({
      cart: tempDart,
    });

    updateCart();
  }

  const updateCart = async () => {
    const user = await firestore().collection('Users').doc(userId).get();
    setCartCount(user._data.cart.length);
  }


  return (
    <View style={styles.container}>

      <Header
        goBackIcon={require('../../Images/return.png')}
        title={'Plans'}
        icon={require('../../Images/logout.png')}
        count={cartCount}
      />
      <FlatList
        data={items}
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
                <TouchableOpacity
                  style={styles.addToCartBtn}
                  onPress={() => {
                    onAddToCart(item, index);
                    alert('Item added to cart')

                  }}>
                  <Text style={{ color: '#fff' }}>Add To cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFE9',
    // marginBottom:60

  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor:'#A6CF98',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    marginBottom: 10,
    justifyContent:'space-evenly',

  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
    alignSelf: 'center',
    objectFit:'fill'
  },
  nameView: {
    width: '53%',
    margin: 10,
    alignSelf:'center',
    justifyContent:'space-evenly'
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:5
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    padding:5
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
  icon: {
    width: 24,
    height: 24,
  },
  addToCartBtn: {
    backgroundColor: 'green',
    alignItems:'center',
    padding: 10,
    borderRadius: 10,
  },
});

export default Plans