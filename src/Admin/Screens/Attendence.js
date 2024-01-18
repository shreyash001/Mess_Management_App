import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUserDAta, getTotalAttendence, updateUserData, userAttendence } from '../../Action/api'
import WeekTest from './WeekTest'
import firestore from '@react-native-firebase/firestore';
import { addDays } from 'date-fns';

const Attendence = () => {
    const [attendenceData, setAttendenceData] = useState()
    const [date, setDate] = useState(new Date())
    const currentDate = new Date()

    useEffect(() => {
        getData()
    }, [date])

    const getData = async () => {
        try {
            let t1 = await userAttendence(date.toDateString())
            // console.log(t1)
            setAttendenceData(t1)
        } catch (error) {
            console.error('Error in Attendence fetching data', error)
        }
    }

    const handleDinnerBtn = async (userID) => {
        const userIndex = attendenceData.findIndex(user => user.id === userID)
        attendenceData[userIndex].dinner = true

        await firestore().collection('Attendence').doc(date.toDateString()).update({
            attendence: attendenceData
        }).then(async () => await updateUserData(userID))
        getData();
    }

    const handleLunchBtn = async (userID) => {
        const userIndex = attendenceData.findIndex(user => user.id === userID)
        attendenceData[userIndex].lunch = true
        await firestore().collection('Attendence').doc(date.toDateString()).update({
            attendence: attendenceData
        }).then(async () => await updateUserData(userID))


        getData();
    }

    const handleExcelOutput = () => {
        getTotalAttendence()
    }

    const handlePrevWeek = () => {
        setDate((prevDate) => {
            return addDays(prevDate, -7);
        });
    };


    const handleNextWeek = () => {
        setDate((prevDate) => {
            return addDays(prevDate, 7);
        });
    }


    return (
        <View>
            <WeekTest
                date={date}
                onChange={(newDate) => {
                    const parsedDate = new Date(newDate);

                    if (!isNaN(parsedDate.getTime()) && parsedDate < currentDate) {
                        console.log('Parsed Date:', parsedDate);
                        setDate(parsedDate);
                    } else {
                        console.error('Invalid Parsed Date:', parsedDate);
                    }
                    
                }}
                onPrevWeek={handlePrevWeek}
                onNextWeek={handleNextWeek}
            />


            <View style={[{ flexDirection: 'row', borderTopWidth: 1, borderRadius: 10 }, styles.BtnContol]}>
                {/* <TouchableOpacity style={styles.deliverd} disabled={true} >
                    <Text style={{
                        color: 'white',
                        textAlign: 'center'
                    }}>All Lunch Delivered</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deliverd} disabled={true} >
                    <Text style={{
                        color: 'white',
                        textAlign: 'center'
                    }}>All Dinner Delivered</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.deliverd} onPress={() => handleExcelOutput()}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        width:60
                    }}>Excel</Text>
                </TouchableOpacity>


            </View>

            <FlatList
                data={attendenceData}
                renderItem={(user, index) => (
                    <View style={styles.totalView} key={index}>
                        <View style={styles.userData}>
                            <Text style={styles.nameTxt}>Contact No. : {user.item.id}</Text>
                            <Text style={styles.nameTxt}>Name : {user.item.name}</Text>
                            <Text style={styles.nameTxt}>Lunch : {
                                user.item.lunch === 'Leave' ? 'Leave' : user.item.lunch ? 'Yes' : 'No'
                            }</Text>
                            <Text style={styles.nameTxt}>Dinner : {
                                user.item.dinner === 'Leave' ? 'Leave' : user.item.dinner ? 'Yes' : 'No'
                            }</Text>
                        </View>


                        <View style={styles.BtnContol}>
                            {user.item.lunch === 'Leave' ? (
                                <TouchableOpacity style={styles.mrkDeliver} disabled={true}>
                                    <Text style={styles.leave}>Leave</Text>
                                </TouchableOpacity>
                            ) : user.item.lunch ? (
                                <TouchableOpacity onPress={() => handleLunchBtn(user.item.id)} style={styles.mrkDeliver} disabled={true}>
                                    <Text style={styles.deliverd}>Delivered</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => handleLunchBtn(user.item.id)} style={styles.mrkDeliver}>
                                    <Text style={styles.notDeliverd}>Lunch Delivered</Text>
                                </TouchableOpacity>
                            )}

                            {user.item.dinner === 'Leave' ? (
                                <TouchableOpacity style={styles.mrkDeliver} disabled={true}>
                                    <Text style={styles.leave}>Leave</Text>
                                </TouchableOpacity>
                            ) : user.item.dinner ? (
                                <TouchableOpacity onPress={() => handleDinnerBtn(user.item.id)} style={styles.mrkDeliver} disabled={true}>
                                    <Text style={styles.deliverd}>Delivered</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => handleDinnerBtn(user.item.id)} style={styles.mrkDeliver}>
                                    <Text style={styles.notDeliverd}>Dinner Delivered</Text>
                                </TouchableOpacity>
                            )}

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
    deliverd: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'green',
        width: 'auto',
        marginTop: 7,
        borderRadius: 10,
        padding: 7,
        alignItems: 'center',
    },
    notDeliverd: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 10,
    },
    leave: {
        color: '#FFA33C',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#FFFB73',
        padding: 5,
        borderRadius: 10,
    },
    mrkDeliver: {
        width: 'auto',
    },
    BtnContol: {
        justifyContent: 'space-evenly',
        width: 'auto'
    }
})

export default Attendence