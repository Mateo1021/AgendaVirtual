import React, { useLayoutEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { stylesApp, colors } from '../../../../Themes/AppThemes';
import { SelectComp } from '../../../../Components/GeneralComponets/SelectComp';
import { useNavigation } from '@react-navigation/core';
import { useMateriasList } from '../../../../Hooks/HorarioHooks/useMateriasList';
import { useMaterias } from '../../../../Hooks/HorarioHooks/useMaterias';

import Carousel from 'react-native-snap-carousel';
import { PickerHora } from '../../../../Components/MateriasComponets/PickerHora';



export const viewHorarioScreen = () => {
let diasSeman=['lunes','martes','miercoles','jueves','viernes','sabado','domingo']

const navigation = useNavigation();

const {materias} = useMaterias()

let materiasListArray:any=[]
const [materiasList, setmateriasList] = useState([])
for(let i in materias){
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  materiasListArray.push({label: materias[i]._data.nombre , value:materias[i]._data.nombre})
  } 


const [ select, setselect ] = useState("");

return (
  <View>
    <View style={styles.container}>
        <RNPickerSelect
            placeholder={{ label: "Selecciona una opcion", value: null }}
            onValueChange={(select) => setselect(select)}
            items={materiasListArray}
            style={pickerSelectStyles}
        />
    </View>
<Text style={stylesApp.titles}>hola</Text>
    <Carousel
            data={diasSeman}
            renderItem={({item}:any)=><PickerHora dias={item} ></PickerHora>}
            sliderWidth={400}
            itemWidth={300}
            />

    </View>

)




}


const styles = StyleSheet.create({
container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
}
});

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

