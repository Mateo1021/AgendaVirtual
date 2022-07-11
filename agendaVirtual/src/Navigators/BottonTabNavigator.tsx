import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Screens/AppScreens/HomeScreen';
import { CalendarioScreen } from '../Screens/AppScreens/CalendarioScreens/CalendarioScreen';
import { NotasScreen } from '../Screens/AppScreens/NotasScreens/NotasScreen';
import { AgendaScreen } from '../Screens/AppScreens/AgendaScreens/AgendaScreen';
import { ProyectosScreen } from '../Screens/AppScreens/ProyectosScreens/ProyectosScreen';
import { HomeNavigator } from './HomeNavigator';
import { stylesApp, colors } from '../Themes/AppThemes';
import { Platform, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { TopTapCalendarNavigator } from './CalendariosNavigator/TopTapCalendarNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { TopTapNotasNavigator } from './NotasNavigator/TopTapNotasNavigator';
import { newProyectoNavigator } from './ProyectosNavigator/newProyectoNavigator';
import { AgendaNavigator } from './AgendaNavigator/AgendaNavigator';



export const BottonTabs = ()=>{
return Platform.OS === 'ios'?<BottonTabNavigatorIos />: <BottonTabNavigatorAndr />
}


const TabAndroid = createMaterialBottomTabNavigator();
const BottonTabNavigatorAndr= ()=> {
  return (
    <TabAndroid.Navigator
    sceneAnimationEnabled={true}
    barStyle={{backgroundColor: colors.primary}}
    screenOptions={({route})=>({
      headerShown: false,
      tabBarActiveTintColor:colors.primary,
      tabBarStyle:{
        borderTopColor:colors.primary,
        borderTopWidth:1
      },
      tabBarLabelStyle:{
        fontSize:15
      },
      tabBarIcon:({color, focused})=>{
        let iconName:string = ' ';
        switch (route.name) {
          case 'HomeNavigator':
            iconName = 'planet-outline'
            break;
          case 'TopTapCalendarNavigator':
            iconName = 'calendar-outline'
            break;
          case 'TopTapNotasNavigator':
            iconName = 'checkbox-outline'
            break;
          case 'AgendaNavigator':
            iconName = 'book-outline'
            break;
          case 'TopTapProyNavigator':
            iconName = 'library-outline'
            break;
          default:
            break;
        }
        return <Icon name={iconName} size={25} color='white' />
      }
    })}
    >
      <TabAndroid.Screen name="HomeNavigator" options={{title:'Inicio'}} component={HomeNavigator} />
      <TabAndroid.Screen name="TopTapCalendarNavigator" options={{title:'Calendario'}} component={TopTapCalendarNavigator} />
      <TabAndroid.Screen name="TopTapNotasNavigator" options={{title:'Notas'}} component={TopTapNotasNavigator} />
      <TabAndroid.Screen name="AgendaNavigator" options={{title:'Agenda'}} component={AgendaNavigator} />
      <TabAndroid.Screen name="TopTapProyNavigator" options={{title:'Proyectos'}} component={newProyectoNavigator} />
    </TabAndroid.Navigator>
  );
}


const TabIos = createBottomTabNavigator();
export const BottonTabNavigatorIos = ()=> {
  return (
    <TabIos.Navigator
    sceneContainerStyle={{
      backgroundColor:colors.blanco
    }}
    screenOptions={({route})=>({
      headerShown: false,
      tabBarActiveTintColor:colors.primary,
      tabBarStyle:{
        borderTopColor:colors.primary,
        borderTopWidth:1
      },
      tabBarLabelStyle:{
        fontSize:15
      },
      tabBarIcon:({color, focused,size})=>{
        let iconName:string = ' ';
        switch (route.name) {
          case 'HomeNavigator':
            iconName = 'planet-outline'
            break;
          case 'TopTapCalendarNavigator':
            iconName = 'calendar-outline'
            break;
          case 'TopTapNotasNavigator':
            iconName = 'checkbox-outline'
            break;
          case 'AgendaNavigator':
            iconName = 'book-outline'
            break;
          case 'TopTapProyNavigator':
            iconName = 'library-outline'
            break;
          default:
            break;
        }
        return <Icon name={iconName} size={25} color='white' />
      }
    })}
    
    >
      <TabIos.Screen name="HomeNavigator" options={{title:'Inicio'}} component={HomeNavigator} />
      <TabIos.Screen name="TopTapCalendarNavigator" options={{title:'Calendario'}} component={TopTapCalendarNavigator} />
      <TabIos.Screen name="TopTapNotasNavigator" options={{title:'Notas'}} component={TopTapNotasNavigator} />
      <TabIos.Screen name="AgendaNavigator" options={{title:'Agenda'}} component={AgendaNavigator} />
      <TabIos.Screen name="TopTapProyNavigator" options={{title:'Proyectos'}} component={newProyectoNavigator} />
    </TabIos.Navigator>
  );
}