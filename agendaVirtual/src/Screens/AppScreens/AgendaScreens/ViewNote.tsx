import React, { useLayoutEffect, useState } from 'react'
import { colors, stylesApp } from '../../../Themes/AppThemes';
import { Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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
                <View style={styles.block}>
                    <View style={styles.item}>
                        <Text style={stylesApp.titles}>
                            EDITAR NOTA
                        </Text>
                    </View>


                    <View>
                        <Text style={styles.titulos}>
                            Titulo / Nombre
                        </Text>
                        <TextInput
                            placeholderTextColor="#949494"
                            style={styles.titelInput}
                            onChangeText={settitulo}
                            value={titulo}
                        ></TextInput>
                    </View>

                    <View>
                        <Text style={styles.titulos}>Contenido</Text>
                        <TextInput
                            placeholderTextColor="#949494"
                            style={styles.bodyInput}
                            onChangeText={setbody}
                            value={body}
                            multiline={true}
                            numberOfLines={9}
                        ></TextInput>
                    </View>
                    <View style={styles.btnfuntion}>
                        <View style={styles.btnSingel}>
                            <Button
                                color={colors.primary}
                                title='Editar nota'
                                onPress={() => {
                                    setNote()
                                }}
                            ></Button>
                        </View>
                        <View style={styles.btnSingel}>
                            <Button
                                color={colors.secundary}
                                title='Elimianr nota'
                                onPress={() => {
                                    delNote()
                                }}
                            ></Button>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    item: {
        alignItems: 'center'
    },
    titulos: {
        fontWeight: 'bold',
        paddingTop: 15
    },
    titelInput: {
        borderBottomWidth: 1,
        borderColor: '#DEDEDE',
        fontSize: 20,
        color:'black'
    },
    bodyInput: {
        borderWidth: 1,
        borderColor: '#DEDEDE',
        marginVertical: 20,
        fontSize: 18,
        color:'black'
    },
    block: {
        paddingHorizontal: 25,
        paddingVertical: 10
    },
    btnfuntion: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnSingel: {
        paddingHorizontal: 10
    }
})