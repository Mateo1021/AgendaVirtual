import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProyectosScreen } from '../../Screens/AppScreens/ProyectosScreens/ProyectosScreen';
import { lookProyectoScreen } from '../../Screens/AppScreens/ProyectosScreens/lookProyectoScreen';
import { ForoScreen } from '../../Screens/AppScreens/ProyectosScreens/ForoScreen';
import { ForoDocenteScreen } from '../../Screens/AppScreens/ProyectosScreens/ForoDocenteScreen';
import { ResponseForo } from '../../Screens/AppScreens/ProyectosScreens/ResponseForo';
import { infoCursoScreen } from '../../Screens/AppScreens/ProyectosScreens/infoCursoScreen';
import { AsistantEventScreen } from '../../Screens/AppScreens/ProyectosScreens/AsistantEventScreen';

const Stack = createStackNavigator();

export const newProyectoNavigator=()=> {
  return (
    <Stack.Navigator
    
    screenOptions={{
      headerShown:true,
      headerStyle:{
        elevation:0,
        shadowColor:'transparent',

      },
      cardStyle:{
        backgroundColor:'white'
      },

    }}
    >
      <Stack.Screen name="ProyectosScreen"  options={{headerShown:false}} component={ProyectosScreen} />
      <Stack.Screen name="lookProyectoScreen" options={{title:'Atras'}}  component={lookProyectoScreen} />
      <Stack.Screen name="ForoScreen" options={{title:'Atras'}} component={ForoScreen} />
      <Stack.Screen name="ForoDocenteScreen" options={{title:'Atras'}} component={ForoDocenteScreen} />
      <Stack.Screen name="ResponseForo" options={{title:'Atras'}} component={ResponseForo} />
      <Stack.Screen name="infoCursoScreen" options={{title:'Atras'}} component={infoCursoScreen} />
      <Stack.Screen name="AsistantEventScreen" options={{title:'Atras'}} component={AsistantEventScreen} />


    </Stack.Navigator>
  );
}