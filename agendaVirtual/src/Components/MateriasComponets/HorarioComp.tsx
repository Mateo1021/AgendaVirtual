import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
import WeeklyCalendar from 'react-native-weekly-calendar';
import { colors, stylesApp } from '../../Themes/AppThemes';

export const HorarioComp = () => {

        const sampleEvents = [
          { start: '2022-11-21 09:00:00', duration: '00:20:00', note: 'Español' },
          { 'start': '2022-11-21 08:00:00', 'duration': '00:20:00', 'note': 'Fisica' },
          { 'start': '2022-11-21 10:00:00', 'duration': '00:20:00', 'note': 'Ingles' },
          { 'start': '2022-11-22 11:00:00', 'duration': '00:20:00', 'note': 'Quimica' },
          { 'start': '2022-11-22 12:00:00', 'duration': '01:00:00', 'note': 'Artes' },
          { 'start': '2022-11-22 08:00:00', 'duration': '00:30:00', 'note': 'Religion' },
          { 'start': '2022-11-22 14:00:00', 'duration': '02:00:00', 'note': 'Calculo' },
          { 'start': '2022-11-22 19:00:00', 'duration': '01:00:00', 'note': 'edu Fisica' },
          { 'start': '2022-11-23 19:00:00', 'duration': '01:00:00', 'note': 'Ingles' },
          { 'start': '2022-11-24 19:00:00', 'duration': '01:00:00', 'note': 'Biologia' },
          { 'start': '2022-11-24 19:00:00', 'duration': '01:00:00', 'note': 'Informatica' },
          { 'start': '2022-11-24 19:00:00', 'duration': '01:00:00', 'note': 'Español' },
          { 'start': '2022-11-24 19:00:00', 'duration': '01:00:00', 'note': 'Fisica' },
          { 'start': '2022-11-24 19:00:00', 'duration': '01:00:00', 'note': 'Quimica' },
          { 'start': '2022-11-25 19:00:00', 'duration': '01:00:00', 'note': 'Edu fisica' },
          { 'start': '2022-11-25 19:00:00', 'duration': '01:00:00', 'note': 'Calculo' },
          { 'start': '2022-11-25 19:00:00', 'duration': '01:00:00', 'note': 'Musica' },
          { 'start': '2022-11-25 19:00:00', 'duration': '01:00:00', 'note': 'Artes' },
          { 'start': '2022-11-25 19:00:00', 'duration': '01:00:00', 'note': 'Biologia' },
          { 'start': '2022-11-26 19:00:00', 'duration': '01:00:00', 'note': 'Contabilidad' },
          { 'start': '2022-11-26 19:00:00', 'duration': '01:00:00', 'note': 'Gestion de proyectos' },
          { 'start': '2022-11-26 19:00:00', 'duration': '01:00:00', 'note': 'PPP' }
        ]

        let date = new Date();

        let usDate = date.toLocaleString("en-US", {timeZone: "America/New_York"});
        console.log(usDate);




  return (
        <View style={styles.container}>
          <WeeklyCalendar events={sampleEvents} style={{ height: 600,backgroundColor: 'black', color:'blue'}} titleStyle={{color:'black'}}  locale='es' themeColor = {colors.primary}/>
        </View>

  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'withe',
      alignItems: 'center',
      justifyContent: 'center',
      fontStyle:{
        color:'black'
      }
    }
  });