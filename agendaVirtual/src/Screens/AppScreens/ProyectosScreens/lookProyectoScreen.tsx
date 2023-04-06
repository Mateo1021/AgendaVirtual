import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'


import { ActivityIndicator, Alert, Button, Image, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { SwipeListView } from 'react-native-swipe-list-view';
import { ProyectoCard } from '../../../Components/proyectComponets/ProyectoCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../Themes/AppColors';
import firestore from '@react-native-firebase/firestore';
import { stylesApp } from '../../../Themes/AppThemes';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { ProyectosScreen } from './ProyectosScreen';
//funciones tipo flecha

interface Props extends StackScreenProps<any, any> { };
export const lookProyectoScreen = ({ navigation, route }: Props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [cursos, setcursos] = useState([])
  const [passCours, setpassCours] = useState('')

  const [infoC, setinfoC] = useState({})
  useLayoutEffect(() => {
    var unsubscribe2 = firestore().collection("Cursos")
      .onSnapshot((querySnapshot) => {
        var res: any = [];
        querySnapshot.forEach((doc) => {
          res.push(doc);
        });
        setcursos(res)
      });

    return unsubscribe2;
  }, [])


  const { authState } = useContext(AuthContext);

  const createTwoButtonAlert = (tittle: any, id: any, cant: any, clve: any) => {
    setinfoC({
      tittle: tittle,
      id: id,
      cant: cant,
      clve: clve
    })
    setModalVisible(true)

  }
const cancelInscrib =()=>{
  setinfoC({})
  setModalVisible(!modalVisible)
}
  function addCoursEstudent() {
    //@ts-ignore
    if (passCours == infoC.clve) {
      firestore()
        .collection('Usuarios').doc(authState.uid)
        .update({
          //@ts-ignore
          idCurso: infoC.id
        })
        //@ts-ignore
      let newCant = Number(infoC.cant)
      firestore()
      //@ts-ignore
        .collection('Cursos').doc(infoC.id)
        .update({
          cantEstudiantes: newCant++
        })
      // @ts-ignore
      navigation.pop()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.navigate('ProyectosScreen')
    }else{
     Alert.alert('Contraseña incorrecta')

    }

  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titelCenter}>
          <Text style={stylesApp.titles}>CURSOS</Text>
        </View>
        <SwipeListView
          style={styles.styleComp}
          data={cursos}
          renderItem={(data, rowMap) => (
            <ProyectoCard pro={data.item}></ProyectoCard>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.backOptions} >
              <TouchableOpacity
                onPress={() => navigation.navigate('infoCursoScreen', {
                  // @ts-ignore
                  idCurso: data.item._data.codCurso
                })}
              >
                <Icon name={'information-circle-outline'} size={30} color='#fff' />
              </TouchableOpacity>

              <TouchableOpacity
                // @ts-ignore
                onPress={() => createTwoButtonAlert(data.item._data.nombreCurso, data.item._data.codCurso, data.item._data.cantEstudiantes, data.item._data.claveDingreso)}
              >
                <Icon name={'duplicate-outline'} size={30} color='#fff' />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />


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
              <TextInput style={styles.styleinput} onChangeText={setpassCours}/>

              <View style={styles.btnModal}>
                <View style={styles.btnModal2} >
                  <Button
                    color={colors.primary}
                    title='Cancelar'
                    onPress={() => cancelInscrib()}
                  ></Button>
                </View>

                <View style={styles.btnModal2}>
                  <Button
                    color={colors.primary}
                    title='Enviar'
                    onPress={() => addCoursEstudent()}
                  ></Button>
                </View>

              </View>

            </View>
          </View>
        </Modal>



      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerGen: {
    alignItems: 'center'
  },
  txtMateria: {
    fontSize: 20,
    color: 'black'
  },

  backOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  optLeft: {

  },
  titelCenter: {
    alignItems: 'center'
  },
  styleComp: {
    flex: 1
  }, lineTimeContend: {
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
