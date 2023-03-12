import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors, stylesApp } from '../../../Themes/AppThemes';
import { useTareas } from '../../../Hooks/useTareas';
import { ActivityIndicator } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTarea } from '../../../Hooks/CalendarHooks/useTarea';
import { ListaMaterias } from '../../../Components/MateriasComponets/ListaMaterias';
import { useMaterias } from '../../../Hooks/HorarioHooks/useMaterias';
import RNPickerSelect from 'react-native-picker-select';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { SelectComp } from '../../../Components/GeneralComponets/SelectComp';
import RNDateTimePicker from '@react-native-community/datetimepicker';


interface Props extends StackScreenProps<any, any> { }
export const TareaScreen = ({ route, navigation }: Props) => {

  const { materias, getMateriasUser } = useMaterias();
  const [dataTare, setdataTare] = useState({})
  const [select, setselect] = useState("");
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Prioritario',
      value: '1'
    },
    {
      id: '2',
      label: 'Moderado',
      value: '2'
    },
    {
      id: '3',
      label: 'Relax',
      value: '3'
    }
  ]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateShow, setdateShow] = useState('dd/mm/yy')

  const [priori, onChangepriori] = React.useState('');

  const [titulo, onChangetitulo] = React.useState('');
  const [descrip, onChangedescrip] = React.useState('');


  const { tareas, isLoading } = useTareas();
  const { addTarea } = useTarea();


  let materiasListArray: any = []
  for (let i in materias) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    materiasListArray.push({ label: materias[i]._data.nombre, value: materias[i]._data.codMateria })

  }

  useEffect(() => {
    getMateriasUser()
  }, [])


  const selectedMat = (value: any) => {
    setselect(value)
  }
  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
    for (let opt in radioButtons) {
      if (radioButtons[opt].selected) {
        // @ts-ignore
        onChangepriori(radioButtons[opt].value)
      }
    }
  }
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(selectedDate.getMonth()+1);
    
    let mesText: number = selectedDate.getMonth() < 9 ? '0' + (selectedDate.getMonth()+1) : (selectedDate.getMonth()+1);
    let diaText: number = selectedDate.getDate() < 9 ? '0' + selectedDate.getDate() : selectedDate.getDate()
    setdateShow(diaText + '/' + mesText + '/' + selectedDate.getFullYear())
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const agrupInfoTareo = () => {
    const info = {
      'body': descrip,
      'fechaAlerta': date,
      'fechaEntrega': date,
      'materia': select,
      'prioridad': priori,
      'titulo': titulo,
    }
    setdataTare(dataTare => ({
      ...dataTare,
      ...info
    }));
    addTarea(info)
    onChangedescrip('')
    setDate(new Date)
    setselect('')
    onChangetitulo('')
  }




  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
      </View>
    )
  } else {
    return (
      <View style={stylesApp.globalMargin}>
        <Text style={stylesApp.titles}>Nueva Tarea</Text>

        <TextInput
          placeholder="Titulo"
          onChangeText={onChangetitulo}
        />

        <TextInput
          multiline={true}
          numberOfLines={10}
          placeholder="Descripcion"
          onChangeText={onChangedescrip}
        />
        <RNPickerSelect
          placeholder={{ label: "Selecciona una opcion", value: null }}
          onValueChange={(select) => selectedMat(select)}
          items={materiasListArray}
          style={pickerSelectStyles}
        />
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout={'row'}
        />
        <View>
          <Button onPress={showDatepicker} color={colors.primary} title={dateShow} />
        </View>
        {show && (
          <RNDateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            // @ts-ignore
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Button
          color={colors.primary}
          title='Agregar Tarea'
          onPress={() => {
            agrupInfoTareo();
            navigation.navigate('CalendarioScreen')
          }}
        ></Button>
      </View>
    )
  }

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
    backgroundColor: '#EAEAEA'
  }
});
