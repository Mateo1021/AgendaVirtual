import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';

export const useTarea = () => {
    let tareasId: any = [];
    const { authState } = useContext(AuthContext);

    const addTarea = async (data: {}) => {

        const calendar = await firestore().collection("calendario")
            .where("cudUser", "==", "us_1").get();
        // @ts-ignore
        const idCalendar = await calendar._docs[0]._data.codCalendar
        const collection = await firestore().collection('Tareas').get();
        collection.forEach(doc => tareasId.push(doc.id));

        tareasId.sort((a: any, b: any) => {
            return a.split('_')[1] - b.split('_')[1];

        });
        let idArrayUser: number = tareasId[tareasId.length - 1].split('_')[1];
        let idArrayUserNumber = ++idArrayUser;


        const arrayInfo = {
            // @ts-ignore
            body: data.body,
            codTarea: idArrayUserNumber,
            // @ts-ignore
            fechaAlerta: data.fechaAlerta,
            // @ts-ignore
            fechaEntrega: data.fechaEntrega,
            idCalendario: idCalendar,
            // @ts-ignore
            materia: data.materia,
            // @ts-ignore
            prioridad: data.prioridad,
            // @ts-ignore
            titulo: data.titulo,
        }

        setFireStore(arrayInfo, idArrayUserNumber)
    }

    function setFireStore(arrayInfo:{}, idArrayUserNumber:number) {

        firestore()
            .collection('Tareas').doc('tar_' + idArrayUserNumber)
            .set(arrayInfo)
    }
    return {
        addTarea
    }

}
