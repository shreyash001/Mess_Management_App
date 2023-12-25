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
import { LeaveView, TextView } from '../../../Reusables/TextView';

const Orders = () => {

    const [date, setDate] = useState(new Date())
    const [orderData, setOrderData] = useState({})
    const isFocused = useIsFocused()

    const [total, setTotal] = useState(0)
    const [LL, setLL] = useState(0)
    const [DL, setDL] = useState(0)


    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const responce = await api.getOrderDetails()
        setOrderData(responce)

        let z1 = responce.combo + responce.veg + responce.nonVeg
        setTotal(z1)

        let z2 = orderData.leave.lunch.veg + orderData.leave.lunch.nonVeg + orderData.leave.lunch.combo
        setLL(z2)
        let z3 = orderData.leave.dinner.veg + orderData.leave.dinner.nonVeg + orderData.leave.dinner.combo
        setDL(z3)


        // console.log(orderData.leave.lunch.nonVeg)
    }


    return (
        <View style={styles.container}>
            <View style={styles.dateBar}>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </View>

            <View style={styles.viewOrders}>
                <TextView text={'Total Orders'} total={total}></TextView>

                <Text style={styles.txtView}>Lunch Order</Text>
                <TextView text={'Veg Orders'} total={orderData?.veg - (orderData?.leave?.lunch?.veg || 0)}></TextView>
                <TextView text={'Non-Veg Orders'} total={orderData?.nonVeg - (orderData?.leave?.lunch?.nonVeg || 0)}></TextView>
                <TextView text={'Combo Orders'} total={orderData?.combo - (orderData?.leave?.lunch?.combo || 0)}></TextView>
                <TextView text={'Lunch Leave'} total={LL}></TextView>

                <Text style={styles.txtView}>Dinner Order</Text>
                <TextView text={'Veg Orders'} total={orderData?.veg - (orderData?.leave?.dinner?.veg || 0)}></TextView>
                <TextView text={'Non-Veg Orders'} total={orderData?.nonVeg - (orderData?.leave?.dinner?.nonVeg || 0)}></TextView>
                <TextView text={'Combo Orders'} total={orderData?.combo - (orderData?.leave?.dinner?.combo || 0)}></TextView>
                <TextView text={'Lunch Leave'} total={DL}></TextView>
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFE9'
    },
    dateBar: {
        backgroundColor: 'lightgrey',
        height: 'auto',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 20,
        padding: 7
    },
    totalOrders: {
        flexDirection: 'row',
        backgroundColor: '#A6CF98',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        height: 'auto',
        width: 'auto',
        justifyContent: 'space-between'
    },
    txtView: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        // borderRadius:10,
        fontSize: 25,
        fontStyle: 'italic',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    viewOrders: {
        margin: 10
    }
})

export default Orders