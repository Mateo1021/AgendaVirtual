import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
import WeeklyCalendar from 'react-native-weekly-calendar';
import { colors, stylesApp } from '../../Themes/AppThemes';

export const HorarioComp = () => {

        const sampleEvents = [
          { 'start': '2022-08-29 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
          { 'start': '2022-08-29 08:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
          { 'start': '2022-08-29 10:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
          { 'start': '2022-08-29 11:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
          { 'start': '2022-08-30 12:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
          { 'start': '2022-08-31 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
          { 'start': '2022-09-01 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
          { 'start': '2022-09-02 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
          { 'start': '2022-09-03 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
          { 'start': '2022-09-04 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
        ]

        let date = new Date();

        let usDate = date.toLocaleString("en-US", {timeZone: "America/New_York"});
        console.log(usDate);




  return (
        <View style={styles.container}>
          <WeeklyCalendar events={sampleEvents} style={{ height: 400 }}  locale='es' themeColor = {colors.primary}/>
        </View>

  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });