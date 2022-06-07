import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { stylesApp } from '../../Themes/AppThemes';

interface Props extends StackScreenProps<any, any> {};

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScrollView>
    <View style={stylesApp.globalMargin}>

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
            paddingTop: 80
          }}
          onPress={() => navigation.navigate('TareaScreen', {
            Materia: 'Biologia',
            Fecha: '21-04-2022',
            Dificultad: 'Alta',
          })}
        >
          <Text style={stylesApp.titles}>Tarea</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 150
          }}
          onPress={() => navigation.navigate('PerfilScreen')}
        >
          <Text style={stylesApp.titles}>Perfil</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 150
          }}
          onPress={() => navigation.navigate('RankingScreen')}
        >
          <Text style={stylesApp.titles}>Medallas</Text>
        </TouchableOpacity>
      </View>

    </View>
    </ScrollView>
  )
}
