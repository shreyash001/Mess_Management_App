import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUserDAta, userAttendence } from '../../Action/api'
import WeekTest from './WeekTest'

const Attendence = () => {
    const [attendenceData, setAttendenceData] = useState()
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        getData()
    }, [date])

    const getData = async () => {
        try {
            let t1 = await userAttendence(date.toDateString())
            setAttendenceData(t1)
        } catch (error) {
            console.error('Error in Attendence fetching data', error)
        }
    }

    const handleDeliveredBtn = (userID) => {
        console.log(userID)
        console.log(date)
    }

    // console.log(attendenceData)


    return (
        <View>
            <WeekTest date={date} onChange={(newDate) => setDate(newDate)} />

            <View style={[{ flexDirection: 'row', borderTopWidth: 1, borderRadius: 10 }, styles.BtnContol]}>
                <TouchableOpacity style={styles.mrkDeliver}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center'
                    }}>All Lunch Delivered</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mrkDeliver}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center'
                    }}>All Dinner Delivered</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={attendenceData}
                renderItem={(user, index) => (
                    <View style={styles.totalView} key={index}>
                        <View style={styles.userData}>
                            <Text style={styles.nameTxt}>Contact No. : {user.item.id}</Text>
                            <Text style={styles.nameTxt}>Name : {user.item.name}</Text>
                            <Text style={styles.nameTxt}>Lunch : {user.item.lunch ? 'Yes' : 'No'}</Text>
                            <Text style={styles.nameTxt}>Dinner : {user.item.dinner ? 'Yes' : 'No'}</Text>
                        </View>


                        <View style={styles.BtnContol}>
                            <TouchableOpacity onPress={() => handleDeliveredBtn(user.item.id)} style={styles.mrkDeliver}>
                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}>Lunch Delivered</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleDeliveredBtn(user.item.id)} style={styles.mrkDeliver}>
                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}>Dinner Delivered</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    totalView: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        height: 'auto',
        minHeight: 100,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    userData: {
        width: 'auto',
        alignSelf: 'center'

    },
    nameTxt: {
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    mrkDeliver: {
        backgroundColor: 'green',
        width: 'auto',
        marginTop: 7,
        borderRadius: 10,
        padding: 7,
        alignItems: 'center',
    },
    BtnContol: {
        justifyContent: 'space-evenly',
        width: 'auto'
    }
})

export default Attendence