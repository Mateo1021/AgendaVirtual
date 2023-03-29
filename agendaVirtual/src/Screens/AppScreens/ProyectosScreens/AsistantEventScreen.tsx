import React, { useContext, useLayoutEffect, useState } from 'react'
import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../Themes/AppColors';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { stylesApp } from '../../../Themes/AppThemes';


//@ts-ignore
export const AsistantEventScreen = ({ route }) => {
    const navigation = useNavigation();
    const { authState } = useContext(AuthContext);
    const [dataEvents, setdataEvents] = useState([])
    const [modalVisible, setModalVisible] = useState(false);


    const [passRemove, setpassRemove] = useState('')

    const [codEve, setcodEve] = useState('')
    const [newArray, setnewArray] = useState([])
    const [passEvent, setpassEvent] = useState('')

    useLayoutEffect(() => {
        var unsubscribe2 = firestore().collection("evento").where("idCurso", "==", route.params.idCurso)
            .onSnapshot((querySnapshot) => {
                var res: any = [];
                querySnapshot.forEach((doc) => {
                    res.push(
                        {
                            description: doc.data().body,
                            title: doc.data().titulo,
                            codEven: doc.data().codEvento,
                            asistencia: doc.data().asistencia,
                            passAsis: doc.data().passAsis
                        }
                    );
                });
                setdataEvents(res)
            });
        return unsubscribe2;
    }, [])


    const marcAsistan = (idEvent: any) => {
        console.log(idEvent);
        /* @ts-ignore */
        let arrayStud = (idEvent.asistencia);
        console.log(arrayStud);

        if (arrayStud.indexOf(authState.uid) < 0) {

            arrayStud.push(authState.uid)
        }

        setnewArray(arrayStud)
        setcodEve(idEvent.codEven)
        setpassEvent(idEvent.passAsis)
        showModal()


    }

    function showModal() {
        setModalVisible(true)
    }

    function validDel() {
        console.log(codEve, newArray);
        if (passRemove == passEvent) {

            firestore().collection("evento").doc(codEve).update({
                asistencia: newArray
            })
            Alert.alert(
                'Asistencia','Su asistencia se a guardado con exito'
            )
            setModalVisible(!modalVisible)

        } else {
            Alert.alert(
                'Clave incorrecta',
            )
        }


    }

    return (
        <View>
            <View style={{alignItems:'center'}}>
                <Text style={stylesApp.titles}>MARCAR ASISTENCIA EVENTOS</Text>
            </View>
            <SwipeListView
                data={dataEvents}
                renderItem={(data, rowMap) => (
                    <View style={styles.containerGen2}>
                        <Text style={styles.txtMateria2}>
                            {/* @ts-ignore */}
                            {data.item.title}
                        </Text>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.backOptions} >
                        <TouchableOpacity
                        >

                        </TouchableOpacity>
                        <TouchableOpacity
                            // @ts-ignore
                            onPress={() => marcAsistan(data.item)}
                        >
                            <Icon name={'checkbox-outline'} size={30} color='#fff' />
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
                        <Text style={styles.modalText}>Para marcar la asistencia pidele la clave al docente del curso</Text>
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
                                    onPress={() => validDel()}
                                ></Button>
                            </View>

                        </View>

                    </View>
                </View>
            </Modal>



        </View>
    )
}
const styles = StyleSheet.create({
    containerGen: {
        alignItems: 'center'
    },
    txtMateria: {
        fontSize: 20,
        color: 'black'
    },
    btnFuntions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        marginBottom: 30
    },
    btn: {
        paddingHorizontal: 10
    },
    backOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 20
    },
    optLeft: {

    },



    containerGen2: {
        borderColor: '#DEDEDE',
        borderBottomWidth: 1,
        shadowColor: '#404040',
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    txtMateria2: {
        fontSize: 20,
        color: 'black'
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
