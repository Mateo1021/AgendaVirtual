import React, { useState } from 'react'
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { InputNotas } from '../../../Components/NotasComponents/InputNotas';
import { colors, stylesApp } from '../../../Themes/AppThemes';
import RNPickerSelect from 'react-native-picker-select';

export const calculoRapidoScreen = () => {

  const [nota1, setnota1] = useState('0')
  const [nota1Show, setnota1Show] = useState('')
  const [nota2, setnota2] = useState('0')
  const [nota2Show, setnota2Show] = useState('')
  const [nota3, setnota3] = useState('0')
  const [nota3Show, setnota3Show] = useState('')
  const [nota4, setnota4] = useState('0')
  const [nota4Show, setnota4Show] = useState('')

  const validNumber1 = (val: string) => {
    const regexMayus = /[a-zA-Z]/g;
    if (val.search(regexMayus) !== -1) {
      setnota1Show('')
    } else {
      setnota1(val)
      setnota1Show(val)
    }
  }
  const validNumber2 = (val: string) => {
    const regexMayus = /[a-zA-Z]/g;
    if (val.search(regexMayus) !== -1) {
      setnota2Show('')
    } else {
      setnota2(val)
      setnota2Show(val)
    }
  }
  const validNumber3 = (val: string) => {
    const regexMayus = /[a-zA-Z]/g;
    if (val.search(regexMayus) !== -1) {
      setnota3Show('')
    } else {
      setnota3(val)
      setnota3Show(val)
    }
  }
  const validNumber4 = (val: string) => {
    const regexMayus = /[a-zA-Z]/g;
    if (val.search(regexMayus) !== -1) {
      setnota4Show('')
    } else {
      setnota4(val)
      setnota4Show(val)
    }
  }

  const [notaActual, setnotaActual] = useState('')
  const [notaMini, setnotaMini] = useState('')
  const [notaExe, setnotaExe] = useState('')
  const [notaPerf, setnotaPerf] = useState('')

  const [notaEspef, setnotaEspef] = useState('')

  const calNotas = () => {

    let sumaNotas = Number(nota1) + Number(nota2) + Number(nota3)
    if (sumaNotas > 0) {
      let notasDiv = sumaNotas / 3;
      setnotaActual(notasDiv.toFixed(2).toString());

      let notasMinimas = {
        '1': 9.9,
        '2': 12,
        '3': 13.5
      }

      let notaMin = notasMinimas[1] - sumaNotas;
      if(notaMin>5){
        setnotaMini('algo imposible :c ')
      }else{
        setnotaMini(notaMin.toFixed(2).toString());
      }

      let notaEx = notasMinimas[2] - sumaNotas;
      if(notaEx>5){
        setnotaExe('algo imposible :c ')
      }else{
        setnotaExe(notaEx.toFixed(2).toString());
      }

      let notaPerf = notasMinimas[3] - sumaNotas;
      if(notaPerf>5){
        setnotaPerf('algo imposible :c ')
      }else{        
        setnotaPerf(notaPerf.toFixed(2).toString());
      }
    }


  }
  const calValorEspecifico = () => {
    let sumaNotas = Number(nota1) + Number(nota2) + Number(nota3)
    if (sumaNotas > 0) {
      let valEpecif = Number(nota4) * 3
      let valorNec = valEpecif - sumaNotas;
      if (valorNec > 5) {
        setnotaEspef('con las notas que acabas de reguistra no te alzanza para sacar la nota deseada intenta con un valor mas bajo');
      }
      else{
        setnotaEspef('La nota que necesitas para sacar tu nota deseada es: '+valorNec.toFixed(2).toString());
      }

    }
  }
  const resetValores=()=>{
    setnota1Show('')
    setnota2Show('')
    setnota3Show('')
    setnota4Show('')

    setnotaActual('')
    setnotaMini('')
    setnotaExe('')
    setnotaPerf('')
    setnotaEspef('')
  }


  return (
    <ScrollView>
      <SafeAreaView style={{ justifyContent: 'flex-end' }}>
        <View>
          <View style={styles.parent}>
            <Text style={stylesApp.titles}>Calculo rapido de notas</Text>
            <View style={styles.containerNotas}>
              <TextInput keyboardType='numeric' style={styles.styleinput} value={nota1Show} onChangeText={(value) => validNumber1(value)} />
              <TextInput keyboardType='numeric' style={styles.styleinput} value={nota2Show} onChangeText={(value) => validNumber2(value)} />
              <TextInput keyboardType='numeric' style={styles.styleinput} value={nota3Show} onChangeText={(value) => validNumber3(value)} />
            </View>
            <View style={styles.containerMsj}>
              <Text>Nota: Ingresa las notas que tengas a la fecha, si dejas un espacio en blanco ese sera ignorado.</Text>
            </View>
            <TouchableOpacity
              onPress={() => calNotas()}
              style={styles.buttton}>
              <Text style={styles.text}>Calcular</Text>
            </TouchableOpacity>

            <View style={styles.containerResult}>
              <Text>
                La nota actual es de: {notaActual}
              </Text>
              <Text>
                La nota que necesitas para un 3 es: {notaMini}
              </Text>
              <Text>
                La nota que necesitas para un 4.5 es: {notaExe}
              </Text>
              <Text>
                La nota que necesitas para un 5 es: {notaPerf}
              </Text>
            </View>
            <Text style={stylesApp.titles}>Calcular nota</Text>
            <View style={styles.containerNotas}>
              <TextInput keyboardType='numeric' style={styles.styleinput} value={nota4Show} onChangeText={(value) => validNumber4(value)} />
            </View>
            <View style={styles.containerMsj}>
              <Text>Nota: Ingresa las nota que desas sacar.</Text>
            </View>
            <TouchableOpacity
              onPress={() => calValorEspecifico()}
              style={styles.buttton}>
              <Text style={styles.text}>Calcular</Text>
            </TouchableOpacity>
            <View style={styles.containerResult2}>
              <Text>
               {notaEspef}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => resetValores()}
              style={styles.buttton}>
              <Text style={styles.text}>Borrar datos</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20
  },
  textInput: {
    color: 'black',
    alignItems: 'center',
  },
  buttton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blanco,
    backgroundColor: colors.primary,
    height: 35,
    width: 300,
    marginTop: 20
  },
  text: {
    color: 'white',
    alignItems: 'center',
    paddingTop: 5
  },
  styleinput: {
    width: 50,
    height: 40,
    borderColor: "black",
    margin: 5,
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 18
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  containerNotas: {
    flexDirection: 'row',
    paddingTop: 10
  },
  containerMsj: {
    marginHorizontal: 20,
    paddingTop: 15
  },
  containerResult: {
    marginTop: 20,
    borderColor: "grey",
    borderWidth: 1,
    width: 300,
    height: 200,
  },
  containerResult2: {
    marginVertical: 20,
    borderColor: "grey",
    borderWidth: 1,
    width: 300,
    height: 100,
  }
})
