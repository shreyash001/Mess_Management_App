import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,

} from 'react-native';
import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import Header from '../../Common/Header';



const Add = ({navigation}) => {

  useEffect(() => {

  }, [])

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const AddPlan = () => {
    firestore()
      .collection('Plans')
      .add({
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
      })
      .then(() => {
        console.log('Plan added!');
      });
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={'Add Plan'} />
      <View style={styles.container}>

        {/* {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null} */}

        <TextInput
          placeholder="Enter Plan Name"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Enter Plan Price"
          style={styles.inputStyle}
          keyboardType='numeric'
          value={price}
          onChangeText={text => setPrice(text)}
        />

        <TextInput
          placeholder="Enter Item Description"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          placeholder="Enter Item Image URL"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <Text style={{ alignSelf: 'center', marginTop: 20 }}>OR</Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {

          }}>
          <Text>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            // AddPlan()
          }}>
          <Text style={{ color: '#Fff' }}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Add;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  imageStyle: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});