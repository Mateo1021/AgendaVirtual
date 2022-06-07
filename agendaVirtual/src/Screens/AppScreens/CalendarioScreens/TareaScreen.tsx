import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, View } from 'react-native'
import { stylesApp } from '../../../Themes/AppThemes';

interface Props extends StackScreenProps<any,any>{}
export const TareaScreen = ({route,navigation}:Props) => {
  const params = route!.params
  return (
    <View style={stylesApp.globalMargin}>
        <Text style={stylesApp.titles}>Tarea / {params!.Materia}</Text>
        <Text style={stylesApp.generalText}>
          {JSON.stringify(params,null,4)}
        </Text>
    </View>
  )
}
