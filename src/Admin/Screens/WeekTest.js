import { addDays, format, getDate, isSameDay, parseISO, startOfWeek, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


// get week days
export const getWeekDays = (date) => {

    // const newBackDate = subDays(date, 7)
    const start = startOfWeek(date, { weekStartsOn: 1 });

    const final = [];

    for (let i = 0; i < 7; i++) {
        const date = addDays(start, i);
        final.push({
            formatted: format(date, 'EEE'),
            date,
            day: getDate(date),
        });
    }

    return final;
};


const WeekTest = ({ date, onChange }) => {
    const formattedDate = format(date,'yyyy-LL-dd')
    const [week, setWeek] = useState([]);

    useEffect(() => {
        const weekDays = getWeekDays(parseISO(formattedDate));
        setWeek(weekDays);
    }, [date]);

    // console.log(week)


    return (
        <View style={styles.container}>

            {week.map((weekDay) => {
                const textStyles = [styles.label];
                const touchable = [styles.touchable];
                const sameDay = isSameDay(weekDay.date, date);
                if (sameDay) {
                    textStyles.push(styles.selectedLabel);
                    touchable.push(styles.selectedTouchable);
                }

                return (
                    <View style={styles.weekDayItem} key={weekDay.formatted}>
                        <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
                        <TouchableOpacity
                            onPress={() => onChange(weekDay.date)}
                            style={touchable}>
                            <Text style={textStyles}>{weekDay.day}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    weekDayText: {
        color: 'gray',
        marginBottom: 5,
    },
    label: {
        fontSize: 13,
        color: 'black',
        textAlign: 'center',
    },
    selectedLabel: {
        color: 'white',
    },
    touchable: {
        borderRadius: 20,
        padding: 7.5,
        height: 35,
        width: 35,
    },
    selectedTouchable: {
        backgroundColor: 'green',
    },
    weekDayItem: {
        alignItems: 'center',
    },
});





export default WeekTest;