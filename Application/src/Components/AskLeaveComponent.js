import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';


const AskLeaveComponent = () => {

  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <View style={[styles.leaveView, { backgroundColor: '#A6CF98' }]}>
      <Text style={{ fontWeight: 800, fontSize: 18, marginTop: 10 }}>
        Ask Leave {date.toLocaleDateString()}
      </Text>

      <View style={styles.orderView}>
        <View>
          <Text>Lunch</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox1}
            tintColors={{ true: '#F15927', false: 'black' }}
            onValueChange={newValue => setToggleCheckBox1(newValue)}
          />
        </View>

        <View>
          <Text>Dinner</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox2}
            tintColors={{ true: '#F15927', false: 'black' }}
            onValueChange={newValue => setToggleCheckBox2(newValue)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleLeaveBtn();
          }}
          style={styles.viewBtn}>
          <Text
            style={{
              color: 'white',
              padding: 5,
              alignSelf: 'center',
              fontWeight: 700,
              fontSize: 15,
            }}>
            {toggleCheckBox1 || toggleCheckBox2 ? 'Update' : 'Request'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  leaveView: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    marginBottom: 10,
    justifyContent: 'space-evenly',
  },
  orderView: {
    width: '90%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewBtn: {
    backgroundColor: 'green',
    margin: 10,
    padding: 10,
    width: 'auto',
    minWidth: 100,
    borderRadius: 50,
  },
})

export default AskLeaveComponent