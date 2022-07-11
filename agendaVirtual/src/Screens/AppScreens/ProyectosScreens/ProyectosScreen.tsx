import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { stylesApp } from '../../../Themes/AppThemes';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { colors } from '../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any, any> {};


export const ProyectosScreen = ({ navigation }: Props) => {
  const {authState} = useContext(AuthContext)
  return(

    <View style={{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
      
    }}>
        <Text style={{
          ...stylesApp.generalText,
          marginBottom:20,
        }}>Aun no tiene ningun horario reguistrado</Text>
        <Button 
          color={colors.primary}
          title='Buscar Curso'
          onPress={()=>navigation.navigate('lookProyectoScreen')}
        ></Button>
    </View>

  )

}