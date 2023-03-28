import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { PerfilScreen } from '../Screens/AppScreens/UsuarioScreens/PerfilScreen';
import { ConfigScreen } from '../Screens/ConfigScreen';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { stylesApp } from '../Themes/AppThemes';
import { BottonTabs } from './BottonTabNavigator';
import { StackNavigatorLogin } from './LoginNavigator/StackNavigatorLogin';

const Drawer = createDrawerNavigator();

export const MenuLateralNavigator = ()=> {
  return (
    <Drawer.Navigator
      drawerContent={(props)=><MenuInterno {...props}/>}
    >
      <Drawer.Screen name="Inicio" options={{title:'Agenda Virtual'}} component={BottonTabs} />
      <Drawer.Screen name="PerfilScreen"  options={{title:'Perfil'}} component={PerfilScreen} />
      <Drawer.Screen name="ConfigScreen" component={ConfigScreen} />
    </Drawer.Navigator>
  );
}

const MenuInterno = ({navigation}:DrawerContentComponentProps) =>{
  return(
    <DrawerContentScrollView>
      <View style={stylesApp.continerAvatar}>
        <Image
        source={{uri:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}}
        style={stylesApp.avatar}
        ></Image>
      </View>
      
      <View style={stylesApp.contBtnMenuLat}>
        <TouchableOpacity 
        style={stylesApp.btnMenuLat}
        onPress={()=> navigation.navigate('Inicio')}
        >
        <Text style={stylesApp.txtBtnMenuLat}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity         
        style={stylesApp.btnMenuLat}
        onPress={()=> navigation.navigate('PerfilScreen')}>
          <Text style={stylesApp.txtBtnMenuLat}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity         
        style={stylesApp.btnMenuLat}
        onPress={()=> navigation.navigate('ConfigScreen')}>
          <Text style={stylesApp.txtBtnMenuLat}>Configuracion</Text>
        </TouchableOpacity>

      </View>

    </DrawerContentScrollView>
  )
}