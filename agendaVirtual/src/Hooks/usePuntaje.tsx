import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export const usePuntaje = () => {
    const [isLoadingP, setisLoading] = useState(true)
    const [puntaje, setPuntos] = useState('')
    
    const { authState } = useContext(AuthContext);
    
    const getPuntos = async () =>{ 
      const url = await storage().ref('imgPuntaje/bronce.png').getDownloadURL();
      console.log(url);
        const puntosDB = await firestore()
        .collection('Usuarios')
        .where('codUser', '==', authState.uid)
        .get();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
        setPuntos(puntosDB._docs[0]._data.Puntaje)    
        setisLoading(false)
     }
     useEffect(() => {   
       
        getPuntos();    
    }, [])
  return {
    isLoadingP,
    puntaje,
    getPuntos
  }
}
