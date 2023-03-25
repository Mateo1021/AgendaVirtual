import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HorarioScreen } from '../../../Screens/AppScreens/CalendarioScreens/HorarioScreen';
import { addMateriasScreen } from '../../../Screens/AppScreens/CalendarioScreens/HorariosScreens/addMateriasScreen';
import { editarHorarioScreen } from '../../../Screens/AppScreens/CalendarioScreens/HorariosScreens/editarHorarioScreen';
import { editMateriaScreen } from '../../../Screens/AppScreens/CalendarioScreens/HorariosScreens/editMateriaScreen';
import { NewHorario } from '../../../Screens/AppScreens/CalendarioScreens/HorariosScreens/NewHorario';
import { viewHorarioScreen } from '../../../Screens/AppScreens/CalendarioScreens/HorariosScreens/viewHorarioScreen';

const Stack = createStackNavigator();

export const newHorarioNavigator=()=> {
  return (
    <Stack.Navigator
    
    screenOptions={{
      headerShown:true,
      headerStyle:{
        elevation:0,
        shadowColor:'transparent'
      },
      cardStyle:{
        backgroundColor:'white'
      }
    }}
    >
      <Stack.Screen name="HorarioScreen" options={{headerShown:false}}  component={HorarioScreen} />
      <Stack.Screen name="NewHorario" options={{headerShown:false}}  component={NewHorario} />
      <Stack.Screen name="addMateriasScreen"  options={{headerShown:true,title:'Atras'}}  component={addMateriasScreen} />
      <Stack.Screen name="editarHorarioScreen" options={{headerShown:true,title:'Atras'}}  component={editarHorarioScreen} />
      <Stack.Screen name="viewHorarioScreen"  options={{headerShown:true,title:'Atras'}}  component={viewHorarioScreen} />
      <Stack.Screen name="editMateriaScreen"  options={{headerShown:true,title:'Atras'}}  component={editMateriaScreen} />
    

    </Stack.Navigator>
  );
}