import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react'

import Home from './Tabs/Home';
import UserCart from './Tabs/UserCart';
import Plans from './Tabs/Plans';


const UserHome = ({navigation}) => {

  const [selectedTab, setSelectedTab] = useState(0)


  return (
    <View style={styles.container}>
      {
        selectedTab == 1 ? (<Plans />)  :
          selectedTab == 0 ?(<Home navigation={navigation}/>) :
                (<UserCart />)
      }
      <View style={styles.bottomView}>

        <TouchableOpacity style={styles.bottomTab} 
          onPress={() => { setSelectedTab(1) }}>
          <Image source={require('../Images/list.png')} 
          style={[styles.bottomTabImg, { tintColor: selectedTab == 1 ? 'red' : 'black' }]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab} onPress={() => { setSelectedTab(0) }}>
          <Image source={require('../Images/home.png')} style={[styles.bottomTabImg, { width: 30, height: 30 }, { tintColor: selectedTab == 0 ? 'red' : 'black' }]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab} onPress={() => { setSelectedTab(2) }}>
          <Image source={require('../Images/cart.png')} style={[styles.bottomTabImg, { tintColor: selectedTab == 2 ? 'red' : 'black' }]} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'
  },
  bottomTab: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  bottomTabImg: {
    width: 24,
    height: 24,

  }
})

export default UserHome 