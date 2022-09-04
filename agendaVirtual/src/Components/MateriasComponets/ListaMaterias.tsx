import React from 'react'
import { Text, View } from 'react-native';
import { stylesApp } from '../../Themes/AppThemes';

export const ListaMaterias = ({materias}:any) => {

  return (
    <View>
        <Text style={stylesApp.titles}>
            {materias._data.nombre}
        </Text>
    </View>
  )
}
