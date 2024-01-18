import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    PermissionsAndroid,
    Image,
    ScrollView,
    FlatList,
    Button
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ActivePlanUsers = () => {

    const [userData, setUserData] = useState([])
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect(() => {
        getUsers()
    }, [isFocused])

    const getUsers = async () => {
        await firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    });
                });
                setUserData(tempData);
            })
    }


    return (
        <View style={styles.container}>

            <FlatList
                data={userData}
                renderItem={(item) => {
                    return (
                        item.item.data.isUser && item.item.data.orders.items !== undefined && item.item.data.orders.orderDate !== undefined && item.item.data.planPurched.planDayRemaning > 0 && (
                            <View style={styles.contentView}>
                                <Text style={styles.nameText}>{"Name: " + item.item.data.name}</Text>
                                <Text>{"Phone No: " + item.item.data.phoneNo}</Text>
                                <Text style={styles.memberCount}>Start Date: {item.item.data.orders.startDate}</Text>
                                <Text>Ordered Date: {item.item.data.orders.orderDate}</Text>

                                <View style={styles.btnControl}>
                                    <TouchableOpacity style={[styles.btnCall, { backgroundColor: 'black' }]} onPress={() => {
                                        navigation.navigate('UserDetail', { _id: item.item.data.phoneNo })
                                    }}><Text style={styles.txtView}>Manage</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnCall} >
                                        <Text style={styles.txtView}>Call</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        )

                    )
                }}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFE9'
    },
    btnCall: {
        width: "auto",
        height: 'auto',
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginRight: 10
    },
    btnControl: {
        flexDirection: 'row',

    },
    totalUserView: {
        height: 'auto',
        alignItems: 'center',
        backgroundColor: '#A6CF98',
    },
    txtView: {
        fontSize: 15,
        color: 'white',
        padding: 10,
    },
    contentView: {
        margin: 10,
        // backgroundColor: 'white',
        backgroundColor: '#A6CF98',
        borderRadius: 30,
        padding: 20,
        elevation: 4
    },
    itemView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 4,
        marginTop: 10,
        borderRadius: 10,
        height: 100,
        marginBottom: 10,
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 5,
    },
    nameView: {
        width: '53%',
        margin: 10,
    },

    nameText: {
        fontSize: 15,
        fontWeight: '700',
        color: 'black'
    },

    memberCount: {
        fontSize: 15,
        color: 'green',
        fontWeight: '700',
    },
});

export default ActivePlanUsers