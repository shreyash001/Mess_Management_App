import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Header from '../../Common/Header';


const AddNewAddress = ({ navigation }) => {

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobile, setMobile] = useState('');

    const saveAddress = async () => {
        const jsonValue = await AsyncStorage.getItem('USER')
        const userData = JSON.parse(jsonValue)
        const userId = userData._id

        const addressId = uuid.v4();

        const user = await firestore().collection('Users').doc(userId).get();

        let tempDart = [];
        tempDart = user._data.address;
        tempDart.push({ street, city, pincode, mobile, addressId, selected: false });
        await firestore()
            .collection('Users')
            .doc(userId)
            .update({
                address: tempDart,
            })
            .then(res => {
                console.log('successfully added');
                alert('Address Added')
                navigation.goBack();
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <View style={styles.container}>
            <Header
                title={'Add Address'}
                goBackIcon={require('../../Images/return.png')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Street'}
                value={street}
                placeholderTextColor='black'
                onChangeText={txt => setStreet(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter City '}
                value={city}
                placeholderTextColor='black'
                onChangeText={txt => setCity(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Pincode'}
                value={pincode}
                keyboardType="number-pad"
                placeholderTextColor='black'
                onChangeText={txt => setPincode(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Contact'}
                value={mobile}
                maxLength={10}
                keyboardType="number-pad"
                placeholderTextColor='black'
                onChangeText={txt => setMobile(txt)}
            />
            <TouchableOpacity
                style={styles.addNewBtn}
                onPress={() => {
                    // navigation.navigate('AddNewAddress');
                    saveAddress();
                }}>
                <Text style={styles.btnText}>Save Address</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddNewAddress;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFE9',

    },
    inputStyle: {
        paddingLeft: 20,
        height: 50,
        alignSelf: 'center',
        marginTop: 30,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#A6CF98',
        color: 'black'

    },
    addNewBtn: {
        width: '90%',
        height: 50,
        // backgroundColor: 'orange',
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
});