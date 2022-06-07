import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CalendarioScreen } from '../../Screens/AppScreens/CalendarioScreens/CalendarioScreen';
import { HorarioScreen } from '../../Screens/AppScreens/CalendarioScreens/HorarioScreen';
import { colors } from '../../Themes/AppColors';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NotasScreen } from '../../Screens/AppScreens/NotasScreens/NotasScreen';
import { calculoRapidoScreen } from '../../Screens/AppScreens/NotasScreens/calculoRapidoScreen';
import { ingresarNotaScreen } from '../../Screens/AppScreens/NotasScreens/ingresarNotaScreen';
import { HistorialNotasScreen } from '../../Screens/AppScreens/NotasScreens/HistorialNotasScreen';

const Tab = createMaterialTopTabNavigator();

export const TopTapNotasNavigator = () => {

  return (
    <Tab.Navigator
    sceneContainerStyle={{backgroundColor: colors.blanco}}
    screenOptions={({route})=>({
      tabBarLabelStyle:{
        fontSize:10,
      },
      tabBarPressColor: colors.primary,
      tabBarShowIcon:true,
      tabBarIndicatorStyle:{
        backgroundColor:colors.primary
      },
      tabBarStyle:{
        shadowColor:'transparent',
        elevation:0
      },
      tabBarIcon:({color, focused})=>{
        let iconName:string = ' ';
        switch (route.name) {
          case 'NotasScreen':
            iconName = 'checkmark-circle-outline'
            break;
          case 'calculoRapidoScreen':
            iconName = 'calculator-outline'
            break;
          case 'ingresarNotaScreen':
            iconName = 'add-circle-outline'
            break;
          case 'HistorialNotasScreen':
            iconName = 'time-outline'
            break;
          default:
            break;
        }
        return <Icon name={iconName} size={20} color='#ed7c23' />
      }
    })}
    
    >
      <Tab.Screen name="NotasScreen" options={{title:'Notas'}} component={NotasScreen} />
      <Tab.Screen name="calculoRapidoScreen" options={{title:'Calculo'}} component={calculoRapidoScreen} />
      <Tab.Screen name="ingresarNotaScreen" options={{title:'Agregar'}} component={ingresarNotaScreen} />
      <Tab.Screen name="HistorialNotasScreen" options={{title:'Historial'}} component={HistorialNotasScreen} />
    </Tab.Navigator>
  );
}