import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from './Screens/Login'
import Splash from './Screens/Splash'
import AdminHome from './Admin/AdminHome'
import UserHome from './User/UserHome'
import Home from './Admin/Tabs/Home'
import Add from './Admin/Tabs/Add'
import Notification from './Admin/Tabs/Notification'
import Plans from './User/Tabs/Plans'
import Register from './Screens/Register'
import TotalUser from './Admin/Screens/TotalUser'
import UserCart from './User/Tabs/UserCart'
import Checkout from './User/Screens/Checkout'
import Address from './User/Screens/Address'
import AddNewAddress from './User/Screens/AddNewAddress'
import OrderStatus from './User/Screens/OrderStatus'
import ViewOrders from './User/Screens/ViewOrders'
import EditPlan from './Admin/Screens/EditPlan'
import ViewPlans from './Admin/Screens/ViewPlans'
import Attendence from './Admin/Screens/Attendence'
import AskLeave from './User/Screens/AskLeave'
import Leave from './Admin/Screens/Leave'
import Orders from './Admin/Screens/Orders/Orders'
import ActivePlanUsers from './Admin/Screens/ActivePlanUsers'
import UserDetail from './Admin/Screens/UserDetail'
import Testing from './Admin/Screens/Testing'
import Home2 from './User/Tabs/Home2'

const Stack = createNativeStackNavigator()

const AppNavigation = ({navigation}) => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='login'>
                <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />



                <Stack.Screen name='UserHome' component={UserHome} options={{ headerShown: false }} />
                <Stack.Screen name='Plans' component={Plans} options={{ headerShown: false }} />
                <Stack.Screen name='UserCart' component={UserCart} options={{ headerShown: false }} />
                <Stack.Screen name='Checkout' component={Checkout} options={{ headerShown: true }} />
                <Stack.Screen name='Address' component={Address} options={{ headerShown: false }} />
                <Stack.Screen name='AddNewAddress' component={AddNewAddress} options={{ headerShown: false }} />
                <Stack.Screen name='OrderStatus' component={OrderStatus} options={{ headerShown: false }} />
                <Stack.Screen name='ViewOrder' component={ViewOrders} options={{ headerShown: false }} />
                <Stack.Screen name='AskLeave' component={AskLeave} options={{ headerShown: true }} />
                <Stack.Screen name='Home2' component={Home2} options={{ headerShown: false }} />









                <Stack.Screen name='AdminHome' component={AdminHome} options={{ headerShown: false }}/>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Add' component={Add} options={{ headerShown: false }} />
                <Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
                <Stack.Screen name='TotalUsers' component={TotalUser} options={{ headerShown: false }} />
                <Stack.Screen name='EditPlan' component={EditPlan} options={{ headerShown: true }} />
                <Stack.Screen name='ViewPlan' component={ViewPlans} options={{ headerShown: true }} />
                <Stack.Screen name='Attendence' component={Attendence} options={{ headerShown: true }} />
                <Stack.Screen name='Leave' component={Leave} options={{ headerShown: true }} />
                <Stack.Screen name='Orders' component={Orders} options={{ headerShown: true }} />
                <Stack.Screen name='ActiveUsers' component={ActivePlanUsers} options={{ headerShown: true }} />
                <Stack.Screen name='UserDetail' component={UserDetail} options={{ headerShown: true }} />
                <Stack.Screen name='Testing' component={Testing} options={{headerShown: true}} />


                {/* <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen
                    component={EditItem}
                    name="EditItem"
                    options={{ headerShown: false }}
                /> */}

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation