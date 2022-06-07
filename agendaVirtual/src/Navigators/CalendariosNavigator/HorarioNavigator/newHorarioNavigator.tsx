import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HorarioScreen } from '../../../Screens/AppScreens/CalendarioScreens/HorarioScreen';
import { NewHorario } from '../../../Screens/AppScreens/CalendarioScreens/HorariosScreens/NewHorario';

const Stack = createStackNavigator();

export const newHorarioNavigator=()=> {
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
      <Stack.Screen name="HorarioScreen"  component={HorarioScreen} />
      <Stack.Screen name="NewHorario"  component={NewHorario} />

    </Stack.Navigator>
  );
}