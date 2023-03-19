import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';

export const useIdentification = () => {

    const [isLoadingIn, setisLoading] = useState(true)
    const [info, setInfo] = useState([])
    
    const { authState } = useContext(AuthContext);
    
    const getInfoUser = async () =>{ 
    
        const notarArray = await firestore()
        .collection('Usuarios')
        .where('codUser', '==', authState.uid)
        .get();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
        setInfo(notarArray._docs)    
        setisLoading(false)
     }
     useEffect(() => {   
        getInfoUser();     
    }, [])
  return {
    isLoadingIn,
    info,
    getInfoUser
  }
}