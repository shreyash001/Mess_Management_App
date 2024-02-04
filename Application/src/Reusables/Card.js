import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Card = ({t1, t2, t3, onPress}) => {
  return (
    <TouchableOpacity style={styles.Box1} onPress={onPress}>
      <Text style={styles.Box1Txt}>{t1}</Text>
      <Text style={styles.RestTxt}>{t2}</Text>
      <Text style={styles.DiscTxt}>{t3}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Box1: {
    // borderWidth:2,
    // borderColor:'blue',
    borderRadius: 20,
    height: '70%',
    width: '45%',
    backgroundColor: '#ffffff',
    // backgroundColor:'red',
    elevation: 20,
    alignSelf:'center',
    margin:0
  },
  Box1Txt: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    marginTop: 20,
  },
  RestTxt: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
  },
  DiscTxt: {
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: 'rgb(250 105 0)',
    width: 145,
    borderRadius: 10,
    fontSize: 17,
    padding:7
  },
});

export default Card;
