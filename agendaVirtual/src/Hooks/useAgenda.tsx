import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';


export const useAgenda = () => {


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
        console.log(notas);
         
    }, [])
  return {
    isLoading,
    notas,
    getNotes
  }
}
