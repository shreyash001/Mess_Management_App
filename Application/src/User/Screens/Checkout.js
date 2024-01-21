import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Button
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import RazorpayCheckout from 'react-native-razorpay';
// import Razorpay from 'razorpay';


import DateTimePicker from '@react-native-community/datetimepicker';


const Checkout = () => {

    const [cartList, setCartList] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const currentDate = useState(new Date())

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState();



    let userId = '';
    let order_id = uuid.v4()

    const [selectedAddress, setSelectedAddress] = useState('No Selected Address');

    useEffect(() => {
        getCartItems();
        getAddressList();
    }, [isFocused]);

    const getCartItems = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('USER');
            const userData = JSON.parse(jsonValue)
            userId = userData._id
        } catch (error) {
            console.log('error in reading async value')
        }


        const user = await firestore().collection('Users').doc(userId).get();
        setCartList(user._data.cart);
        // console.log(user._data.cart)
    };

    const getAddressList = async () => {

        const addressId = await AsyncStorage.getItem('ADDRESS');

        const user = await firestore().collection('Users').doc(userId).get();
        let tempDart = [];
        tempDart = user._data.address;
        tempDart.map((item: { addressId: string | null; street: string; city: string; pincode: string; mobile: string; }) => {
            if (item.addressId == addressId) {
                setSelectedAddress(
                    item.street +
                    ',' +
                    item.city +
                    ',' +
                    item.pincode +
                    ',' +
                    item.mobile,
                );
            }
        });
    };

    const getTotal = () => {
        let total = 0;
        cartList.map(item => {
            total = total + item.data.qty * item.data.price;
        });
        return total;
    };

    // const createOrderId = async() => {
    //     const instance = new Razorpay(
    //         {
    //             key_id: 'rzp_test_qrQ21jnDaz5Drg',
    //             key_secret: '7kovU8KA2BaE2CXdKkeKi2jc'
    //         }
    //     )

    //     var options = {
    //         amount: 50000,  // amount in the smallest currency unit
    //         currency: "INR",
    //         receipt: "order_rcptid_11",
    //     };

    //     instance.orders.create(options, function (err, order) {
    //         console.log(order);
    //     });
    // }


    const payNow = async () => {
        const jsonValue = await AsyncStorage.getItem('USER');
        const data = JSON.parse(jsonValue)

        const email = data.email
        const name = data.name
        const mobile = data.phoneNo
        const userId = data._id

        const purchasedDate = currentDate[0].toDateString()
        const startDate = date.toDateString()

        // console.log(email, name, mobile)

        var options = {
            description: 'Credits towards consultation',
            image: require('../../Images/splash.png'),
            currency: 'INR',
            key: 'rzp_test_qrQ21jnDaz5Drg',
            amount: getTotal() * 100,
            name: 'Dada Biryani',
            order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
                email: email,
                contact: mobile,
                name: name
            },
            theme: { color: '#53a20e' }
        }

        // console.log(purchasedDate)
        // createOrderId()


        RazorpayCheckout.open(options).then((data) => {

            navigation.navigate('OrderStatus', {
                status: 'success',
                paymentId: data.razorpay_payment_id,
                cartList: cartList,
                total: getTotal(),
                address: selectedAddress,
                userId: userId,
                userName: name,
                userEmail: email,
                userMobile: mobile,
                purchedDate: purchasedDate,
                startDate: startDate
            });

        }).catch(error => {
            // handle failure
            alert('Failed')

            navigation.navigate('OrderStatus', {
                status: 'failed',
            });
        });
    };

    const handleDate = (modeToShow) => {
        setShow(true)
        setMode(modeToShow)
    }




    return (
        <View style={styles.container}>

            <View>
                <FlatList
                    data={cartList}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.itemView}>
                                <Image
                                    source={{ uri: item.data.imageUrl }}
                                    style={styles.itemImage}
                                />
                                <View style={styles.nameView}>
                                    <Text style={styles.nameText}>{item.data.name}</Text>
                                    <View style={styles.priceView}>
                                        <Text style={styles.priceText}>
                                            {'Rs ' + item.data.price}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.nameText}>{'Qty : ' + item.data.qty}</Text>
                            </View>
                        );
                    }}
                />
            </View>

            <View style={styles.totalView}>
                <Text style={styles.nameText}>Total</Text>
                <Text style={styles.nameText}>{'Rs ' + getTotal()}</Text>
            </View>

            <View>
                <View style={styles.totalView}>
                    <Text style={styles.nameText}>Selected Address</Text>
                    <Text
                        style={styles.editAddress}
                        onPress={() => {
                            navigation.navigate('Address');
                        }}>
                        Change Address
                    </Text>
                </View>

                <Text
                    style={{
                        margin: 15,
                        width: '100%',
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '600',
                    }}>
                    {selectedAddress}
                </Text>
            </View>


            <View style={styles.totalView}>
                <Text style={styles.nameText}>Selected Start date</Text>
                <Button title='Change Date' onPress={() => handleDate('date')} />
                {
                    show && (
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={false}
                            onChange={(e, selectedDate) => {
                                console.log(selectedDate?.toDateString())
                                setDate(selectedDate)
                                setShow(false)
                            }}
                        />
                    )
                }
            </View>
            <Text
                style={{
                    margin: 15,
                    width: '100%',
                    fontSize: 16,
                    color: '#000',
                    fontWeight: '600',
                }}
            >
                {date?.toDateString()}

            </Text>

            <TouchableOpacity
                disabled={selectedAddress == 'No Selected Address' ? true : false}
                style={[
                    styles.checkoutBtn,
                    {
                        backgroundColor:
                            selectedAddress == 'No Selected Address' ? '#DADADA' : 'green',
                    },
                ]}
                onPress={() => {
                    if (selectedAddress !== 'No Selected Address') {
                        payNow()
                    }
                }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                    Pay Now {'Rs ' + getTotal()}
                </Text>
            </TouchableOpacity>




        </View>
    );
};

export default Checkout;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFE9',

    },
    itemView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        // backgroundColor: '#fff',
        backgroundColor: '#A6CF98',
        elevation: 4,
        marginTop: 10,
        borderRadius: 10,
        height: 120,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent:'space-evenly'
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 5,
    },
    nameView: {
        width: '35%',
        margin: 10,

    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
        color:'black'

    },
    descText: {
        fontSize: 14,
        fontWeight: '600',
        
    },
    priceText: {
        fontSize: 18,
        color: 'green',
        fontWeight: '700',
    },
    discountText: {
        fontSize: 17,
        fontWeight: '600',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    totalView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        height: 50,
        borderTopWidth: 0.3,
        paddingRight: 20,
        marginTop: 20,
        alignItems: 'center',
        borderTopColor: '#8e8e8e',
    },
    editAddress: {
        color: '#2F62D1',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    checkoutBtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});