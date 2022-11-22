import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet} from 'react-native';
import {ListRenderItem} from 'react-native';
import { RefreshControl, ScrollView , TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { stylesApp } from '../../../Themes/AppThemes';
import { StackScreenProps } from '@react-navigation/stack';
import { useLookProyects } from '../../../Hooks/ProyectosHooks/useLookProyects';
import { ProyectoCard } from '../../../Components/proyectComponets/ProyectoCard';
import Carousel from 'react-native-snap-carousel';

//funciones tipo flecha
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
interface Props extends StackScreenProps<any, any> {};
export const lookProyectoScreen = ({ navigation, route }: Props) => {
  const {isLoading,proyectosArrayL,lookProyects}= useLookProyects()  

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    lookProyects()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      lookProyects()
    });
    return focusHandler;
  }, [navigation]);
  
    return (
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          
          <Carousel
            data={proyectosArrayL}
            renderItem={({item}:any)=><ProyectoCard pro={item}></ProyectoCard>}
            sliderWidth={400}
            itemWidth={300}
            />

      </ScrollView>
    </SafeAreaView>
    );
}

