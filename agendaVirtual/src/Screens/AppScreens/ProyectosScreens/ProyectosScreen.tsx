import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useProyectos } from '../../../Hooks/ProyectosHooks/useProyectos';
import { useRemovePro } from '../../../Hooks/ProyectosHooks/useRemovePro';

import { stylesApp, colors } from '../../../Themes/AppThemes';
import Timeline from 'react-native-timeline-flatlist'
import { useGetEventos } from '../../../Hooks/ProyectosHooks/useGetEventos';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props extends StackScreenProps<any, any> { };

let dataUserGlobal: any;
let codCoursGlob: any;

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProyectosScreen = ({ navigation }: Props) => {

  const { getEvents } = useGetEventos()

  getEvents()
  let data = [
    { time: 'jun - 03', title: 'Event 1', description: 'Event 1 Description' },
    { time: 'jun - 03', title: 'Event 2', description: 'Event 2 Description' },
    { time: 'jun - 03', title: 'Event 3', description: 'Event 3 Description' },
    { time: 'jun - 03', title: 'Event 4', description: 'Event 4 Description' },
    { time: 'jun - 03', title: 'Event 5', description: 'Event 5 Description' }
  ]




  const { idCursoDB, getidProyects, proyectosArray, isLoading } = useProyectos();
  const { removePro } = useRemovePro();

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getidProyects();
  }, []);


  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getidProyects();

    });
    return focusHandler;
  }, [navigation]);


  function removerCurso() {

    removePro();
    navigation.navigate('HomeScreen')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let idCours = proyectosArray.codCurso;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let nombreCours = proyectosArray.nombreCurso;
  let proyectosArrayL = proyectosArray;

  const [dataTimeLine, setdataTimeLine] = useState([])

  const formatDate = (date: Date) => {
    let meses = ['ene', 'feb', 'marz', 'abri', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    // @ts-ignore
    let secondsToDate = (date.seconds) * 1000;
    let dateF = new Date(secondsToDate);
    let datePrint = meses[dateF.getMonth()] + " - " + dateF.getDate();
    return datePrint
  }
  useLayoutEffect(() => {
    var unsubscribe = firestore().collection("evento").orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        var msj: any = [];
        querySnapshot.forEach((doc) => {
          // @ts-ignore

          // @ts-ignore
          msj.push(
            {
              time: formatDate(doc.data().createdAt),
              description: doc.data().body,
              title: doc.data().titulo,
            }
          );

        });


        setdataTimeLine(msj)
      });

    return unsubscribe;

  }, []);
  function LineTimeRender() {


    return (

      <Timeline
        data={dataTimeLine}
        circleSize={20}
        circleColor={colors.primary}
        lineColor={colors.secundary}
        timeContainerStyle={{ minWidth: 52, marginTop: 5 }}
        timeStyle={{ textAlign: 'center', backgroundColor: colors.secundary, color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: 'black' }}
        isUsingFlatlist={true}
        titleStyle={{ color: 'black' }}
      />

    )
  }

  console.log(proyectosArray);

  if (idCours == undefined || idCours == '0') {
    idCours = '0';
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
      </View>
    )
  } else {

    if (idCours == '0') {
      return (

        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'

        }}>
          <Text style={{
            ...stylesApp.generalText,
            marginBottom: 20,
          }}>Aun no tiene ningun curso reguistrado</Text>
          <Button
            color={colors.primary}
            title='Buscar Curso'
            onPress={() => navigation.navigate('lookProyectoScreen')}
          ></Button>
        </View>

      )
    } else {
      return (

        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            <View>
              <View style={styles.containerTitel}>
              <Text style={stylesApp.titles}> {nombreCours}</Text>
              </View>
              <View style={styles.containerGen}>
                <Image
                  style={{ width: 370, height: 150 }}
                  //@ts-ignore
                  source={{ uri: proyectosArray.banerCurso }}
                />
              </View>

              <View style={styles.lineTimeContend}>
                <LineTimeRender></LineTimeRender>
              </View>

              <View style={styles.generalBtn}>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForoScreen', {
                      idForo: idCours,
                    })}
                    style={styles.btn}
                  >
                    <Icon name={'chatbubbles-outline'} size={25} color='#fff' />
                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForoDocenteScreen', {
                      idForo: idCours,
                    })}
                    style={styles.btn}
                  >
                    <Icon name={'easel-outline'} size={25} color='#fff' />
                  </TouchableOpacity>

{/*                 </View>

                <View style={styles.btnContainer}> */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('infoCursoScreen')}
                    style={styles.btn}
                  >
                    <Icon name={'information-circle-outline'} size={25} color='#fff' />
                  </TouchableOpacity>



                  <TouchableOpacity
                    onPress={() => removerCurso()}
                    style={styles.btn}
                  >
                    <Icon name={'exit-outline'} size={25} color='#fff' />
                  </TouchableOpacity>
                </View>
              </View>


            </View>

          </ScrollView>
        </SafeAreaView>
      )
    }
  }


}
const styles = StyleSheet.create({
  containerGen: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  lineTimeContend: {
    marginLeft: 30
  },
  btnContainer: {
    flexDirection: 'row'
  },
  generalBtn:{
    alignItems:'center'
  },
  btn:{
    backgroundColor:colors.primary,
    marginHorizontal:15,
    marginVertical:10,
    padding:15
  },
  containerTitel:{
    alignItems:'center'
  }
});