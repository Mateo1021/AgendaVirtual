import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { useMaterias } from './useMaterias';

export interface repeatMateria{
  dia:string,
  horaI:string,
  horaF:string
}

export const useCreateMateria = () => {


  const {getUser}=useMaterias();

  const idMaterias = async () =>{ 
    let codMat:any=[];
      const collectionM = await firestore().collection('Materia').get();
      collectionM.forEach(doc => codMat.push(doc.id));
      codMat.sort((a:any, b:any) => {
          return a.split('_')[1] - b.split('_')[1];
  
       });
       return codMat;
      }
      const createMateria = async (nombre:string)=>{
        const codHor = await getUser()
        const codMat = await idMaterias()
        let idArrayUser : number =  codMat[codMat.length - 1].split('_')[1];
        let idArrayUserNumber = ++idArrayUser;
        firestore()
        .collection('Materia').doc('mat_'+idArrayUserNumber)
        .set({
          codHorario: codHor,
          codMateria: 'mat_'+idArrayUserNumber,
          nombre: nombre,
          periodo:'authState.uid',
          repet: []
            })
console.log('llego');

      }

  return {
    createMateria
  }
}
