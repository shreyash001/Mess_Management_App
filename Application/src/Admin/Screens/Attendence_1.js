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
import { useIsFocused } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';


const Attendence = () => {
  const [date, setDate] = useState(new Date)
  const [userData, setUserData] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const isFocused = useIsFocused()
  useEffect(() => {
    getUsers()
  }, [isFocused])

  const getUsers = async () => {
    await firestore().collection('Users').where('isUser', '==', true).get().then(
      querySnapshot => {
        let tempData: any = []
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setUserData(tempData);
      }
    )

    // console.log(userData)
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateBar}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </View>
      <View>
        <FlatList
          data={userData}
          renderItem={(item) => {
            return (
              item.item.data.isUser && (
                item.item.data.orders.items !== undefined
              ) && (item.item.data.orders.orderDate !== undefined) && (
                <View style={styles.contentView}>
                  <View style={styles.itemView}>
                    <Text style={styles.nameText}>{"Name: " + item.item.data.name}</Text>
                    <Text style={styles.memberCount}>Start Date: {item.item.data.orders.startDate}</Text>

                    <Text>{"Phone No: " + item.item.data.phoneNo}</Text>
                  </View>

                  <View>
                    <Text>Lunch</Text>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      tintColors={{ true: '#F15927', false: 'black' }}
                      onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                  </View>

                  <View>
                    <Text>Dinner</Text>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      tintColors={{ true: '#F15927', false: 'black' }}
                      onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                  </View>

                </View>
              )

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
  },
  dateBar: {
    backgroundColor: 'lightgrey',
    height: 40,
    alignItems: 'center'
  },
  dateText: {
    fontSize: 20,
    padding: 7
  },
  contentView: {
    margin: 10,
    backgroundColor: '#CAF296',
    borderRadius: 30,
    padding: 20,
    height: 120,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
    // elevation: 4
  },
  itemView: {
    width: 200
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
})

export default Attendence