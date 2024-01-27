import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

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

const Home2 = () => {
  return <RenderHTML contentWidth={useWindowDimensions} source={source} />;
};

export default Home2;
