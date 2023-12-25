import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

export const getAllUserDAta = async () => {
    let tempData = []
    await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().isUser === true) {
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    });
                    // console.log(documentSnapshot.data())
                }
            });
        })
    // console.log(tempData)
    return tempData;
}

export const userAttendence = async (date) => {

    let selectedDate = new Date(date);
    let tempUserData = [];

    let a1 = await firestore().collection('Attendence').doc(date).get().then(async (data) => {
        if (!data.exists) {
            // If attendance document doesn't exist, create one
            await firestore().collection('Attendence').doc(date).set({
                AtDate: date,
                delivered: false,
                attendence: []  // Initialize the attendance array if needed
            });
        } else {
            // Attendance document exists, fetch user data and compare
            const attendanceData = data.data().attendence;
            const usersSnapshot = await firestore().collection('Users').where('isUser', '==', true).get();

            if (attendanceData && Array.isArray(attendanceData)) {
                tempUserData = attendanceData;

                // usersSnapshot.forEach(userDocument => {
                //     const userId = userDocument.id;

                //     // Check if any object in tempUserData has an id property equal to userId
                //     const userInAttendance = tempUserData.some(item => item.id === userId);

                //     if (userInAttendance) {
                //         // User found in attendance data for the selected date
                //         console.log(`User ${userId} attended on ${date}`);
                //     }
                // });
            } else if (attendanceData == undefined) {
                // Attendance data is not an array or is undefined:
                usersSnapshot.forEach(userDocument => {
                    const userStartDate = new Date(userDocument.data().planPurched.planStartDate);
                    if (selectedDate >= userStartDate && userDocument.data().planPurched.planDayRemaning >= 1) {
                        tempUserData.push({
                            id: userDocument.id,
                            name: userDocument.data().name,
                            lunch: false,
                            dinner: false
                        });
                    }
                })

                await firestore().collection('Attendence').doc(date).update({
                    attendence: tempUserData
                })
            } else {
                console.warn('Attendence Data is not Correctly Read', attendanceData)
            }
        }
    }).catch(error => {
        console.error('Error:', error);
    });

    return tempUserData
}

export const getDate = (dateInput) => {
    const date = new Date(dateInput)
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const ISTDateString = date.toLocaleDateString('en-IN', options);
    return ISTDateString
}

export const getLeaveData = async (dateString) => {
    try {
        const data = await firestore().collection('Leave').doc(dateString).get()
        if (data?.data()?.leaveUsers != undefined) {
            return data.data().leaveUsers
        }
    } catch (error) {
        console.log('error in getting leave data')
    }

}

export const getUserLeaveData = async (userId) => {
    const date = new Date();
    let userleaveData = [];

    try {
        const usersSnapshot = await firestore().collection('Leave').doc(date.toDateString()).get();
        if (usersSnapshot.exists) {
            const leaveData = usersSnapshot.data().leaveUsers;

            leaveData.forEach(userDocument => {
                if (userDocument._id === userId) {
                    userleaveData = userDocument;
                }
            });
            return userleaveData
        }else{
            return false
        }

    } catch (error) {
        console.error('Error in getUserLeaveData:', error);
    }

    
};


//getting user startdate and reducing it as the day changes
export const updateUserData = async (userData) => {

    // const date = getDate()

    // // handle Days remaning
    // const startDate = userData?.planPurched?.planStartDate
    // let newUTCStartDate = new Date(startDate)
    // newUTCStartDate.setHours(0, 0, 0, 0)
    // console.log(date)

    // if (date > newUTCStartDate) {
    //     let diff = date - newUTCStartDate
    //     diff = diff / (1000 * 60 * 60 * 24)
    //     let DR = parseInt(userData.planPurched.planDayRemaning) - parseInt(diff)
    //     // console.log(parseInt(parseInt(userData.planPurched.planDayRemaning)))

    //     await firestore().collection('Users').doc(userData._id).update({
    //         'planPurched.planDayRemaning': DR,
    //         // 'orders.startDate':startDate
    //     })

    //     console.log(DR)
    // }
}

export const getOrderDetails = async () => {

    let tempData = [];


    let orderData = {
        veg: 0,
        nonVeg: 0,
        combo: 0
    };

    await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                tempData.push({
                    id: documentSnapshot.id,
                    data: documentSnapshot.data(),
                });
            });
        })

    tempData.map((user, id) => {
        if (user.data.isUser == true) {
            if (user.data.planPurched.planDayRemaning !== 0) {
                if (user.data.planPurched.planName == "Veg Plan") {
                    orderData.veg += 1;
                }
                else if (user.data.planPurched.planName == "Non-Veg Plan") {
                    orderData.nonVeg += 1;
                }
                else if (user.data.planPurched.planName == "Combo Plan ( Veg + Non-Veg )") {
                    orderData.combo += 1;
                }
            }
        }
    })

    return orderData;
}