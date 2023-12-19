import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Header from '../../Common/Header';


const Address = ({ navigation }) => {

    const [addressList, setAddressList] = useState([]);
    const isFocused = useIsFocused();
    const [selectedAddress, setSelectedAddress] = useState('');

    let userId = ''

    useEffect(() => {
        getAddressList();
    }, [isFocused]);


    const getAddressList = async () => {

        const jsonValue = await AsyncStorage.getItem('USER');
        const userData = JSON.parse(jsonValue)
        userId = userData._id

        const addressId = await AsyncStorage.getItem('ADDRESS');

        const user = await firestore().collection('Users').doc(userId).get();

        let tempDart = [];
        tempDart = user._data.address;
        tempDart.map(item => {
            if (item.addressId == addressId) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        });
        setAddressList(tempDart);
    };


    const saveDeafultAddress = async item => {
        await AsyncStorage.setItem('ADDRESS', item.addressId);
        let tempDart = [];
        tempDart = addressList;
        tempDart.map(itm => {
            if (itm.addressId == item.addressId) {
                itm.selected = true;
            } else {
                itm.selected = false;
            }
        });

        let temp = [];

        tempDart.map(item => {
            temp.push(item);
        });
        setAddressList(temp);
        navigation.goBack()
    };


    return (
        <View style={styles.container}>
            <Header 
            title={'Address'}
            goBackIcon={require("../../Images/return.png")}
            
            />
            {
                addressList.length > 0 ? (
                    <FlatList
                        data={addressList}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={[
                                        styles.addressItem,
                                        { marginBottom: index == addressList.length - 1 ? 100 : 10 },
                                    ]}>
                                    <View style={{width: 200}}>
                                        <Text style={{color:'black'}}>{'Street: ' + item.street}</Text>
                                        <Text style={{color:'black'}}>{'City: ' + item.city}</Text>
                                        <Text style={{color:'black'}}>{'Pincode: ' + item.pincode}</Text>
                                        <Text style={{color:'black'}}>{'Mobile: ' + item.mobile}</Text>
                                    </View>
                                    {item.selected == true ? (
                                        <Text style={{color:'black'}}>default</Text>
                                    ) : (
                                        <TouchableOpacity
                                            style={styles.btn}
                                            onPress={() => {
                                                saveDeafultAddress(item);
                                            }}>
                                            <Text style={{ color: '#fff' }}>Set Default</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        }}
                    />
                ) : (
                    <View>
                        <Text>No Address Available</Text>
                    </View>
                )
            }

            <TouchableOpacity
                style={styles.addNewBtn}
                onPress={() => {
                    navigation.navigate('AddNewAddress');
                }}>
                <Text style={styles.btnText}>Add New Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#F2FFE9',

    },
    addNewBtn: {
        width: '90%',
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    addressItem: {
        width: '90%',

        // backgroundColor: '#fff',
    backgroundColor: '#A6CF98',

        elevation: 4,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: 'green',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
});

export default Address;
