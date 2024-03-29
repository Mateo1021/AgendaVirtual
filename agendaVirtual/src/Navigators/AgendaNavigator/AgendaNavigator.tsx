import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { AgendaScreen } from '../../Screens/AppScreens/AgendaScreens/AgendaScreen';
import { newNoteScreen } from '../../Screens/AppScreens/AgendaScreens/newNoteScreen';
import { ViewNote } from '../../Screens/AppScreens/AgendaScreens/ViewNote';

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
      <Stack.Screen name="newNoteScreen" options={{title:'Notas'}}  component={newNoteScreen} />
      <Stack.Screen name="ViewNote" options={{title:'Nota'}}  component={ViewNote} />

    </Stack.Navigator>
  );
}