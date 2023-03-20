import React, { useLayoutEffect, useState } from 'react'
import { colors, stylesApp } from '../../../Themes/AppThemes';
import { Button, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useGetInfoNote } from '../../../Hooks/AgendaHooks/useGetInfoNote';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
export const ViewNote = ({ route }) => {
    const navigation = useNavigation();
    const { createNote, deletNote } = useGetInfoNote()
    const [titulo, settitulo] = useState('')
    const [body, setbody] = useState('')
    useLayoutEffect(() => {
        var unsubscribe = firestore().collection("Notas_agenda").doc(route.params.codNota)
            .onSnapshot((querySnapshot) => {
                // @ts-ignore
                if (querySnapshot._data) {
                    // @ts-ignore
                    settitulo(querySnapshot._data.Titulo)
                    // @ts-ignore
                    setbody(querySnapshot._data.body)
                }
            });

        return unsubscribe;

    }, [])


    const setNote = () => {
        let dataNewNote = {
            Titulo: titulo,
            body: body,
            codNota: route.params.codNota
        }
        createNote(dataNewNote);
        // @ts-ignore
        navigation.navigate('AgendaScreen')
    }
    const delNote = () => {
        deletNote(route.params.codNota)
        // @ts-ignore
        navigation.navigate('AgendaScreen')
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={stylesApp.titles}>
                        Editar nota
                    </Text>

                    <Text style={stylesApp.generalText}>
                        Titulo / Nombre
                    </Text>
                    <TextInput
                        style={stylesApp.generalText}
                        onChangeText={settitulo}
                        value={titulo}
                    ></TextInput>
                    <Text style={stylesApp.generalText}>
                        Contenido
                    </Text>
                    <TextInput
                        style={stylesApp.generalText}
                        onChangeText={setbody}
                        value={body}
                    ></TextInput>

                    <Button
                        color={colors.primary}
                        title='Editar nota'
                        onPress={() => {
                            setNote()
                        }}
                    ></Button>
                    <Button
                        color={colors.primary}
                        title='Elimianr nota'
                        onPress={() => {
                            delNote()
                        }}
                    ></Button>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
