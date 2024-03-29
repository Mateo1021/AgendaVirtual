import React, { useLayoutEffect, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { stylesApp, colors } from '../../../../Themes/AppThemes';
import { SelectComp } from '../../../../Components/GeneralComponets/SelectComp';
import { useNavigation } from '@react-navigation/core';
import { useMateriasList } from '../../../../Hooks/HorarioHooks/useMateriasList';
import { useMaterias } from '../../../../Hooks/HorarioHooks/useMaterias';

import Carousel from 'react-native-snap-carousel';
import { PickerHora } from '../../../../Components/MateriasComponets/PickerHora';
import { useAddHorario } from '../../../../Hooks/HorarioHooks/useAddHorario';
import { ScrollView } from 'react-native-gesture-handler';



export const viewHorarioScreen = () => {
    let diasSeman = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miercoles', value: 'Miercoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' },
        { label: 'Sabado', value: 'Sabado' },
        { label: 'Domingo', value: 'Domingo' }
    ]

    const navigation = useNavigation();
    const { materias } = useMaterias();

    let materiasListArray: any = []
    const [materiasList, setmateriasList] = useState([])
    for (let i in materias) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        materiasListArray.push({ label: materias[i]._data.nombre, value: materias[i]._data.nombre })
    }


    const [select, setselect] = useState("");
    const [selectDia, setselectDia] = useState("");

    return (
        <ScrollView>
            <View style={styles.generalContainer}>
                <View style={styles.contTitel}>
                <Text style={stylesApp.titles}>CONFIGURAR HORARIO</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{color:'black'}}>Selecciona la materia</Text>
                    <RNPickerSelect
                        placeholder={{ label: "Selecciona una opcion", value: null }}
                        onValueChange={(select) => setselect(select)}
                        items={materiasListArray}
                        style={pickerSelectStyles}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={{color:'black'}}>Selecciona el dia</Text>
                    <RNPickerSelect
                        placeholder={{ label: "Selecciona una opcion", value: null }}
                        onValueChange={(selectD) => setselectDia(selectD)}
                        items={diasSeman}
                        style={pickerSelectStyles}
                    />
                </View>

                <PickerHora
                    materia={select}
                    dia={selectDia}
                ></PickerHora>



            </View>
        </ScrollView>

    )




}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    generalContainer: {
        padding: 10
    },
    contTitel:{
       alignItems:'center'
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
        backgroundColor: '#EAEAEA'
    }
});

