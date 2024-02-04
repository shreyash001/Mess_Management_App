import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
// import RenderHTML from 'react-native-render-html';
import Card from '../../Reusables/Card.js';
import Header from '../../Common/Header.js';
import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';



const Home2 = () => {

  const navigation = useNavigation()
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getData()
  })

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('USER');
      let data = JSON.parse(jsonValue);
      setUserData(data);
      // console.log('Data retrived sucessfully')
    } catch (e) {
      console.log('error reading async value');
    }
  };

  // return <RenderHTML contentWidth={useWindowDimensions} source={source} />;
  return (
    <View style={{ flex: 1,marginBottom:10 }}>

      <Header
        // goBackIcon={require('../../Images/return.png')}
        title={'DaDa Biryani'}
        // icon={require('../../Images/logout.png')}
        cart={require('../../Images/cart.png')}
      />
      <ScrollView>

        {/* <View style={styles.location}>
          <Text style={styles.locTxt}>location</Text>
        </View> */}

        <View style={styles.Up}>
          <View style={styles.uptxtContainer}>
            <Text style={styles.UpTxt}>Up To</Text>
            <Text style={styles.OffTxt}>70% OFF</Text>
            <Text style={styles.WithTxt}>with free delivery</Text>

          </View>
          <Image source={require('../../Images/chicken.png')} style={styles.chicken} />
        </View>

        <View style={styles.Eat}>
          <Text style={styles.EatTxt}>Hungry for dinner?</Text>
        </View>

        <View style={styles.Box}>
          <Card
            t1={'ORDER NOW'}
            t2={'VIEW MENU'}
            t3={'UP TO 60% OFF'}
            onPress={() => navigation.navigate('Plans')}
          />
          <Card t1={'VIEW ORDERS'} t2={'VIEW PREVIOUS ORDERS'} t3={'CHECK NOW'}
            onPress={() => navigation.navigate('ViewOrder', {
              userData: userData,
            })} />
        </View>

        <View style={styles.Box}>
          <Card
            t1={'LEAVE'}
            t2={'ASK LEAVE'}
            t3={'NOW OR NEVER'}
            onPress={() => navigation.navigate('AskLeave')}
          />
          <Card
            t1={'ATTENDENCE'}
            t2={'CHECK'}
            t3={'NOW OR NEVER'}
            // onPress={() => navigation.navigate('Plans')}
          />
        </View>


        {/* <View style={styles.Refer}>
          <Text>EASIEST WAY TO</Text>
          <Text>Refer And Earn!</Text>
        </View> */}

        <View style={styles.Foot}>
          <Text style={styles.LivTxt}>Live</Text>
          <Text style={styles.MidTxt}>it up!</Text>
          <Text style={styles.CrafTxt}>
            Crafted with 💖 by Praduman
          </Text>
        </View>
      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({
  location: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 15,
    height: 50,
    // width:'95%',
    margin: 15,
    // alignItems:'flex-end'
    justifyContent: 'center',
  },
  locTxt: {
    marginLeft: 10,
  },
  Up: {
    display: 'flex',
    flexDirection: 'row',
    // flex: 1,
    borderRadius: 20,
    minHeight: "15%",
    margin: 15,
    backgroundColor: '#ef4f5f',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    // paddingBottom:20,

    elevation: 20,
  },
  uptxtContainer: {
    // backgroundColor:'yellow',
    alignItems: 'flex-start',
    padding: 10
  },
  UpTxt: {
    fontSize: 20,
    // marginTop: 30,
    // marginLeft: 30,
    color: 'white',
    fontWeight: '700',
  },
  OffTxt: {
    fontSize: 30,
    // marginLeft: 30,
    color: 'white',
    fontWeight: '700',
  },
  WithTxt: {
    fontSize: 20,
    // marginLeft: 30,
    color: 'white',
    fontWeight: '700',
  },
  Eat: {
    height: 50,
    justifyContent: 'center',
    marginLeft: 10,
  },
  EatTxt: {
    fontSize: 30,
    fontWeight: '700',
    marginLeft: 15,
  },
  Box: {
    borderRadius: 20,
    minHeight: 180,
    margin: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    // backgroundColor:'green',
  },
  RestTxt: {
    fontSize: 13,
    marginLeft: 10,
    marginTop: 5,
  },
  DiscTxt: {
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: 'rgb(250 105 0)',
    width: 145,
    borderRadius: 10,
    fontSize: 11,
  },
  Refer: {
    height: 250,
    margin: 15,
    borderRadius: 20,
    borderColor: 'green',
    borderWidth: 2,
  },
  Foot: {
    height: 300,
    // flex: 1,
    // borderWidth:2,
    // borderColor:'red',
    margin: 10,
    // bottom:20,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    paddingBottom: 20,
  },
  LivTxt: {
    fontSize: 100,
    fontWeight: '900',
    marginLeft: 30,
    color: 'rgb(92 91 90)',
    // backgroundColor:'red'
  },
  MidTxt: {
    fontSize: 100,
    fontWeight: '900',
    marginLeft: 30,
    color: 'rgb(92 91 90)',
  },
  CrafTxt: {
    fontSize: 15,
    marginLeft: 30,
  },
  chicken: {
    height: "100%",
    width: '35%',
    objectFit: 'fill'
    // backgroundColor: 'yellow'
  },
  orderView: {
    // backgroundColor: 'red'
  }
});

export default Home2;
