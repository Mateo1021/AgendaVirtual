import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { stylesApp } from '../../Themes/AppThemes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export const ListaMaterias = ({materias}:any) => {
  const navigation = useNavigation();
  return (
/*     <TouchableOpacity
    //@ts-ignore
    onPress={()=>navigation.navigate('editMateriaScreen',{
      idMateria: materias._data.codMateria
    })}> */
    <View style={styles.containerGen}>
        <Text style={styles.txtMateria}>
            {materias._data.nombre}
        </Text>
    </View>
/*     </TouchableOpacity> */
  )
}

const styles = StyleSheet.create({
  containerGen: {
    borderColor: '#DEDEDE',
    borderBottomWidth:1,
    shadowColor: '#404040',  
    paddingHorizontal:30,
    paddingVertical:20,
    backgroundColor:'white'
  },
  txtMateria:{
fontSize:20,
color:'black'
  }
});
