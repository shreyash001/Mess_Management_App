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
import React, { useState, useEffect } from 'react'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Register = () => {

    const navigation =  useNavigation()

    useEffect(() => {
        getUsers();

    }, [])


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const [tempData, setTempData] = useState([]);

    const getUsers = async () => {
        await firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    //   console.log(
                    //     'User ID: ',
                    //     documentSnapshot.id,
                    //     // documentSnapshot.data(),
                    //   );
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    });
                });
                setTempData(tempData)
            });
        // console.log(tempData)
    }

    const saveUser = async() => {
        let isExist = false
        const userId = mobile
        console.log('save user btn triggered')

        if (email !== '' && password !== '' && name !== '' && mobile !== '') {

            tempData.map((item) => {
                // console.log(item.id, mobile)
                if (item.id == userId) {
                    alert('User Already exist')
                    isExist = true;
                }
            })

            if (!isExist) {
                await firestore().collection('Users').doc(userId)
                    .set({
                        _id: userId,
                        name: name,
                        email: email,
                        password: password,
                        phoneNo: mobile,
                        isUser: true,
                        planPurched: {
                            planName:'',
                            planAmount: '',
                            planStartDate: '',
                            planDayRemaning: 0
                        },
                        cart:[],
                        address:[],
                        orders:{}
    
                    }).then(() => {
                        console.log('User Added')
                        navigation.goBack()
                    })
            }else{
                Alert('User already exist')
                navigation.goBack()
            }
        }else{
            alert('Enter Correct Details')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../Images/splash.png')}
                style={{ height: 175, width: 250, objectFit: 'fill', alignSelf: 'center' }}
            />

            <Text style={styles.title}>Sign up</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder={'Name'}
                placeholderTextColor='black'
                value={name}
                onChangeText={txt => setName(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Email Id'}
                placeholderTextColor='black'
                value={email}
                onChangeText={txt => setEmail(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Mobile No.'}
                placeholderTextColor='black'
                keyboardType={'number-pad'}
                value={mobile}
                onChangeText={txt => setMobile(txt)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder={'Password '}
                placeholderTextColor='black'
                value={password}
                secureTextEntry = {true}
                onChangeText={txt => setPassword(txt)}
            />
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                    saveUser();
                    console.log(name, email, password, mobile)
                }}>
                <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                    navigation.goBack()
                }}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
        marginTop: 20,
        alignSelf: 'center',
    },
    inputStyle: {
        paddingLeft: 20,
        height: 50,
        alignSelf: 'center',
        marginTop: 30,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '90%',
        color:'black'
    },
    loginBtn: {
        backgroundColor: 'green',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});
export default Register