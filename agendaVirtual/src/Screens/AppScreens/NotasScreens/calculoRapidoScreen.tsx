import React from 'react'
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { InputNotas } from '../../../Components/NotasComponents/InputNotas';
import { colors, stylesApp } from '../../../Themes/AppThemes';
import RNPickerSelect from 'react-native-picker-select';

export const calculoRapidoScreen = () => {

  const [numTextInputs,setNumTextInputs] = React.useState(0);

  return (
    <ScrollView>
    <SafeAreaView style={{justifyContent:'flex-end'}}>
      <View >
      <Text style={stylesApp.generalText}> Periodos </Text>
      <RNPickerSelect
            placeholder={{ label: "Selecciona una opcion", value: null }}
            onValueChange={(select) => console.log(select)}
            items={[{ label: "1", value: 1 },{ label: "2", value: 2 },{ label: "3", value: 3 },{ label: "4", value: 4 },{ label: "5", value: 5 }]}
            style={pickerSelectStyles}
        />


      <View style={styles.parent}>
        {/* Button */}
        <TouchableOpacity onPress={()=>setNumTextInputs(val=>val+1)} style={styles.buttton}>
              <Text style={styles.text}> Agregar nota </Text>
        </TouchableOpacity>
        <ScrollView style={{flex:1}} >
              {[...Array(numTextInputs).keys()].map(key=>{
                return(
                <View style={styles.inputContainer}>
                  <View>
                    <Text style={stylesApp.generalText}>Nota</Text>
                    <TextInput  key={'vl'+key} style={styles.styleinput}/>
                  </View>
                  <View>
                    <Text style={stylesApp.generalText}>%</Text>
                    <TextInput  key={'por'+key}  style={styles.styleinput}/>
                  </View>
                </View>
                ) 
              })}
        </ScrollView>
        <TouchableOpacity onPress={()=>setNumTextInputs(val=>val-1)} style={styles.buttton}>
              <Text style={styles.text}> Eliminar nota</Text>
        </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttton}>
          <Text style={styles.text}>Calcular</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  parent:{flex:1,justifyContent:"center",alignItems:"center"},
  textInput:{
    color:'black',
    alignItems:'center',
  },
  buttton:{
    alignItems:'center',
    borderWidth:1,
    borderColor:colors.blanco,
    backgroundColor: colors.primary,
    height:35,
    width:300,
    marginTop:50
  },
  text:{
    color:'white',
    alignItems:'center',
    paddingTop:5
  },
  styleinput:{
    width:100,
    height:37,
    borderColor:"black",
    margin:10,
    borderWidth:1,
    color:'black'
  },
  inputContainer:{
    flex: 1,
    flexDirection: 'row'
  }
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor:'#EAEAEA'
  }
  });