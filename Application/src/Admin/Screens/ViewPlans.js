import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'

const ViewPlans = () => {
    const [items, setItems] = useState([])

    const navigation = useNavigation()

    useEffect(() => {
        getItems()
    })

    const getItems = async () => {
        await firestore()
            .collection('Plans')
            .get()
            .then(querySnapshot => {
                let tempData: any = [];

                querySnapshot.forEach(documentSnapshot => {
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    });
                });
                setItems(tempData);
            });
    };

    const deleteItem = (docId) => {
        firestore()
            .collection('Plans')
            .doc(docId)
            .delete()
            .then(() => {
                console.log('User deleted!');
                getItems();
            });
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.itemView}>
                            <Image
                                source={{ uri: item.data.imageUrl }}
                                style={styles.itemImage}
                            />
                            <View style={styles.nameView}>
                                <Text style={styles.nameText}>{item.data.name}</Text>
                                <Text style={styles.descText}>{item.data.description}</Text>
                                <View style={styles.priceView}>
                                    <Text style={styles.priceText}>
                                        {'Rs ' + item.data.price}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ margin: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('EditPlan', {
                                            data: item.data,
                                            id: item.id,
                                        });
                                    }}>
                                    <Image
                                        source={require('../../Images/edit.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        deleteItem(item.id);
                                    }}>
                                    <Image
                                        source={require('../../Images/delete.png')}
                                        style={[styles.icon, { marginTop: 20 }]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    )
}

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
        height: 'auto',
        marginBottom: 10,
        alignItems: 'center'
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
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 18,
        fontWeight: '700',
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
    icon: {
        width: 24,
        height: 24,
    },
});

export default ViewPlans