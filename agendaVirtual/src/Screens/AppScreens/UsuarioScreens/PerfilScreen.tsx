import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../../../Context/ContextUser/AuthContext'
import { stylesApp } from '../../../Themes/AppThemes'

export const PerfilScreen = () => {


  const { authState } = useContext(AuthContext);


  return (
    <View style={stylesApp.globalMargin}>
        <Text style={stylesApp.titles}> Perfil</Text>
        <Text style={stylesApp.generalText}>{JSON.stringify(authState,null,4)}</Text>
    </View>
  )
}
