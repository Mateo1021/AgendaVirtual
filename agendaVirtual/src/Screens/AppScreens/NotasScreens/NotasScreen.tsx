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

export const NotasScreen = () => {

  const { getInfoCalificaciones } = useCalificaciones();


  const [usetest, setusetest] = useState('second')
  const [labelArrayMate, setlabelArrayMate] = useState([])
  const [dataArrayMate, setdataArrayMate] = useState([])

  const callInfo = async () => {
    let info = await getInfoCalificaciones(6)
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

function GraficMounth(){  
  const dataByMounth = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "ago", "sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        data: [1.5, 4.5, 2.8, 5.0, 4.9, 4.3, 4.3, 4.3, 4.3, 4.3, 4.3, 4.3]
      }
    ]
  }
  return(
    <LineChart
    data={dataByMounth}
    width={Dimensions.get("window").width} // from react-native
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
  function RenderItem (){
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
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        data={dataByMatsRender}
        width={Dimensions.get("window").width}
        height={260}
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
    callInfo() 
  }, [])




  const [test, settest] = useState('')

  return (
    <ScrollView>
      <View>
        <Text style={stylesApp.titles}>Grafica Promedios</Text>
<GraficMounth></GraficMounth>

        <Text style={stylesApp.titles}>Grafica Notas por materia</Text>
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
  }
});