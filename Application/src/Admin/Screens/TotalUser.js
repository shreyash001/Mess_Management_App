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
  Button
} from 'react-native';
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore';
import Header from '../../Common/Header';
import { useIsFocused } from '@react-navigation/native';

const TotalUser = () => {

  const [userData, setUserData] = useState([])
  const [deleteDocId, setDeleteDocId] = useState(0)
  const isFocused = useIsFocused()

  useEffect(() => {
    getUsers()
  }, [isFocused])


  const getUsers = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setUserData(tempData);
      })
  }

  const deleteUser = async(docId) => {
    await firestore().collection('Users').doc(docId).delete().then(() => {
      console.log('User Deleted')
      alert('User Deleted')
    })
  }


  return (
    <View style={styles.container}>
      <Header title={'Customers'}
        icon={require('../../Images/logout.png')}
        goBackIcon={require('../../Images/return.png')}
      />

      <View style={styles.totalUserView}>
        <Text style={{ fontSize: 17, margin: 10 }}>Total Users Registered = {userData.length}</Text>
      </View>

      <FlatList
        data={userData}
        renderItem={(item, index) => {
          return (
            item.item.data.isUser && (
              <View style={styles.contentView} key={index}>

                <Text style={styles.nameText}>{"Name: " + item.item.data.name}</Text>
                <Text>{"Phone No: " + item.item.data.phoneNo}</Text>
                <TouchableOpacity style={styles.btnCall} ><Text style={styles.txtView}>Call</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btnCall, { backgroundColor: 'red' }]}
                  onPress={() => {
                    console.log(item.item.data.phoneNo)
                    // setDeleteDocId(item.item.data.phoneNo)
                    deleteUser(item.item.data.phoneNo)
                    getUsers()
                  }}

                ><Text style={styles.txtView}>Delete</Text></TouchableOpacity>

              </View>
            )

          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFE9'
  },
  btnCall: {
    width: 'auto',
    maxWidth: 100,
    height: 'auto',
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  totalUserView: {
    height: 'auto',
    alignItems: 'center',
    backgroundColor: '#A6CF98',
  },
  txtView: {
    fontSize: 15,
    color: 'white',
    padding: 10,
  },
  contentView: {
    margin: 10,
    // backgroundColor: 'white',
    backgroundColor: '#A6CF98',
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
    fontSize: 15,
    fontWeight: '700',
    color: 'black'
  },

  memberCount: {
    fontSize: 15,
    color: 'green',
    fontWeight: '700',
  },
});

export default TotalUser