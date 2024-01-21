import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const Testing = () => {
  const [userData,setUserData] = useState()

  useEffect( () => {
    getData()
  })

  const getData = async() => {
    const UD = await firestore().collection('Users Collection').get()
    console.log(UD._docs[0]._data.email)
  }
  return (
    <View>
      <Text>Testing</Text>
    </View>
  )
}

export default Testing