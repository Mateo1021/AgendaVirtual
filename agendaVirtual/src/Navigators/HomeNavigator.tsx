import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/AppScreens/HomeScreen';
import React from 'react';
import { TareaScreen } from '../Screens/AppScreens/CalendarioScreens/TareaScreen';
import { PerfilScreen } from '../Screens/AppScreens/UsuarioScreens/PerfilScreen';
import { RankingScreen } from '../Screens/AppScreens/UsuarioScreens/RankingScreen';
import { EditTareaScreen } from '../Screens/AppScreens/CalendarioScreens/EditTareaScreen';

const Stack = createStackNavigator();

export const HomeNavigator=()=> {
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
      <Stack.Screen name="HomeScreen" options={{title:' ', headerBackTitle:'Salir',headerBackTitleVisible:true}} component={HomeScreen} />
      <Stack.Screen name="PerfilScreen"  options={{title:'Perfil'}} component={PerfilScreen} />
      <Stack.Screen name="RankingScreen" options={{title:'Puntaje'}} component={RankingScreen} />
      <Stack.Screen name="EditTareaScreen" options={{headerShown:false}} component={EditTareaScreen} />
    </Stack.Navigator>
  );
}