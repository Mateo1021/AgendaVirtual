import React, { useLayoutEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Alert, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../../Themes/AppThemes';
import { useAddResponse } from '../../../Hooks/ProyectosHooks/useAddResponse';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useContext } from 'react';
// @ts-ignore
export const ResponseForo = ({ route }) => {
    const [respuestas, setrespuestas] = useState([])
    const [response, setresponse] = useState('')
    const { authState } = useContext(AuthContext);
    const { AddResponse } = useAddResponse()

    useLayoutEffect(() => {
        var unsubscribe2 = firestore().collection("respuestas").orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                var res: any = [];
                querySnapshot.forEach((doc) => {

                    // @ts-ignore
                    if (doc._data.codRegistro == route.params.idForo) {
                        // @ts-ignore
                        res.push(
                            {
                                bodyMsj: doc.data().bodyMsj,
                                createdAt: doc.data().createdAt.toDate(),
                                codRegistro: doc.data().codRegistro,
                                idUser: doc.data().idUser,
                            }
                        );
                    }

                });
                setrespuestas(res)

            });
        return unsubscribe2;
    }, [])


    function RenderInfoRegistro() {
        return (
            <ScrollView>
                {
                    respuestas.map((item, index) => (
                        <View>
                            {/*@ts-ignore */}
                            <Text style={styles.textStyle}>{item.bodyMsj}</Text>
                        </View>
                    ))
                }

            </ScrollView>
        )
    }
    function sendResponse() {
        let date = new Date();
        let data = {
            bodyMsj: response,
            codRegistro: route.params.idForo,
            idUser: authState.uid,
            date: date
        }
        let newRegistro = respuestas;
        //@ts-ignore
        newRegistro.push(data)
        setrespuestas(newRegistro)
        setresponse('')
        AddResponse(data)
    }
    return (
        <View>
            <RenderInfoRegistro></RenderInfoRegistro>
            <TextInput style={styles.textInput} onChangeText={setresponse} value={response} ></TextInput>
            <Button
                color={colors.primary}
                title='salir'
                onPress={() => sendResponse()}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 30
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
        padding: 35,
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
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',

    }
})