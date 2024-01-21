import { View, TextInput, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserDetail = () => {

  const route = useRoute();
  const isFocused = useIsFocused()

  const id = route.params._id
  const [phoneNo, setPhoneNo] = useState()
  const [name, setName] = useState()
  // const [startDate, setStartDate] = useState([])
  const [startDate, setStartDate] = useState()
  // const [daysRemaning, setDaysRemaning] = useState()

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState();

  // const d = useState(new Date(startDate[0], startDate[3], startDate[1]))
  const d = useState(new Date(2023, 2, 2))

  useEffect(() => {
    User()
  }, [isFocused])

  const User = async () => {
    const user = await firestore()
      .collection('Users')
      .where('_id', "==", id)
      .get()

    d1 = user.docs[0]._data

    setPhoneNo(d1.phoneNo)
    setName(d1.name)

    let sDate: String = d1.orders.startDate
    let newDate = new Date(Date.parse(sDate))
    // newDate.setDate(newDate.getDate() + 1)

    setStartDate(newDate)
    // console.log(newDate)

  }

  const handleDate = (modeToShow) => {
    setShow(true)
    setMode(modeToShow)
  }

  const handleUpdate = async () => {
    await firestore().collection('Users').doc(id).update({
      'orders.startDate': startDate.toDateString()
    }).then(() => {
      alert('Start Date Updated')
    }).catch(() => {
      console.log('error in updating date')
    })
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Name</Text>
      <TextInput style={styles.inputStyle}
        placeholder='Enter Name'
        placeholderTextColor='black'
        value={name}
        onChangeText={txt => setName(txt)} />

      <Text style={styles.title}>Phone No.</Text>

      <TextInput style={styles.inputStyle}
        placeholder='Enter Mobile No.'
        keyboardType='number-pad'
        placeholderTextColor='black'
        value={phoneNo}
        onChangeText={txt => setPhoneNo(txt)} />

      <Text style={styles.title}>Edit Start Date</Text>


      <View style={styles.totalView}>
        <Text style={styles.nameText}>Change Start date</Text>
        <Button title='Change Date' onPress={() => handleDate('date')} />
        {
          show && (
            <DateTimePicker
              value={startDate}
              mode={mode}
              is24Hour={false}
              onChange={(e, selectedDate) => {
                // console.log(selectedDate?.toDateString())
                setStartDate(selectedDate)
                setShow(false)
              }}
            />
          )
        }
      </View>

      <Text
        style={{
          margin: 15,
          width: '100%',
          fontSize: 16,
          color: '#000',
          fontWeight: '600',
        }}
      >
        {startDate?.toDateString()}

      </Text>

      <View style={styles.totalView}>

        <Text style={styles.nameText}>Change Plan</Text>
        
      </View>


      <TouchableOpacity style={styles.loginBt} onPress={() => {
        handleUpdate()
      }}>
        <Text style={{ fontWeight: '500', fontSize: 18, color: 'white' }}>Update</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
    marginLeft: 20,
    // alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 0.80,
    borderRadius: 10,
    width: '90%',
    color: 'black',
  },
  loginBt: {
    backgroundColor: 'green',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    height: 50,
    borderTopWidth: 0.3,
    paddingRight: 20,
    marginTop: 20,
    alignItems: 'center',
    borderTopColor: '#8e8e8e',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black'

  },


})

export default UserDetail