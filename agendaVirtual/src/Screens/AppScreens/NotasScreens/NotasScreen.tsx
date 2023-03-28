import React, { useEffect, useState, useLayoutEffect } from 'react'
import { stylesApp } from '../../../Themes/AppThemes'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor, Dimensions, ScrollView
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useCalificaciones } from '../../../Hooks/calificacionesHooks/useCalificaciones';
import RNPickerSelect from 'react-native-picker-select';
import { generalArray } from '../../../Context/ContexGeneralVar/generalArray';

export const NotasScreen = () => {
  const { tiposNotasArray } = generalArray();
  const { getInfoCalificaciones, getInfoCalificacionesbyMounth } = useCalificaciones();


  const [usetest, setusetest] = useState('second')
  const [labelArrayMate, setlabelArrayMate] = useState([])
  const [dataArrayMate, setdataArrayMate] = useState([])
  const [tipoSelect, settipoSelect] = useState(0)
  const [dataArrayMounth, setdataArrayMounth] = useState([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0])


  const selectTipo = (tipoSelect: any) => {
    settipoSelect(tipoSelect)
    callInfo(tipoSelect)
    callInfoMounth(tipoSelect)
  }

  const callInfo = async (type: number) => {
    /*     callInfoMounth(type) */
    setlabelArrayMate([])
    setdataArrayMate([])
    let info = await getInfoCalificaciones(type)
    let labelsArray: any = []
    let dataArray: any = []
    for (let idInfo in info) {
      labelsArray.push(info[idInfo][0])
      let arrayTemp = info[idInfo].splice(1);
      let total = arrayTemp.reduce((a: number, b: number) => a + b, 0);
      dataArray.push((total / arrayTemp.length).toFixed(2));
    }
    setlabelArrayMate(labelsArray)
    setdataArrayMate(dataArray)
  }

  const callInfoMounth = async (type: number) => {

    let info = await getInfoCalificacionesbyMounth(type)
    setdataArrayMounth(info)
  }

  function GraficMounth() {
    const dataByMounth = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "ago", "sep", "Oct", "Nov", "Dic"],
      datasets: [
        {
          data: dataArrayMounth
        }
      ]
    }
    return (
      <LineChart
        fromZero={true}
        data={dataByMounth}
        width={(Dimensions.get("window").width)-20} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    )
  }
  function RenderItem() {
    const dataByMatsRender = {
      labels: labelArrayMate,
      datasets: [
        {
          data: dataArrayMate
        }
      ]

    };

    return (
      <BarChart
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        data={dataByMatsRender}
        width={(Dimensions.get("window").width)-20}
        height={220}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        verticalLabelRotation={30}
      />
    )
  };



  useLayoutEffect(() => {
    callInfo(tipoSelect)
  }, [])




  const [test, settest] = useState('')

  return (
    <ScrollView>
      <View style={styles.generalCont}>
        <View style={styles.contTitel}>
          <Text style={styles.titulosNotas}>MODULO DE NOTAS</Text>
        </View>
        <Text style={styles.txtNotas}>Selecciona el tipo de calificacion</Text>
        <RNPickerSelect
          placeholder={{ label: "Selecciona una opcion", value: null }}
          onValueChange={(select) => selectTipo(select)}
          items={tiposNotasArray}
          style={pickerSelectStyles}
        />
        <View style={styles.contSubtitil}>
          <Text style={styles.txtNotasSub}>Grafica Promedios</Text>
        </View>
        <GraficMounth></GraficMounth>

        <View style={styles.contSubtitil}>
          <Text style={styles.txtNotasSub}>Grafica Notas por materia</Text>
        </View>
        <RenderItem></RenderItem>

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  },
  txtNotas: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  titulosNotas: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  contTitel: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  contSubtitil:{
    alignItems: 'center',
  },  
  txtNotasSub: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  generalCont:{
    marginHorizontal:10,
    marginBottom:10
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
    paddingRight: 30,
    marginVertical: 10
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
    backgroundColor: '#EAEAEA',
    marginVertical: 10

  },
});