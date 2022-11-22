import React, { useContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import storage from '@react-native-firebase/storage';

export const infoUser = () => {


    const [isLoading, setisLoading] = useState(true)
    const [notas, setnotas] = useState([])
    
    const { authState } = useContext(AuthContext);
    
    const getNotes = async () =>{ 
    
        const notarArray = await firestore()
        .collection('Notas_agenda')
        .where('codUser', '==', authState.uid)
        .get();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
        setnotas(notarArray._docs)    
        setisLoading(false)
     }
     useEffect(() => {   
        getNotes();    
    }, [])
  return {
    isLoading,
    notas,
    getNotes
  }

}
