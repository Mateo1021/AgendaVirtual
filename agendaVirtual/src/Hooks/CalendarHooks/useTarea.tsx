import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';

export const useTarea = () => {
    let tareasId: any = [];
    const { authState } = useContext(AuthContext);

    const addTarea = async (data: {}) => {


        const collection = await firestore().collection('Tareas').get();
        collection.forEach(doc => tareasId.push(doc.id));

        tareasId.sort((a: any, b: any) => {
            return a.split('_')[1] - b.split('_')[1];

        });
        let idArrayUser: number = tareasId[tareasId.length - 1].split('_')[1];
        let idArrayUserNumber ='tar_'+(++idArrayUser);


        const arrayInfo = {
            // @ts-ignore
            body: data.body,
            codTarea: idArrayUserNumber,
            // @ts-ignore
            fechaAlerta: data.fechaAlerta,
            // @ts-ignore
            fechaEntrega: data.fechaEntrega,
            cudUser: authState.uid,
            // @ts-ignore
            materia: data.materia,
            // @ts-ignore
            prioridad: data.prioridad,
            // @ts-ignore
            titulo: data.titulo,
        }

        setFireStore(arrayInfo, idArrayUserNumber)
    }

    function setFireStore(arrayInfo:{}, idArrayUserNumber:string) {

        firestore()
            .collection('Tareas').doc(idArrayUserNumber)
            .set(arrayInfo)
    }



    const updateTarea =(dataUpdate:any)=>{
        firestore()
            .collection('Tareas').doc(dataUpdate.codTarea).update(
                dataUpdate
            )
    }
    const delet =(idTarea:any)=>{
        firestore()
            .collection('Tareas').doc(idTarea).delete()
    }
    return {
        addTarea,
        updateTarea,
        delet
    }

}
