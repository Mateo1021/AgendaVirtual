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
                if (puntInt <= 30) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/1.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 60) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/2.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 90) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/3.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 120) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/4.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 150) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/5.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 180) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/6.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 210) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/7.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt <= 299) {
                    return (
                        <Image
                            style={styles.tinyLogo}

                            source={require('./imgs/8.png')}
                        />
                    )
                }
            case puntInt:
                if (puntInt > 300) {
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
                style={styles.contImg}
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
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    contImg:{
        height: 350,
    }

});