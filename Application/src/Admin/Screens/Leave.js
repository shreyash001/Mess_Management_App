import { View, Text, ScrollView, FlatList, StyleSheet, SectionList } from 'react-native'
import React, { useState, useEffect } from 'react'

import WeekTest from './WeekTest'
import { getLeaveData } from '../../Action/api'
import CheckBox from '@react-native-community/checkbox'


const Leave = () => {

  const [date, setDate] = useState(new Date())
  const [leaveData, setLeaveData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeaveData(date.toDateString());
        setLeaveData(data);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchData()
  }, [date])


  return (
    <View style={styles.container}>
      <WeekTest date={date} onChange={(newDate) => setDate(newDate)} />

      <View style={{borderTopColor:'black', borderTopWidth:0.5, borderRadius:10, alignItems:'center'}}>
        <Text style={{marginTop:10, marginLeft:10, fontSize:17, fontStyle:'italic'}}>Leave Users</Text>
      </View>

      <View style={styles.leaveUserData}>
        {
          leaveData !== undefined && (
            leaveData.map((data, index) => {
              return (
                <View key={index} style={styles.userData}>
                  <Text>{data.name}</Text>
                  <View>
                    <Text>Lunch</Text>
                    <CheckBox
                      disabled={false}
                      value={data.lunchLeave}
                      tintColors={{ true: '#F15927', false: 'black' }}
                    />
                  </View>

                  <View>
                    <Text>Dinner</Text>
                    <CheckBox
                      disabled={false}
                      value={data.dinnerLeave}
                      tintColors={{ true: '#F15927', false: 'black' }}
                    />
                  </View>
                </View>
              )
            })
          )
        }
      </View>


      {
        leaveData === undefined && (
          <View style={styles.noDataView}>
            <Text style = {{fontSize: 20}}>NO DATA</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2FFE9'
  },
  leaveUserData: {
    alignItems: 'center',
    // elevation: 4,
    marginTop: 10,
  },
  userData: {
    width: '90%',
    minHeight:80,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor:'#A6CF98',
    borderRadius:10

  },
  noDataView:{
    flex:1,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  }
})

export default Leave