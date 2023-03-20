import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { async } from '@firebase/util';

export const useGetInfoNote = () => {


    const createNote = async (infoNota: any) => {

        const notaById = await firestore()
            .collection('Notas_agenda').doc(infoNota.codNota).update({
                Titulo: infoNota.Titulo,
                body: infoNota.body
            })
        // @ts-ignore
        setinfoNota(notaById._data)
    }
    const deletNote =async (codNota:any)=>{
        const notaById = await firestore()
        .collection('Notas_agenda').doc(codNota).delete()
    }


    return {
        createNote,
        deletNote
    }
}
