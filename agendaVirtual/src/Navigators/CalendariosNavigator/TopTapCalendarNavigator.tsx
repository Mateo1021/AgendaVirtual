import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CalendarioScreen } from '../../Screens/AppScreens/CalendarioScreens/CalendarioScreen';
import { HorarioScreen } from '../../Screens/AppScreens/CalendarioScreens/HorarioScreen';
import { colors } from '../../Themes/AppColors';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { newHorarioNavigator } from './HorarioNavigator/newHorarioNavigator';
import { calendarNavigator } from './CalendarioNavigator/calendarNavigator';

const Tab = createMaterialTopTabNavigator();

export const TopTapCalendarNavigator = () => {

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
          case 'CalendarioScreen':
            iconName = 'calendar-outline'
            break;
          case 'HorarioScreen':
            iconName = 'time-outline'
            break;
          default:
            break;
        }
        return <Icon name={iconName} size={20} color='#ed7c23' />
      }
    })}
    
    >
      <Tab.Screen name="CalendarioScreen" options={{title:'Calendario'}} component={calendarNavigator} />
      <Tab.Screen name="HorarioScreen" options={{title:'Horario'}} component={newHorarioNavigator} />
    </Tab.Navigator>
  );
}