import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { AgendaScreen } from '../../Screens/AppScreens/AgendaScreens/AgendaScreen';
import { newNoteScreen } from '../../Screens/AppScreens/AgendaScreens/newNoteScreen';

const Stack = createStackNavigator();

export const AgendaNavigator=()=> {
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
      <Stack.Screen name="AgendaScreen" options={{title:' ', headerShown:false}} component={AgendaScreen} />
      <Stack.Screen name="newNoteScreen"  component={newNoteScreen} />

    </Stack.Navigator>
  );
}