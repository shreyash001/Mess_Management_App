import { View, Text, ScrollView, FlatList, StyleSheet, SectionList } from 'react-native'
import React, { useState, useEffect } from 'react'

import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import WeekCalendar from './WeekCalendar';
import { format, parseISO } from 'date-fns';
import WeekTest from './WeekTest'


const Leave = () => {

  const [date, setDate] = useState(new Date())
  const [leaveData, setLeaveData] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  useEffect(() => {
    getLeaveData()
  })


  const getLeaveData = async () => {
    const data = await firestore().collection('Leave').doc(date).get()
    if(data._data.leaveUsers !== undefined){
      setLeaveData(data._data.leaveUsers)
    }
    // console.log(leaveData)
  }

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.dateBar}>
  //       <Text style={styles.dateText}>{date.toDateString()}</Text>
  //     </View>
  //     <FlatList
  //       data={leaveData}
  //       renderItem={(item) => {
  //         return (
  //           <View style={styles.contentView}>
  //             <View style={styles.itemView}>
  //               <Text style={styles.nameText}>{"Name: " + item.item.name}</Text>
  //               <Text>{"Phone No: " + item.item.phoneNo}</Text>
  //             </View>

  //             <View>
  //               <Text>Lunch</Text>
  //               <CheckBox
  //                 disabled={false}
  //                 value={item.item.lunchLeave}
  //                 tintColors={{ true: '#F15927', false: 'black' }}
  //               />
  //             </View>

  //             <View>
  //               <Text>Dinner</Text>
  //               <CheckBox
  //                 disabled={false}
  //                 value={item.item.dinnerLeave}
  //                 tintColors={{ true: '#F15927', false: 'black' }}
  //               />
  //             </View>
  //           </View>
  //         )
  //       }}
  //     />
  //   </View>
  // )

  return(
    <View>
      {/* <WeekCalendar date={date} /> */}
      {/* <Text>{date}</Text> */}
      <WeekTest date={date} onChange={ (newDate) => setDate(newDate)} />
    </View>
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

export default Leave