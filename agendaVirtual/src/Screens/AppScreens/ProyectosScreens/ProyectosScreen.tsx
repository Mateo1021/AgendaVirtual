import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useProyectos } from '../../../Hooks/ProyectosHooks/useProyectos';
import { useRemovePro } from '../../../Hooks/ProyectosHooks/useRemovePro';

import { stylesApp, colors } from '../../../Themes/AppThemes';
import Timeline from 'react-native-timeline-flatlist'
import { useGetEventos } from '../../../Hooks/ProyectosHooks/useGetEventos';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProyectContext } from '../../../Context/ContextProyecto/ProyectContext';
import { generalArray } from '../../../Context/ContexGeneralVar/generalArray';
import { LineTimeComp } from '../../../Components/proyectComponets/LineTimeComp';


interface Props extends StackScreenProps<any, any> { };

let dataUserGlobal: any;
let codCoursGlob: any;

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProyectosScreen = ({ navigation,route }: Props) => {
  

  const {idCoursGeneral,addCours} =generalArray()

  const { getEvents } = useGetEventos()
  getEvents()
  const [modalVisible, setModalVisible] = useState(false);
  const [passRemove, setpassRemove] = useState('')

  const { idCursoDB, getidProyects, proyectosArray, isLoading } = useProyectos();
  const { removePro } = useRemovePro();

  const [refreshing, setRefreshing] = React.useState(false);


  const [refreshFlag, setrefreshFlag] = useState({})
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getidProyects();
    setrefreshFlag('')
  }, []);


  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getidProyects();

    });
    return focusHandler;
  }, [navigation]);

  function showModal() {
    setModalVisible(true)
  }
  
  
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let idCours = proyectosArray.codCurso;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let nombreCours = proyectosArray.nombreCurso;
  let proyectosArrayL = proyectosArray;
  
  function RemoverCurso() {
    //@ts-ignore
    if (passRemove == proyectosArray.ClaveDSalida) {
//@ts-ignore
      removePro(proyectosArray.codCurso,proyectosArray.cantEstudiantes);
      navigation.navigate('HomeScreen')
    } else {
      Alert.alert(
        'Clave incorrecta',
      )
    }

    setModalVisible(!modalVisible)
  }



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


                <LineTimeComp
                id={
                  idCours
                }></LineTimeComp>
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
                    onPress={() => navigation.navigate('infoCursoScreen', {
                      // @ts-ignore
                      idCurso: idCours
                    })}
                    style={styles.btn}
                  >
                    <Icon name={'information-circle-outline'} size={25} color='#fff' />
                  </TouchableOpacity>



                  <TouchableOpacity
                    onPress={() => navigation.navigate('AsistantEventScreen',{idCurso:idCours})}
                    style={styles.btn}
                  >
                    <Icon name={'ios-person-add-outline'} size={25} color='#fff' />
                  </TouchableOpacity>


                  <TouchableOpacity
                    onPress={() => showModal()}
                    style={styles.btn}
                  >
                    <Icon name={'exit-outline'} size={25} color='#fff' />
                  </TouchableOpacity>
                </View>
              </View>


            </View>



            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Para retirar este curso pidele la contraseña a tu docente</Text>
                  <TextInput style={styles.styleinput} onChangeText={setpassRemove} />

                  <View style={styles.btnModal}>
                    <View style={styles.btnModal2} >
                      <Button
                        color={colors.primary}
                        title='Cancelar'
                        onPress={() => setModalVisible(!modalVisible)}
                      ></Button>
                    </View>

                    <View style={styles.btnModal2}>
                      <Button
                        color={colors.primary}
                        title='Enviar'
                        onPress={() => RemoverCurso()}
                      ></Button>
                    </View>

                  </View>

                </View>
              </View>
            </Modal>

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
  generalBtn: {
    alignItems: 'center'
  },
  btn: {
    backgroundColor: colors.primary,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15
  },
  containerTitel: {
    alignItems: 'center'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  styleinput: {
    borderWidth: 1,
    width: 200,
    borderRadius: 20,
    marginBottom: 30,
    height: 40,
    color:'black'
  },
  btnModal: {
    flexDirection: 'row'
  },
  btnModal2: {
    marginHorizontal: 10
  }
});