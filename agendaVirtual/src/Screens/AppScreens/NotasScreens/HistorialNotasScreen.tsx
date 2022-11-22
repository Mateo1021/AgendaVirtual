import React from 'react'
import { Button, Text, View } from 'react-native'
import { colors, stylesApp } from '../../../Themes/AppThemes'

export const HistorialNotasScreen = () => {
  return (
    <View>
        <Text style={stylesApp.titles}>HistorialNotasScreasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddensssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</Text>
        <Button 
            color={colors.primary}
            title='Editar'
            onPress={()=>console.log('sd')}
          ></Button>
    </View>
  )
}
