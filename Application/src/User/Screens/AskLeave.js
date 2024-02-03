import { View, Text } from 'react-native'
import React,{useState} from 'react'
import AskLeaveComponent from '../../Components/AskLeaveComponent.js';

const AskLeave = () => {
  const [date,setDate] = useState(new Date)
  return (
    <View>
      <AskLeaveComponent/>

    </View>
  )
}

export default AskLeave