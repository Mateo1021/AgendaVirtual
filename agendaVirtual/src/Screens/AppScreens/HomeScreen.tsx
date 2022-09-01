import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Button, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { TaskCard } from '../../Components/TaskCard';
import { useTareas } from '../../Hooks/useTareas';
import { colors, stylesApp } from '../../Themes/AppThemes';
import Carousel from 'react-native-snap-carousel';



export const HomeScreen = () => {


  const {tareas,isLoading}=useTareas();


  if(isLoading){
    return (
      <View style={{flex: 1, justifyContent:'center', alignContent: 'center' }}>
        <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
      </View>
    )
  }
    return (

          <View >
            <Carousel
            data={tareas}
            renderItem={({item}:any)=><TaskCard tarea={item}></TaskCard>}
            sliderWidth={350}
            itemWidth={200}
            />
          </View>

    )
  
}
