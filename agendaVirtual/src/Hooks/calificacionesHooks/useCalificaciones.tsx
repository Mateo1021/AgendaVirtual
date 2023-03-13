import React, { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../../Context/ContextUser/AuthContext';

export const useCalificaciones = () => {
    let califId: any = [];
    let materiasByUser: any = [];

    const { authState } = useContext(AuthContext);

    const AddCalif = async (dataCalif: any) => {

        const collection = await firestore().collection('calificaciones').get();
        collection.forEach(doc => califId.push(doc.id));

        califId.sort((a: any, b: any) => {
            return a.split('_')[1] - b.split('_')[1];
        });

        let idCalif: number = califId[califId.length - 1].split('_')[1];
        let idArrayCalif = ++idCalif;

        let arrayDataCalif = {
            codMateria: dataCalif.codMateria,
            codNota: 'cali_' + idArrayCalif,
            fechaNota: dataCalif.fechaNota,
            nombre: dataCalif.nombre,
            porcentaje: dataCalif.porcentaje,
            tipoCalificacion: dataCalif.tipoCalificacion,
            valor: dataCalif.valor,
        }

        firestore()
            .collection('calificaciones').doc('cali_' + idArrayCalif)
            .set(arrayDataCalif)

    }

    const getInfoCalificaciones = async (tipoCali: number) => {
        const getHorarios = await firestore().collection("Usuarios")
            .where("codUser", "==", authState.uid).get();
        // @ts-ignore
        const idHorario = getHorarios._docs[0]._data.idHorario


        const getMaterias = await firestore().collection("Materia")
            .where("codHorario", "==", idHorario).get();
        // @ts-ignore
        for (let idMaterias in getMaterias._docs) {
            // @ts-ignore
            materiasByUser.push({ id: getMaterias._docs[idMaterias]._data.codMateria, name: getMaterias._docs[idMaterias]._data.nombre });
        }

        let calificacionesByMateriasComplet: any = [];
        for (let positionMateria in materiasByUser) {
            let calificaciones: any = [];

            const getCalificaciones = await firestore().collection("calificaciones")
                .where("codMateria", "==", materiasByUser[positionMateria].id).where("tipoCalificacion", "==", tipoCali).get();
            let codMateriaPrint = materiasByUser[positionMateria].name;
            // @ts-ignore
            if (getCalificaciones._docs.length > 0) {
                // @ts-ignore
                for (let positionCalif in getCalificaciones._docs) {
                    if (positionCalif == '0') {
                        calificaciones.push(codMateriaPrint)
                        // @ts-ignore
                        calificaciones.push(Number(getCalificaciones._docs[positionCalif]._data.valor))
                    } else {

                        // @ts-ignore
                        calificaciones.push(Number(getCalificaciones._docs[positionCalif]._data.valor))
                    }
                }

                calificacionesByMateriasComplet.push(calificaciones);
            }
        }
        console.log(calificacionesByMateriasComplet);

        return (calificacionesByMateriasComplet);

    }

    return {
        AddCalif,
        getInfoCalificaciones
    }
}
