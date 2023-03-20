import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { CalendarioScreen } from '../../../Screens/AppScreens/CalendarioScreens/CalendarioScreen';
import { EditTareaScreen } from '../../../Screens/AppScreens/CalendarioScreens/EditTareaScreen';
import { TareaScreen } from '../../../Screens/AppScreens/CalendarioScreens/TareaScreen';
const Stack = createStackNavigator();
export const calendarNavigator = () => {
  return (
    <Stack.Navigator
    
    screenOptions={{
      headerShown:false,
      headerStyle:{
        elevation:0,
        shadowColor:'transparent'
      },
      cardStyle:{
        backgroundColor:'white'
      }
    }}
    >
      <Stack.Screen name="CalendarioScreen"  component={CalendarioScreen} />
      <Stack.Screen name="TareaScreen" options={{headerShown:false}} component={TareaScreen} />
      <Stack.Screen name="EditTareaScreen" options={{headerShown:false}} component={EditTareaScreen} />
    </Stack.Navigator>
  )
}
