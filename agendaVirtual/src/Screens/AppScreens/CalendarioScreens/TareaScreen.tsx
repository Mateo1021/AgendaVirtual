import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, View } from 'react-native'
import { colors, stylesApp } from '../../../Themes/AppThemes';
import { useTareas } from '../../../Hooks/useTareas';
import { ActivityIndicator } from 'react-native-paper';

interface Props extends StackScreenProps<any,any>{}
export const TareaScreen = ({route,navigation}:Props) => {
  const params = route!.params
  const {tareas, isLoading}=useTareas();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
if(isLoading){
  return (
    <View style={{flex: 1, justifyContent:'center', alignContent: 'center' }}>
      <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
    </View>
  )
}else{
  return (
    <View style={stylesApp.globalMargin}>
        <Text style={stylesApp.titles}>Tarea / {params!.Materia}</Text>
        <Text style={stylesApp.generalText}>
          {JSON.stringify(params,null,4)}
        </Text>
    </View>
  )
}

}
