import React, { useState } from 'react'
import { useMaterias } from './useMaterias';
import firestore from '@react-native-firebase/firestore';

export const useAddHorario = () => {
/* 
const [codMateria, setcodMateria] = useState('') */
const [arrayRepetS, setcodarrayRepet] = useState([])
    const {getUser}=useMaterias();
let codMateria:any;
    const createHora = async (materia:any,horaI:any,horaF:any,dia:any) =>{ 
    
        const codHorarioBD = await getUser();
        const getIdMat = await firestore()
        .collection('Materia').where('codHorario', '==', codHorarioBD)
        .get();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getIdMat._docs.forEach(object =>{
        if(object._data.nombre === materia){
            codMateria = (object._data.codMateria)

        }
    });
      sabeRepeat(horaI,horaF,dia)
    }

    const arrayrepeatDB = async (horaI:any,horaF:any,dia:any) =>{
        let arrayRepet:any;
        const opdateMateriaGet = await firestore().collection('Materia').doc(codMateria).get();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        arrayRepet = opdateMateriaGet._data.repet;
        arrayRepet.push({dia:dia,horaI:horaI,horaF:horaF})
        
        return arrayRepet;
     }

    async function  sabeRepeat(horaI:any,horaF:any,dia:any){
       const arrayTemp = await arrayrepeatDB(horaI,horaF,dia)

       
        const opdateMateria = await firestore().collection('Materia').doc(codMateria).update({
            repet:arrayTemp
            })
    }

  return {
    createHora
  }
}
