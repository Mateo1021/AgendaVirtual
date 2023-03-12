import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../../Context/ContextUser/AuthContext';

export const useCalificaciones = () => {
    let califId:any =[] ;
    const { authState } = useContext(AuthContext);

    const AddCalif = async (dataCalif:any) =>{ 
    
        const collection = await firestore().collection('calificaciones').get();
        collection.forEach(doc => califId.push(doc.id));
    
        califId.sort((a:any, b:any) => {
            return a.split('_')[1] - b.split('_')[1];
         });

        let idCalif : number =  califId[califId.length - 1].split('_')[1];
        let idArrayCalif = ++idCalif;

let arrayDataCalif={
    codMateria:dataCalif.codMateria,
    codNota:'cali_'+idArrayCalif,
    fechaNota:dataCalif.fechaNota,
    nombre:dataCalif.nombre,
    porcentaje:dataCalif.porcentaje,
    tipoCalificacion:dataCalif.tipoCalificacion,
    valor:dataCalif.valor,
}

        firestore()
        .collection('calificaciones').doc('cali_'+idArrayCalif)
        .set(arrayDataCalif)
                  
    }
    
    return {
        AddCalif
      }
}
