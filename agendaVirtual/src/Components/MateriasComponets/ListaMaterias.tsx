import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { stylesApp } from '../../Themes/AppThemes';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ListaMaterias = ({materias}:any) => {

  return (
    <TouchableOpacity>
    <View style={styles.containerGen}>
        <Text style={styles.txtMateria}>
            {materias._data.nombre}
        </Text>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerGen: {
    borderColor: '#DEDEDE',
    borderWidth: 1,
    marginVertical:5,
    marginHorizontal:15,
    padding:10,
    shadowColor: '#404040',  
    elevation: 2,  
  },
  txtMateria:{
fontSize:20,
color:'black'
  }
});
