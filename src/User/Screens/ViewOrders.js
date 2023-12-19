import { View, Text, ScrollView, StyleSheet, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import Header from '../../Common/Header';


const ViewOrders = () => {

    const route = useRoute()
    const userData = route.params.userData
    const userId = route.params.userData._id
    const [orders, setOrders] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        getOrders()
    }, [isFocused])

    const getOrders = async () => {
        const orderData = await firestore().collection('Orders').where('orderBy', '==', userId).get()
        let temp = []
        const temp_orderData = orderData.docs
        temp_orderData.map((item, index) => {
            temp.push({
                productName: item._data.data.items[0].data.name,
                productPrice: parseInt(item._data.data.items[0].data.price),
                productQty: parseInt(item._data.data.items[0].data.qty),
                buyDate: item._data.data.orderDate,
                startDate: item._data.data.startDate,
                address: item._data.userData.address,
                mobileNo: item._data.userData.userMobile,
            })
        })
        setOrders(temp)
    }
    return (
        <ScrollView style={styles.container}>
            <View>
                <Header
                    title={'Orders'}
                    goBackIcon={require('../../Images/return.png')}
                    icon={require('../../Images/logout.png')}
                />

                <View>
                    {
                        orders.length < 1 ? (
                            <View style={{ flex: 1,
                                alignItems: 'center',
                                alignSelf:'center',
                                height:700,
                                // backgroundColor:'red',
                                bottom:300,
                                top:300}}>
                                <Text style={{fontSize: 20}}>No Order Placed</Text>
                            </View>
                        ) : (
                            orders.map((item, index) => (
                                <View key={index} style={styles.contentView}>

                                    <Text style={styles.txtColor}>{"Item Name: " + item.productName}</Text>
                                    <Text style={styles.txtColor}>{"Price: " + item.productPrice}</Text>
                                    <Text style={styles.txtColor}>{"Quantity: " + item.productQty}</Text>
                                    <Text style={styles.txtColor}>{"Buy Date: " + item.buyDate}</Text>

                                    <Text style={styles.txtColor}>{"Start Date: " + item.startDate}</Text>
                                    <Text style={styles.txtColor}>{"Address: " + item.address}</Text>
                                    <Text style={styles.txtColor}>{"Contact No: " + item.mobileNo}</Text>
                                </View>
                            ))
                        )

                    }

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        elevation: 4


    },
    txtColor: {
        color: 'black',
        fontSize: 17,
    }
})
export default ViewOrders