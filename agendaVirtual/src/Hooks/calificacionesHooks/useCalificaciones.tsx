import React, { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import { generalFunctions } from '../../core/generalFunctions';

export const useCalificaciones = () => {
    let califId: any = [];
    let materiasByUser: any = [];
    const { parseDate } = generalFunctions();
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
        return (calificacionesByMateriasComplet);

    }

    const searchCalificacione = async (mate: string = '', tipo: number = 0) => {
        let materiasByfilter: any = [];
        let materiasByfilter2: any = [];
        const getHorarios = await firestore().collection("Usuarios")
            .where("codUser", "==", authState.uid).get();
        // @ts-ignore
        const idHorario = getHorarios._docs[0]._data.idHorario


        const getMaterias = await firestore().collection("Materia")
            .where("codHorario", "==", idHorario).get();

        const getNotasByMateria = await firestore().collection("calificaciones")
            .where("codMateria", "==", mate).get();
        // @ts-ignore
        for (let notasBymat in getNotasByMateria._docs) {
            // @ts-ignore
            let formatData = { nombre: getNotasByMateria._docs[notasBymat]._data.nombre, 
                // @ts-ignore
                fecha: parseDate(getNotasByMateria._docs[notasBymat]._data.fechaNota.seconds),
                // @ts-ignore
                 valor: getNotasByMateria._docs[notasBymat]._data.valor,
                 // @ts-ignore
                 id: getNotasByMateria._docs[notasBymat]._data.codNota}
            if (tipo !== 0) {
                // @ts-ignore
                if (getNotasByMateria._docs[notasBymat]._data.tipoCalificacion == tipo) {
                    materiasByfilter2.push(formatData)
                }
            }
            materiasByfilter.push(formatData)
        }

        if (tipo !== 0) {
            return materiasByfilter2;
        } else {
            return materiasByfilter;
        }

    }


    const getInfoCalificacionesbyMounth = async (tipoCali: number) => {
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

        let calificacionesByFecha: any = [];
        for (let positionMateria in materiasByUser) {
            let calificaciones: any = [];

            const getCalificaciones = await firestore().collection("calificaciones")
                .where("codMateria", "==", materiasByUser[positionMateria].id).get();
            // @ts-ignore
            for (let p in getCalificaciones._docs) {
                calificacionesByFecha.push({
                    // @ts-ignore
                    fecha: parseDate(getCalificaciones._docs[p]._data.fechaNota.seconds),
                    // @ts-ignore
                    nota: getCalificaciones._docs[p]._data.valor,
                    // @ts-ignore
                    tipo: getCalificaciones._docs[p]._data.tipoCalificacion
                });
            }

        }

        let ene = []
        let feb = []
        let Mar = []
        let Abr = []
        let May = []
        let Jun = []
        let Jul = []
        let ago = []
        let sep = []
        let Oct = []
        let Nov = []
        let Dic = []
        for (let k in calificacionesByFecha) {
            switch (calificacionesByFecha[k].fecha.split('-')[1]) {
                case '01':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        ene.push(calificacionesByFecha[k])
                    }
                    break;
                case '02':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        feb.push(calificacionesByFecha[k])
                    }
                    break;
                case '03':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Mar.push(calificacionesByFecha[k])
                    }
                    break;
                case '04':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Abr.push(calificacionesByFecha[k])
                    }
                    break;
                case '05':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        May.push(calificacionesByFecha[k])
                    }
                    break;
                case '06':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Jun.push(calificacionesByFecha[k])
                    }
                    break;
                case '07':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Jul.push(calificacionesByFecha[k])
                    }
                    break;
                case '08':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        ago.push(calificacionesByFecha[k])
                    }
                    break;
                case '09':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        sep.push(calificacionesByFecha[k])
                    }
                    break;
                case '10':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Oct.push(calificacionesByFecha[k])
                    }
                    break;
                case '11':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Nov.push(calificacionesByFecha[k])
                    }
                    break;
                case '12':
                    if (calificacionesByFecha[k].tipo == tipoCali) {
                        Dic.push(calificacionesByFecha[k])
                    }
                    break;
                default:
                    break;
            }
        }
        let notasBymosunCalculado = []
        let total = 0
        for (let i of ene) {
            total += Number(i.nota);
        }
        if(total>0){
            total = total / ene.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of feb) {
            total += Number(i.nota);
        }
        if(total>0){
            total = total / feb.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Mar) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Mar.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Abr) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Abr.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of May) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / May.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Jun) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Jun.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Jul) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Jul.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of ago) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / ago.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of sep) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / sep.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Oct) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Oct.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Nov) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Nov.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }
        for (let i of Dic) {
            total += Number(i.nota)
        }
        if(total>0){
            total = total / Dic.length
            notasBymosunCalculado.push(total)
            total = 0
        }else{
            notasBymosunCalculado.push(0)  
        }

        return (notasBymosunCalculado);

    }

    const deletCalificacion =async (codCali:string) => {
        const caliDel = await firestore()
        .collection('calificaciones').doc(codCali).delete();
    }

    return {
        AddCalif,
        getInfoCalificaciones,
        searchCalificacione,
        getInfoCalificacionesbyMounth,
        deletCalificacion
    }
}
