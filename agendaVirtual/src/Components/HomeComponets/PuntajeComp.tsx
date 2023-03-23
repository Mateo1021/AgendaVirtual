import React, { useEffect, useLayoutEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AppRegistry, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RankingScreen } from './../../Screens/AppScreens/UsuarioScreens/RankingScreen';
import { stylesApp } from '../../Themes/AppThemes';



export const PuntajeComp = ({ puntaje }: any) => {
    let urlImgPuntaje: any
    const [urlImgDb, seturlImgDb] = useState('')
    let stringUrl: string
    let puntInt: number = Number(puntaje)



    const navigation = useNavigation();
    function LogoImg() {
        switch (puntInt) {
            case puntInt:
                if (puntInt <= 10) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/1.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 20) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/2.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 30) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/3.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 40) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/4.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 50) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/5.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 60) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/6.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 70) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/7.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 80) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/8.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 100) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/9.png')}
                        />
                    )
                }

            default:
                return (
                    <Image
                        style={styles.tinyLogo}

                        source={require('./imgs/1.png')}
                    />
                )

        }
    }




    return (
        <View >
            <TouchableOpacity
                //@ts-ignore
                onPress={() => { navigation.navigate('RankingScreen') }}
            >
                <LogoImg></LogoImg>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },

});