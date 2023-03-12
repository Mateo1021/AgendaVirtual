import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { CreateUserScreen } from '../../Screens/AppScreens/LoginScreens/CreateUserScreen';
import { LoginScreen } from '../../Screens/AppScreens/LoginScreens/LoginScreen';
import { listScreen } from '../../Screens/AppScreens/LoginScreens/listScreen';
import { EditUserscreen } from '../../Screens/AppScreens/LoginScreens/EditUserscreen';
import { MenuLateralNavigator } from '../MenuLateralNavigator';


const Stack = createStackNavigator();

export const StackNavigatorLogin=()=> {
  return (
    <Stack.Navigator
    
    screenOptions={{
      headerStyle:{
        elevation:0,
        shadowColor:'transparent'
      },
      cardStyle:{
        backgroundColor:'white'
      }
    }}
    >
      <Stack.Screen name="LoginScreen" options={{headerShown:false}}  component={LoginScreen} />
      <Stack.Screen name="CreateUserScreen"  component={CreateUserScreen} />
      <Stack.Screen name="EditUserscreen" component={EditUserscreen} />
      <Stack.Screen name="MenuLateralNavigator" options={{headerShown:false}} component={MenuLateralNavigator} />
    </Stack.Navigator>
  );
}