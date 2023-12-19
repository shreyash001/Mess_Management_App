import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';


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
        if (data?._data?.leaveUsers != undefined) {
            return data._data.leaveUsers
        }
    } catch (error) {
        console.log('error in getting leave data')
    }

}

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