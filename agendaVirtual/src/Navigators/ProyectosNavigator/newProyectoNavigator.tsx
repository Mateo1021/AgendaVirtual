import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProyectosScreen } from '../../Screens/AppScreens/ProyectosScreens/ProyectosScreen';
import { lookProyectoScreen } from '../../Screens/AppScreens/ProyectosScreens/lookProyectoScreen';
import { ForoScreen } from '../../Screens/AppScreens/ProyectosScreens/ForoScreen';
import { ForoDocenteScreen } from '../../Screens/AppScreens/ProyectosScreens/ForoDocenteScreen';

const Stack = createStackNavigator();

export const newProyectoNavigator=()=> {
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
      <Stack.Screen name="ProyectosScreen"   component={ProyectosScreen} />
      <Stack.Screen name="lookProyectoScreen"  component={lookProyectoScreen} />
      <Stack.Screen name="ForoScreen"  component={ForoScreen} />
      <Stack.Screen name="ForoDocenteScreen" options={{title:' ', headerBackTitle:'Salir',headerBackTitleVisible:true}} component={ForoDocenteScreen} />

    </Stack.Navigator>
  );
}