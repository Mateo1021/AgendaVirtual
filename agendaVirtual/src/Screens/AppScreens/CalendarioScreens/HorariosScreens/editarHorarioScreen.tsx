import React from 'react'
import { Text, View,Button } from 'react-native'
import { colors } from '../../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any, any> {};
export const editarHorarioScreen = ({ navigation }: Props) => {
  return (
    <View>
        <Text>editarHorarioScreen</Text>
        <Button 
            color={colors.primary}
            title='Agregar Materias'
            onPress={()=>navigation.navigate('addMateriasScreen')}
          ></Button>
    </View>
  )
}
