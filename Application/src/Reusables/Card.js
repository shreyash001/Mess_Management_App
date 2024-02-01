import {StyleSheet, View, Text} from 'react-native';

const Card = ({t1, t2, t3}) => {
  return (
    <View style={styles.Box1}>
      <Text style={styles.Box1Txt}>{t1}</Text>
      <Text style={styles.RestTxt}>{t2}</Text>
      <Text style={styles.DiscTxt}>{t3}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    // borderWidth:2,
    // borderColor:'green',
    borderRadius: 20,
    height: 200,
    margin: 15,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  Box1: {
    // borderWidth:2,
    // borderColor:'blue',
    borderRadius: 20,
    height: 200,
    width: 172,
    backgroundColor: '#ffffff',
    elevation: 20,
  },
  Box1Txt: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    marginTop: 20,
  },
  RestTxt: {
    fontSize: 13,
    marginLeft: 10,
    marginTop: 5,
  },
  DiscTxt: {
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: 'rgb(250 105 0)',
    width: 145,
    borderRadius: 10,
    fontSize: 11,
  },
});

export default Card;
