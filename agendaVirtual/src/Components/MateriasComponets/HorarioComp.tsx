import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { colors, stylesApp } from '../../Themes/AppThemes';
import { useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';






export const HorarioComp = (idHorario: any) => {

  const navigation = useNavigation();
  const [materias, setmaterias] = useState([])

  const [lunes, setlunes] = useState([])
  const [martes, setmartes] = useState([])
  const [miercoles, setmiercoles] = useState([])
  const [jueves, setjueves] = useState([])
  const [viernes, setviernes] = useState([])
  const [sabado, setsabado] = useState([])
  const [domingo, setdomingo] = useState([])

  useLayoutEffect(() => {
    var unsubscribe2 = firestore().collection("Materia").where("codHorario", "==", idHorario.idHorario)
      .onSnapshot((querySnapshot) => {
        var res: any = [];

        var lun: any = [];
        var mar: any = [];
        var mie: any = [];
        var jue: any = [];
        var vie: any = [];
        var sab: any = [];
        var dom: any = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().repet.length > 0) {
            for (let m in doc.data().repet) {
              switch (doc.data().repet[m].dia) {
                case 'Lunes':
                  lun.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })
                  break;
                case 'Martes':
                  mar.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })
                  break;
                case 'Miercoles':
                  mie.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })
                  break;
                case 'Jueves':
                  jue.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })
                  break;
                case 'Viernes':
                  vie.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })
                  break;
                case 'Sabado':
                  sab.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })
                  break;
                case 'Domingo':
                  dom.push({
                    horas: doc.data().repet[m],
                    materia: doc.data().nombre
                  })

                  break;

                default:
                  break;
              }
            }
            res.push(doc.data())
          }
        });
        setmaterias(res)
        setlunes(lun)
        setmartes(mar)
        setmiercoles(mie)
        setjueves(jue)
        setviernes(vie)
        setsabado(sab)
        setdomingo(dom)
        console.log(lun);

      });
    return unsubscribe2;
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.blockDay} >
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Lunes</Text></View>

        <View style={styles.columB}>
          {
            lunes.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.blockDay}>
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Martes</Text></View>

        <View style={styles.columB}>
          {
            martes.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.blockDay}>
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Miercoles</Text></View>

        <View style={styles.columB}>
          {
            miercoles.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.blockDay}>
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Jueves</Text></View>

        <View style={styles.columB}>
          {
            jueves.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.blockDay}>
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Viernes</Text></View>

        <View style={styles.columB}>
          {
            viernes.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.blockDay}>
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Sabado</Text></View>

        <View style={styles.columB}>
          {
            sabado.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={styles.blockDay}>
        <View style={styles.weekDay}><Text style={styles.weekDayTxt}>Domingo</Text></View>

        <View style={styles.columB}>
          {
            domingo.map((item, index) => (
              <View style={styles.columC}>
                <View>
                  <Icon name={'timer-outline'} size={25} color={colors.primary} />
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaI}</Text>
                  {/*@ts-ignore */}
                  <Text style={styles.txtHora}>{item.horas.horaF}</Text>
                </View>
                <View>
                  {/*@ts-ignore */}
                  <Text style={styles.txtBody}>{item.materia}</Text>
                </View>
              </View>
            ))
          }
        </View>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderColor: '#DEDEDE',
    borderTopWidth: 1,
    marginTop: 20
  },
  weekDay: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DEDEDE',
    paddingVertical: 20,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockDay: {
    flexDirection: 'row'
  },
  columB: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  columC: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    paddingLeft: 10
  },
  weekDayTxt: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18
  },
  txtHora: {
    padding: 10,
    color: 'black',
    fontSize: 15
  },
  txtBody: {
    paddingLeft: 30,
    color: 'black',
    fontSize: 15
  }
});