import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Common/Header';

const Notification = () => {



  return (
    <View>
      <Header title={'Notification'} />
      <View style={styles.container}>
        <Text style={styles.text}>Notification</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // justifyContent:'center',
    // alignContent:'center',
    alignItems: 'center',
    top: 300

  },
  text: {
    fontSize: 20
  }
})

export default Notification