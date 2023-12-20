import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Header from '../../Common/Header';
import { useNavigation } from '@react-navigation/native';
import { ViewButton } from '../../Reusables/Buttons';


const Home = () => {

  const navigation = useNavigation()

  const navigateToTotalUsers = () => {
    navigation.navigate('TotalUsers');
  };

  const navigateToActiveUsers = () => {
    navigation.navigate('ActiveUsers');
  };

  const navigateToViewPlans = () => {
    navigation.navigate('ViewPlan');
  };

  const navigateToLeave = () => {
    navigation.navigate('Leave');
  };

  const navigateToViewOrders = () => {
    navigation.navigate('Orders');
  };

  const navigateToAttendence = () => {
    navigation.navigate('Attendence');
  };

  return (
    <ScrollView style={styles.container}>

      <Header title={'Admin Pannel'} icon={require('../../Images/logout.png')} />

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>Total Users Registered</Text>
          <ViewButton text="View" onPress={navigateToTotalUsers} />
        </View>
      </View>

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>Plan Active Users</Text>
          <ViewButton text="View" onPress={navigateToActiveUsers} />
        </View>
      </View>

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>View Plans</Text>
          <ViewButton text="View" onPress={navigateToViewPlans} />
        </View>
      </View>

      {/* <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>Attendence</Text>
          <ViewButton text="View" onPress={navigateToAttendence} />
        </View>
      </View> */}

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>Leave</Text>
          <ViewButton text="View" onPress={navigateToLeave} />
        </View>
      </View>

      <View style={styles.itemView}>
        <View style={styles.orderView}>
          <Text style={styles.nameText}>View Orders</Text>
          <ViewButton text="View" onPress={navigateToViewOrders} />
        </View>
      </View>

    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    backgroundColor: '#F2FFE9',
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#A6CF98',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 'auto',
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  orderView: {
    width: '80%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default Home