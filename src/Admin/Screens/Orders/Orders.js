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
} from 'react-native';
import React, { useEffect, useState } from 'react'
import * as api from '../../../Action/api'
import { useIsFocused } from '@react-navigation/native';
import { TextView } from '../../../Reusables/TextView';

const Orders = () => {

    const [date, setDate] = useState(new Date())
    const [orderData, setOrderData] = useState({})
    const isFocused = useIsFocused()

    const [total, setTotal] = useState(0)

    useEffect( () => {
        fetchData()
    },[isFocused])

    async function fetchData() {
        const responce = await api.getOrderDetails()
        setOrderData(responce)

        let z1 = responce.combo + responce.veg + responce.nonVeg
        setTotal(z1)
        // console.log(responce)
    }
    

    return (
        <View style={styles.container} >

            <View style={styles.dateBar}>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </View>

            <View style={styles.viewOrders}>

                <TextView text={'Total Orders'} total={total}></TextView>
                <TextView text={'Veg Orders'} total={orderData.veg}></TextView>
                <TextView text={'Non-Veg Orders'} total={orderData.nonVeg}></TextView>
                <TextView text={'Combo Orders'} total={orderData.combo}></TextView>
                <TextView text={'Leave'} total={0}></TextView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F2FFE9'
    },
    dateBar: {
        backgroundColor: 'lightgrey',
        height: 40,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 20,
        padding: 7
    },
    totalOrders:{
        flexDirection:'row',
        backgroundColor:'#A6CF98',
        marginTop:10,
        padding:10,
        borderRadius:10,
        height:'auto',
        width:'auto',
        justifyContent:'space-between'
    },
    txtView:{
        fontSize:25,
        fontStyle:'italic'
    },
    viewOrders: {
        margin:10
    }
})

export default Orders