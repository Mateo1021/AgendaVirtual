import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { stylesApp } from '../../../Themes/AppThemes';

interface Props extends StackScreenProps<any, any> {};

export const AgendaScreen = ({ navigation }: Props) => {
  return (
    <View>
      <View style={{
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 150
          }}
          onPress={() => navigation.navigate('newNoteScreen')}
        >
          <Text style={stylesApp.titles}>Nueva Nota</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
