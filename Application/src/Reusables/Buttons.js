/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const ViewButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.viewBtn}>
            <Text style={{ color: 'white', padding: 5, alignSelf: 'center', fontWeight: '700', fontSize: 15 }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    viewBtn: {
        backgroundColor: 'green',
        margin: 10,
        padding: 10,
        width: 'auto',
        minWidth: 100,
        borderRadius: 50
    },
});
