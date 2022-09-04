import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context/ContextUser/AuthContext';

export const useCreateHorario = () => {
    const { authState } = useContext(AuthContext);
let codHor:any=[];
    const createHora = async () =>{ 
        const collectionH = await firestore().collection('Horarios').get();
        collectionH.forEach(doc => codHor.push(doc.id));
        codHor.sort((a:any, b:any) => {
            return a.split('_')[1] - b.split('_')[1];
    
         });

         let idArrayHor : number =  codHor[codHor.length - 1].split('_')[1];
         let idArrayHorNumber = ++idArrayHor;
    
        const addHorarioDB = await firestore()
        .collection('Horarios').doc('h_'+idArrayHorNumber)
        .set({
          codHorario:'h_'+idArrayHorNumber,
          codEstud:authState.uid,
          nombreHorario:'Test'
        })
        const addHorUser = await firestore()
        .collection('Usuarios').doc(authState.uid)
        .update({
          idHorario:'h_'+idArrayHorNumber
        }) 

    }


    return {
        createHora
  }
}
