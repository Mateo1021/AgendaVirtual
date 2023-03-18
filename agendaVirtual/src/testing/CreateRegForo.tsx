import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';

export const CreateRegForo = () => {

    const date2 = new Date('2023-03-17T03:24:00');

    const addRegister = async () =>{ 
    console.log(date2);
    
        firestore()
        .collection('registrosForo').doc()
        .set({
            body: 'doc.data().body',
            createdAt:date2,
            codForo: 'doc.data().codForo',
            cod_registro:'doc.data().cod_registro',
            file: 'doc.data().file'
            })
                  
    }


  return{
        addRegister
    }
  
}
