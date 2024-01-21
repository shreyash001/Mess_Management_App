import { View, Text } from 'react-native'
import React,{useState} from 'react'

const AskLeave = () => {
  const [date,setDate] = useState(new Date)
  return (
    <View>
      <Text>AskLeave works</Text>
      <Text>{date.toDateString()}</Text>

    </View>
  )
}

export default AskLeave