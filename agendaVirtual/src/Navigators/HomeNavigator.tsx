import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../Screens/AppScreens/HomeScreen';
import React from 'react';
import { TareaScreen } from '../Screens/AppScreens/CalendarioScreens/TareaScreen';
import { PerfilScreen } from '../Screens/AppScreens/UsuarioScreens/PerfilScreen';
import { RankingScreen } from '../Screens/AppScreens/UsuarioScreens/RankingScreen';

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
      <Stack.Screen name="TareaScreen"  component={TareaScreen} />
      <Stack.Screen name="PerfilScreen"  component={PerfilScreen} />
      <Stack.Screen name="RankingScreen" component={RankingScreen} />
    </Stack.Navigator>
  );
}