import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { stylesApp } from '../../../Themes/AppThemes'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useContext } from 'react';
import { PuntajeComp } from '../../../Components/HomeComponets/PuntajeComp';
import Carousel from 'react-native-snap-carousel';
import { InsigniasComp } from '../../../Components/HomeComponets/InsigniasComp';
import { ScrollView } from 'react-native-gesture-handler';


export const RankingScreen = () => {
  let dataTest = [{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }]

  const { authState } = useContext(AuthContext);
  const [puntaje, setpuntaje] = useState('')
  const [insignias, setinsignias] = useState(["1"])
  useLayoutEffect(() => {
    var unsubscribe = firestore().collection("Usuarios").doc(authState.uid)
      .onSnapshot((querySnapshot) => {
        //@ts-ignore
        setpuntaje(querySnapshot.data().Puntaje);
//@ts-ignore
        if(querySnapshot.data().insignias.length >0){

          //@ts-ignore
          setinsignias(querySnapshot.data().insignias)
        }
      });
    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <PuntajeComp
          puntaje={puntaje}
        ></PuntajeComp>
        <Text>Hola {authState.displayName} tu puntaje actual es {puntaje}</Text>
        <Text style={styles.txtBody}>Realiza actividades, participa en el foro y usa las
          herramientas de la app para obtener mas puntos y subir de rango</Text>

        <Text style={styles.insignias}>Estas son las insignias que te han dado</Text>
        <View style={styles.insigniasImg}>
          <Carousel
            data={insignias}
            renderItem={({ item }: any) => <InsigniasComp idImg={item}></InsigniasComp>}
            sliderWidth={400}
            itemWidth={100}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 20
  },
  txtBody: {
    paddingTop: 20,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  insignias: {
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 20,
    fontSize:17
  },
  insigniasImg:{
    paddingBottom:50,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center'
  }
});
