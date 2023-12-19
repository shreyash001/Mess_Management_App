import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect } from 'react';


export const updateUserData = async (userData) => {
    const date = new Date()

    // handle Days remaning
    const startDate = userData.planPurched.planStartDate
    let newUTCStartDate = new Date(startDate)
    newUTCStartDate.setHours(0, 0, 0, 0)
    if (date > newUTCStartDate) {
        let diff = date - newUTCStartDate
        diff = diff / (1000 * 60 * 60 * 24)
        let DR = parseInt(userData.planPurched.planDayRemaning) - parseInt(diff)
        // console.log(parseInt(parseInt(userData.planPurched.planDayRemaning)))

        await firestore().collection('Users').doc(userData._id).update({
            'planPurched.planDayRemaning':DR,
            // 'orders.startDate':startDate
        })
    }
    // console.log(date)
}

export const getOrderDetails = async () => {

    let tempData: { id: string; data: FirebaseFirestoreTypes.DocumentData; }[] = [];


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