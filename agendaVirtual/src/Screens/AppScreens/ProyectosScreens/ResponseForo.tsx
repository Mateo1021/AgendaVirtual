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
    const { authState } = useContext(AuthContext);
    const { AddResponse } = useAddResponse()



    const [respuestas, setrespuestas] = useState([])
    const [response, setresponse] = useState('')
    const [titelForo, settitelForo] = useState('')

    const [msjPlace, setmsjPlace] = useState('')
    const [isActive, setisActive] = useState(false)

    useLayoutEffect(() => {

        setisActive(route.params.isActive==1?true:false)
        setmsjPlace(route.params.isActive==1?'Mensaje...':'Foro desactivado...')

        var unsubscribe2 = firestore().collection("respuestas").orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                var res: any = [];
                querySnapshot.forEach((doc) => {

                    // @ts-ignore
                    if (doc._data.codRegistro == route.params.idForo) {

                        res.push(
                            {
                                bodyMsj: doc.data().bodyMsj,
                                createdAt: doc.data().createdAt.toDate(),
                                codRegistro: doc.data().codRegistro,
                                idUser: doc.data().idUser,
                                nameUser: doc.data().nameUser,
                            }
                        );
                    }

                });
                setrespuestas(res)

            });
        return unsubscribe2;
    }, [])

    useLayoutEffect(() => {
        firestore()
            .collection('registrosForo')
            // Filter results
            .doc(route.params.idForo)
            .get()
            .then(querySnapshot => {
                //@ts-ignore 
                settitelForo(querySnapshot._data.body)
            });
    }, [])

    function RenderInfoRegistro() {
        return (
            <View>
                {
                    respuestas.map((item, index) => (
                        //@ts-ignore 
                        <View key={index} style={[item.idUser == authState.uid ? styles.responseUser : styles.responseOters]}>
                            {/*@ts-ignore */}
                            <Text style={styles.textResponseUser}>{item.nameUser}</Text>
                            {/*@ts-ignore */}
                            <Text style={styles.textResponse}>{item.bodyMsj}</Text>
                        </View>
                    ))
                }
            </View>


        )
    }
    function sendResponse() {
        let date = new Date();
        let data = {
            bodyMsj: response,
            codRegistro: route.params.idForo,
            idUser: authState.uid,
            date: date,
            nameUser: authState.displayName
        }
        let newRegistro = respuestas;
        //@ts-ignore
        newRegistro.push(data)
        setrespuestas(newRegistro)
        setresponse('')
        AddResponse(data)
    }
    return (
        <View style={styles.block}>
            <View style={styles.titelForo}>
                <Text style={styles.textTitelForo}>{titelForo}</Text>
            </View>
            <ScrollView>
                <RenderInfoRegistro></RenderInfoRegistro>
            </ScrollView>
            <TextInput 
            placeholderTextColor = "#949494"
            style={styles.textInput} 
            placeholder={msjPlace} 
            onChangeText={setresponse} 
            value={response} 
            editable={isActive} ></TextInput>
            <Button
                color={colors.primary}
                title='Enviar'
                onPress={() => sendResponse()}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 30
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 20,
        color:'black'
    },
    responseOters: {
        borderWidth: 1,
        alignSelf: 'flex-start',
        padding: 10,
        marginTop: 10,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: '#E6E6E6',
    },
    responseUser: {
        borderWidth: 1,
        alignSelf: 'flex-end',
        padding: 10,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#EAAA78',
        borderColor: 'white',
    },
    textResponse: {
        color: 'black',
        fontSize:18
    },
    block: {
        flex: 1
    },
    titelForo:{
        alignItems:'center',
        borderBottomWidth:1,
        borderColor: '#E6E6E6',
        padding:20

    },
    textTitelForo:{
        color:'black',
        fontSize:20,
        
    },
    textResponseUser:{
        color:'black',
        fontWeight: 'bold',
    }
})