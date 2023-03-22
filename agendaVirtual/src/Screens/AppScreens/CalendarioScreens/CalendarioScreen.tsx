import { useNavigation } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import { grey100, grey700, red300 } from 'react-native-paper/lib/typescript/styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import defineLocale from '../../../core/defineLocale';
import { useTareas } from '../../../Hooks/useTareas';
import { colors } from '../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jul', 'Jul.', 'Agos', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'sabado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vie.', 'sab.']
};

LocaleConfig.defaultLocale = 'es';

export const CalendarioScreen = () => {

  const navigation = useNavigation();
  const { authState } = useContext(AuthContext);

  function toDateTime(secs: any) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };



  const [tareasGet, settareasGet] = useState({});


  useLayoutEffect(() => {
    var unsubscribe = firestore().collection("Tareas").where("cudUser", "==", authState.uid)
      .onSnapshot((querySnapshot) => {
        var items: any = {};
        querySnapshot.forEach((doc) => {
          let count = 0;
          const nDnate = toDateTime(doc.data().fechaEntrega.seconds);
          const strTime: any = timeToString(nDnate);

          if (!items[strTime]) {

            items[strTime] = [];

            items[strTime].push({

              name: doc.data().titulo,

              id: doc.data().codTarea,

              data: doc
            });
          } else {

            for (let t in items[strTime]) {

              if (items[strTime][t].id == doc.data().codTarea) {
                count++;
              }

            }
            // @ts-ignore
            if (!count > 0) {
              // @ts-ignore
              items[strTime].push({
                name: doc.data().titulo,
                id: doc.data().codTarea,
                data: doc
              });
            }
          }

        });
        settareasGet(items)
      });


    return unsubscribe;
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={tareasGet}
        /* selected={'2023-03-21'} */
        pastScrollRange={50}
        futureScrollRange={50}
        renderItem={(item, firstItemInDay) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('EditTareaScreen',
                  {
                    // @ts-ignore
                    codTarea: item.data
                  }
                )
              }}

              style={{ marginRight: 10, marginTop: 17 }}>
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{
                      color: 'black'
                    }}>{item.name}</Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        }}
        renderEmptyData={() => {
          return <View style={styles.notFountEvent}><Text style={styles.notFountEventsTxt}>Aun no tienes eventos para esta fecha</Text></View>;
        }}
      />
      <Button
        color={colors.primary}
        title='Agregar nuevo evento'
        // @ts-ignore
        onPress={() => navigation.navigate('TareaScreen')}
      ></Button>
    </View>
  );

}

const styles = StyleSheet.create({
  notFountEvent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  notFountEventsTxt: {
    fontSize: 20
  }
})