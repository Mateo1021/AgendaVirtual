import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Platform, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
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
import { generalFunctions } from '../../../core/generalFunctions';
import { LocaleConfig } from 'react-native-calendars';
interface Props extends StackScreenProps<any, any> { }

export const EditTareaScreen = ({ route, navigation }: Props) => {
  // @ts-ignore
  let dataTarea = route.params.codTarea._data;
  const { parseDate } = generalFunctions()
  let dateTareaRoute = 1000 * Number(dataTarea.fechaEntrega.seconds)

  const [select, setselect] = useState(dataTarea.materia);
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Prioritario',
      value: '1',
      selected: dataTarea.prioridad == "1" ? true : false
    },
    {
      id: '2',
      label: 'Moderado',
      value: '2',
      selected: dataTarea.prioridad == "2" ? true : false
    },
    {
      id: '3',
      label: 'Relax',
      value: '3',
      selected: dataTarea.prioridad == "3" ? true : false
    }
  ]);
  const [date, setDate] = useState(new Date(dateTareaRoute));

  
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateShow, setdateShow] = useState(parseDate(dataTarea.fechaEntrega.seconds))
  const [priori, onChangepriori] = React.useState('');

  const [titulo, onChangetitulo] = React.useState(dataTarea.titulo);
  const [descrip, onChangedescrip] = React.useState(dataTarea.body);


  const { materias } = useMaterias();

  const { updateTarea, delet } = useTarea();


  let materiasListArray: any = []
  for (let i in materias) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    materiasListArray.push({ label: materias[i]._data.nombre, value: materias[i]._data.codMateria })

  }

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


    let mesText: number = selectedDate.getMonth() <= 9 ? '0' + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
    let diaText: number = selectedDate.getDate() <= 9 ? '0' + selectedDate.getDate() : selectedDate.getDate()
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
      'codTarea': dataTarea.codTarea
    }

    updateTarea(info);

    onChangedescrip('')
    setDate(new Date)
    setselect('')
    onChangetitulo('')
  }

  const deletTarea = () => {

    delet(dataTarea.codTarea);
    onChangedescrip('')
    setDate(new Date)
    setselect('')
    onChangetitulo('')
  }



  return (
    <ScrollView>
      <View style={stylesApp.globalMargin}>
        <Text style={stylesApp.titles}>Editar Tarea</Text>

        <Text style={styles.textLabel}>Titulo</Text>
        <TextInput
          style={styles.textTitel}
          placeholder="Nueva Tarea"
          onChangeText={onChangetitulo}
          value={titulo}
        />
        <Text style={styles.textLabel}>Descripcion</Text>
        <TextInput
          style={styles.textBody}
          multiline={true}
          numberOfLines={10}
          placeholder="Hacer informe"
          onChangeText={onChangedescrip}
          value={descrip}
        />
        <RNPickerSelect
          placeholder={{ label: "Selecciona una opcion", value: null }}
          onValueChange={(select) => selectedMat(select)}
          items={materiasListArray}
          style={pickerSelectStyles}
          value={select}
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
        <View style={styles.viewBtn}>
          <View style={styles.btnAdd}>
            <Button
              color={colors.primary}
              title='Editar Tarea'
              onPress={() => {
                agrupInfoTareo();
                navigation.goBack();
              }}
            ></Button>
          </View>
          <View style={styles.btnDel}>
            <Button
              color={colors.secundary}
              title='Eliminar'
              onPress={() => {
                deletTarea();
                navigation.goBack();
              }}
            ></Button>
          </View>
        </View>
      </View>
    </ScrollView>
  )


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitel: {
    borderBottomWidth: 1,
  },
  textBody: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#EAEAEA'
  },
  textLabel: {
    paddingTop: 40,
    fontWeight: 'bold'
  },
  viewBtn: {
    flexDirection: 'row',
    paddingVertical: 30,
    justifyContent: 'center',
  },
  btnAdd: {
    paddingHorizontal: 8
  },
  btnDel: {
    paddingHorizontal: 8
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
