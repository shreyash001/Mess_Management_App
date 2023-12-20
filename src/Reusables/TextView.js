import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export const TextView = ({ text, total }:any) => {
    return (
        <TouchableOpacity style={styles.totalOrders}>
            <Text style={styles.txtView}>{text}</Text>
            <Text style={styles.txtView}>{total}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 25,
        fontStyle: 'italic'
    }
})