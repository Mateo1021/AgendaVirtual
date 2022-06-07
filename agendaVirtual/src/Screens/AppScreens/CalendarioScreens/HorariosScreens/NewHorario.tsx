import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import { stylesApp } from '../../../../Themes/AppThemes';
import {Picker} from '@react-native-picker/picker';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { AuthContext } from '../../../../Context/ContextUser/AuthContext';
import axios from 'axios';


import { initializeApp } from 'firebase/app';
import { getFirestore}  from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"


import firestore from '@react-native-firebase/firestore';



export const NewHorario = () => {


async function addMateria (){
try{
const user = await firestore().collection('Materias').doc('materias1').get();
console.log(user);


}catch(e){
console.log('error: '+e);

}
}

useEffect(() => {
  addMateria();
}, [])

const [selectedDay, setSelectedDay] = useState('lun');
const [date, setDate] = useState(new Date());
const [dateF, setDateF] = useState(new Date());
const [nMateria, setnMateria] = useState('');
const {authState} = useContext(AuthContext);
const Materia = {
  estudiante:'',
  day:'',
  materia:'',
  horaI:'',
  horaF:'',
}
  return (
    <View>
      <View>
        <Text style={stylesApp.titles}>Agregar nueva materia</Text>
        <TextInput 
        style={stylesApp.inputsMaterias}
        placeholder='Nombre asignatura'
        value={nMateria}
        onChangeText={(value) => setnMateria(value)}
        />
      </View>

      <View>
        <Picker
        style={{backgroundColor:'#cccc'}}
          selectedValue={selectedDay}
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)
          }>
          <Picker.Item label="Lunes" value="lun" />
          <Picker.Item label="Martes" value="mar" />
          <Picker.Item label="Miercoles" value="mier" />
          <Picker.Item label="Jueves" value="jue" />
          <Picker.Item label="Viernes" value="vie" />
          <Picker.Item label="Sabado" value="sab" />
          <Picker.Item label="Domingo" value="dom" />
        </Picker>
      </View>

      <View style={{
        flexDirection:'row',
        justifyContent:'flex-start'
      }}>
<DatePicker style={{margin:0, padding:0,flex:1}} mode='time' date={date} onDateChange={setDate} />
<DatePicker style={{margin:0, padding:0,flex:1}} mode='time' date={dateF} onDateChange={setDateF} />

      </View>

        <Button title='Agregar Materia'
        onPress={()=> 'sda' } 
        
        ></Button>
    </View>
  )
}
