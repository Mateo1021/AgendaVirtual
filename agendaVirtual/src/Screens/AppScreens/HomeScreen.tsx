import { StackScreenProps } from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import { ActivityIndicator, Button, Dimensions, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TaskCard } from '../../Components/TaskCard';
import { useTareas } from '../../Hooks/useTareas';
import { colors, stylesApp } from '../../Themes/AppThemes';
import Carousel from 'react-native-snap-carousel';
import { usePuntaje } from '../../Hooks/usePuntaje';
import { PuntajeComp } from '../../Components/HomeComponets/PuntajeComp';
import { IdentitiCard } from '../../Components/HomeComponets/IdentitiCard';
import { useIdentification } from '../../Hooks/UserHooks/useIdentification';
import { infoUser } from '../../Hooks/UserHooks/infoUser';


interface Props extends StackScreenProps<any, any> {};
export const HomeScreen = ({ navigation, route }: Props) => {


const {getTareas,tareas,isLoading}=useTareas();
const{getPuntos,puntaje,isLoadingP} = usePuntaje();
const {info,getInfoUser} = useIdentification();

let dimencionSWind = (Dimensions.get('window').width) - 50;
useLayoutEffect(() => {
  getTareas()
}, [])
React.useEffect(() => {
  const focusHandler = navigation.addListener('focus', () => {
    getTareas();
  });
  return focusHandler;
}, [navigation]);


  if(isLoading){
    return (
      <View style={{flex: 1, justifyContent:'center', alignContent: 'center' }}>
        <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
      </View>
    )
  }
    return (
          <ScrollView style={{
            flex:1
          }}>
            <View  style={stylesApp.stylHome}>
              <View  style={stylesApp.styleCarruserHome}>
                <Carousel
                data={tareas}
                renderItem={({item}:any)=><TaskCard tarea={item}></TaskCard>}
                sliderWidth={400}
                itemWidth={dimencionSWind}
                />
              </View>
              <View  style={stylesApp.stylePuntajeHome}>
                <PuntajeComp
                puntaje={puntaje}
                ></PuntajeComp>
              </View>
              <View  style={stylesApp.styleidentitiHome}>
                <IdentitiCard
                infoUser={info}
                ></IdentitiCard>
              </View>
            </View>
          </ScrollView>
    )
  
}
