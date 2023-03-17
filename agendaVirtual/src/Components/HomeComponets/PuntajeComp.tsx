import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AppRegistry, View, Image, StyleSheet } from 'react-native';


export const PuntajeComp = ({puntaje}:any) => { 
    let urlImgPuntaje:any
    const [urlImgDb, seturlImgDb] = useState('')
let puntInt:number = Number(puntaje)
    const getUrlImg = async () =>{

        switch (puntInt) {
            case puntInt:
                if(puntInt <= 10){
                    urlImgPuntaje = 'hierro.png'
                    break;
                }
            case puntInt:
                if(puntInt <= 20){
                urlImgPuntaje = 'bronce.png'
                break;
                }
            case puntInt:
                if(puntInt <= 30){
                urlImgPuntaje = 'plata.png'
                break;
                }
            case puntInt:
                if(puntInt <= 40){
                urlImgPuntaje = 'oro.png'
                break;
                }
            case puntInt:
                if(puntInt <= 50){
                urlImgPuntaje = 'platino.png'
                break;
                }
            case puntInt:
                if(puntInt <= 60){
                urlImgPuntaje = 'diamante.png'
                break;
                }
            case puntInt:
                if(puntInt <= 70){
                urlImgPuntaje = 'maestro.png'
                break;
                }
            case puntInt:
                if(puntInt <= 80){
                urlImgPuntaje = 'granMaestro.png'
                break;
                }
            case puntInt:
                if(puntInt <= 100){
                urlImgPuntaje = 'retador.png'
                break;   
                }   
       
            default:
                urlImgPuntaje = 'nn.png'
                break;
        }
        const url = await storage().ref('imgPuntaje/'+urlImgPuntaje).getDownloadURL();       
        seturlImgDb(url)
       }

useEffect(() => {
    getUrlImg();
}, [])

  return (
    <View >
        <Image
          style={styles.tinyLogo}
          source={{uri: urlImgDb}}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
      paddingTop: 20,
      alignItems:'center'
    },
    tinyLogo: {
      width: 200,
      height: 200,
    },
  
  });