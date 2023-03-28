import React from 'react'
import { ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { colors, stylesApp } from '../../Themes/AppThemes';

export const InputNotas = () => {


    const inputsGenerate = () =>{

    }


  return (
  
      <View style={{...stylesApp.inputGrup,
      flex: 3
      }}>
        <TextInput 
          placeholder='Correo' 
          style={stylesApp.generalText}
          placeholderTextColor = "#949494"
        ></TextInput>
      </View>

  )
}
