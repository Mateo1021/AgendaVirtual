import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Button, Dimensions, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { TaskCard } from '../../Components/TaskCard';
import { useTareas } from '../../Hooks/useTareas';
import { colors, stylesApp } from '../../Themes/AppThemes';
import Carousel from 'react-native-snap-carousel';


interface Props extends StackScreenProps<any, any> {};
export const HomeScreen = ({ navigation, route }: Props) => {


const {getTareas,tareas,isLoading}=useTareas();
let dimencionSWind = (Dimensions.get('window').width) - 50;

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

          <View >
            <Carousel
            data={tareas}
            renderItem={({item}:any)=><TaskCard tarea={item}></TaskCard>}
            sliderWidth={400}
            itemWidth={dimencionSWind}
            />
          </View>

    )
  
}
