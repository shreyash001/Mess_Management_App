import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Button,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Card from '../../Reusables/Card.js';

//  Here Started........
const source = {
  html: `
    <div style= " border: 2px solid grey; height: 50px; width:95%; margin-left:10px; margin-top: 10px;
      border-radius: 20px">
      <p style= " margin-left: 10px">location</p>
    </div>

    <div style= " border: 2px solid blue; height: 200px; margin-top:10px; width:95%; margin-left: 10px;
     border-radius: 30px; background-color: #ef4f5f; margin-bottom:10px">
     <p style= " color: white; font-weight: 600; margin-left: 30px">Up To</p>
     <p style= " font-size: 30px; font-weight:900; margin-left: 30px; color: white">70% OFF</p>
     <p style= " margin-left: 30px; font-size: 20px; font-weight: 500; color: white">with free delivery</p>
    </div>

    <div style= " border: 2px solid red; height: 60px;">
     <p style= " margin-left: 30px; font-weight: 700; font-size: 20px">Eat what makes you happy</p>
    </div>

    <div style= " border: 2px solid red; height:152px; flex-direction: row; display: flex-inline">
        <div style= " border: 1px solid blue; height: 150px; width:30%"></div>
        <div style= " border: 1px solid blue; height: 150px; width:30%"></div>
        <div style= " border: 1px solid blue; height: 150px; width:30%"></div>
        <div style= " border: 1px solid blue; height: 150px; width:30%"></div>
        <div style= " border: 1px solid blue; height: 150px; width:30%"></div>
        <div style= " border: 1px solid blue; height: 150px; width:30%"></div>
    </div>

    `,
};

const handleLogin = () => {
  console.log('Hello');
};

const Home2 = () => {
  // return <RenderHTML contentWidth={useWindowDimensions} source={source} />;
  return (
    <ScrollView>
      <View style={styles.location}>
        <Text style={styles.locTxt}>location</Text>
      </View>

      <View style={styles.Up}>
        <Text style={styles.UpTxt}>Up To</Text>
        <Text style={styles.OffTxt}>70% OFF</Text>
        <Text style={styles.WithTxt}>with free delivery</Text>
      </View>

      <View style={styles.Eat}>
        <Text style={styles.EatTxt}>Hungry for dinner?</Text>
      </View>

      {/* <View style={styles.Image}>
        <Text style={styles.ImgTxt}>Foods Images</Text>
      </View> */}

      {/* <View style={styles.Rest}>
        <Text style={styles.RexTxt}>888 restaurants around you</Text>
      </View> */}

      {/* <View style={styles.Bir}>
        <Text style={styles.BirTxt}>Biryani Image</Text>
      </View> */}

      <View style={styles.Box}>
        <Card
          t1={'FOOD DELIVERY'}
          t2={'FROM RESTAURANTS'}
          t3={'UP TO 60% OFF'}
        />
        <Card t1={'INSTAMART'} t2={'INSTANT GROCERY'} t3={'FREE DELIVERY'} />
      </View>

      <View style={styles.Box}>
        <Card
          t1={'DINEOUT'}
          t2={'EAT OUT  AND SAVE MORE'}
          t3={'NO MEMBERSHIP NEEDED'}
        />
        <Card
          t1={'GENIE'}
          t2={'PICK-UP & DROP'}
          t3={'NO MEMBERSHIP NEEDED'}
        />
      </View>

      <View style={styles.Refer}>
        <Text>EASIEST WAY TO</Text>
        <Text>Refer And Earn!</Text>
      </View>

      <View style={styles.Foot}>
        <Text style={styles.LivTxt}>Live</Text>
        <Text style={styles.MidTxt}>it up!</Text>
        <Text style={styles.CrafTxt}>
          Crafted with 💖 in Uttar Pradesh.India
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  location: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 15,
    height: 50,
    // width:'95%',
    margin: 15,
    // alignItems:'flex-end'
    justifyContent: 'center',
  },
  locTxt: {
    marginLeft: 10,
  },
  Up: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 20,
    height: 200,
    margin: 15,
    backgroundColor: '#ef4f5f',
    justifyContent: 'center',
    elevation: 20,
  },
  UpTxt: {
    fontSize: 20,
    // marginTop:30,
    marginLeft: 30,
    color: 'white',
    fontWeight: '700',
  },
  OffTxt: {
    fontSize: 30,
    marginLeft: 30,
    color: 'white',
    fontWeight: '700',
  },
  WithTxt: {
    fontSize: 20,
    marginLeft: 30,
    color: 'white',
    fontWeight: '700',
  },
  Eat: {
    // borderWidth:2,
    // borderColor:'red',
    height: 50,
    justifyContent: 'center',
    margin: 15,
    borderRadius: 15,
    // backgroundColor:'#ffffff'
  },
  EatTxt: {
    fontSize: 30,
    fontWeight: '700',
    marginLeft: 15,
  },
  // Image:{
  //   borderWidth:2,
  //   borderColor:'grey',
  //   height:150,
  //   justifyContent:'center',

  // },
  // ImgTxt:{
  //   fontSize:50,
  //   fontWeight:'700',
  //   marginLeft:20
  // },
  // Rest:{
  //   borderWidth:2,
  //   borderColor:'red',
  //   height:50,
  //   justifyContent:'center'
  // },
  // RexTxt:{
  //   fontSize:20,
  //   fontWeight:'700',
  //   marginLeft:20
  // },
  // Bir:{
  //   borderWidth:2,
  //   borderColor:'red',
  //   borderRadius:20,
  //   height:200,
  //   margin:10,
  //   backgroundColor:'#d3aa7d',
  //   justifyContent:'center'
  // },
  // BirTxt:{
  //   fontSize:50,
  //   fontWeight:'700',
  //   marginLeft:20
  // },
  Box: {
    // borderWidth: 2,
    // borderColor: 'green',
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
  Refer: {
    height: 250,
    margin: 15,
    borderRadius: 20,
    borderColor: 'green',
    borderWidth: 2,
  },
  Foot: {
    height: 400,
    // borderWidth:2,
    // borderColor:'red',
    margin: 15,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  LivTxt: {
    fontSize: 100,
    fontWeight: '900',
    marginLeft: 30,
    color: 'rgb(92 91 90)',
  },
  MidTxt: {
    fontSize: 100,
    fontWeight: '900',
    marginLeft: 30,
    color: 'rgb(92 91 90)',
  },
  CrafTxt: {
    fontSize: 15,
    marginLeft: 30,
  },
});

export default Home2;