// import { View, Text } from 'react-native'
// import React, {useEffect, useState} from 'react'
// import { addDays, format, getDate, startOfWeek } from 'date-fns'

// // interface weekDays {
// //     formatted: String,
// //     date: Date,
// //     day: number
// // }

// interface Props {
//     date:Date
// }

// const WeekCalendar: React.FC<Props> = ({ date }) => {

//     const [week,setWeek] = useState([])

//     // useEffect( () => {
//     //     const weekDays = getWeekDays(date)
//     //     console.log(weekDays)
//     // },[date]);

//     return (
//         <View>\\
//             <Text>{date.toDateString()}</Text>
//         </View>
//     )
// }

// export const getWeekDays = (date:Date) => {
//     const start = startOfWeek(date, {weekStartsOn: 1});
//     const final = []

//     for(let i = 0;i<7; i++){
//         const date = addDays(start,i)
//         final.push({
//             formatted: format(date,'EEE'),
//             date,
//             day: getDate(date)
//         })
//     }
//     \
//     return final
// }

// export default WeekCalendar