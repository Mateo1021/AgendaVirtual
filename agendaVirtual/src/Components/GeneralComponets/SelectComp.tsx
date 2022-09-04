import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { stylesApp } from '../../Themes/AppThemes';

export const SelectComp = ({options}:any) => {

    console.log(options);
    
    const [ select, setselect ] = useState("");

    return (
        <View style={styles.container}>

            <RNPickerSelect
                placeholder={{ label: "Selecciona una opcion", value: null }}
                onValueChange={(select) => setselect(select)}
                items={options}
                style={pickerSelectStyles}
            />
        </View>
    );
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