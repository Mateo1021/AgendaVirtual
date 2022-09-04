import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';

export const useAddNote = () => {
    let notaId:any =[] ;
    const { authState } = useContext(AuthContext);

const AddNote = async (titulo:string,body:string) =>{ 
    
    const collection = await firestore().collection('Notas_agenda').get();
    collection.forEach(doc => notaId.push(doc.id));

    notaId.sort((a:any, b:any) => {
        return a.split('_')[1] - b.split('_')[1];

     });
    let idArrayUser : number =  notaId[notaId.length - 1].split('_')[1];
    let idArrayUserNumber = ++idArrayUser;
    firestore()
    .collection('Notas_agenda').doc('not_'+idArrayUserNumber)
    .set({
        Titulo: titulo,
        body: body,
        codNota:'not_'+idArrayUserNumber,
        codUser:authState.uid
        })
              
}
     return {
        AddNote
      }
}
