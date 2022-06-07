import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native'
import { AuthContext } from '../../../Context/ContextUser/AuthContext';

export const CalendarioScreen = () => {
  const {authState} = useContext(AuthContext)
  return (
    <View>
        <Text>Calendatrios</Text>
    </View>
  )
}
