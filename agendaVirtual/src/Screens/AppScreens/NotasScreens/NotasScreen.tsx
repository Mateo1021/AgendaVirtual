import React, { useState } from 'react'
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

export const NotasScreen = () => {

  const dataByMats = {
    labels: ["Calculo", "Quimica", "biologia", "Español", "Artes", "Fisica"],
    datasets: [
      {
        data: [1.5, 4.5, 2.8, 5.0, 4.9, 4.3]
      }
    ]
  };
  const dataByMounth ={
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "ago", "sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        data: [1.5, 4.5, 2.8, 5.0, 4.9, 4.3,4.3,4.3,4.3,4.3,4.3,4.3]
      }
    ]
  }
  const [test, settest] = useState('')

  return (
    <ScrollView>
      <View>
        <Text style={stylesApp.titles}>Grafica Promedios</Text>
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

        <Text style={stylesApp.titles}>Grafica Notas por materia</Text>

        <BarChart
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          data={dataByMats}
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