import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc, getDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import Table from 'react-bootstrap/Table';


export const InfoEstud = () => {
    const { idU } = useParams();
    const navigate = useNavigate();


    const [infoEstuid, setinfoEstuid] = useState([])

    const [optionSelect, setoptionSelect] = useState(null)

    const [partis, setpartis] = useState([])
    const [msjes, setmsjes] = useState([])
    const [puntos, setpuntos] = useState([])


    const getDataUser = async () => {
        const docRef = doc(db.db, "Usuarios", idU);
        const docSnap = await getDoc(docRef);
        setinfoEstuid(docSnap.data())
    }
    useLayoutEffect(() => {
        getDataUser()

    }, [])


    function segundosAFecha(segundos) {
        var fecha = new Date(segundos * 1000); // convierte los segundos a milisegundos
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1; // los meses en JavaScript comienzan en 0, por lo que hay que sumar 1
        var año = fecha.getFullYear();
        return dia + '/' + mes + '/' + año;
    }

    const sendIni = () => {
        navigate('/admin')
    }
    const sendTablas = () => {
        navigate('/listaDocentes')
    }


    const searchParti = async () => {
        const q = query(collection(db.db, "respuestas"), where("idUser", "==", idU));
        let arrayinfo = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!Object.entries(doc.data()).length == 0) {
                arrayinfo.push({
                    bodyMsj: doc.data().bodyMsj,
                    codRegistro: doc.data().codRegistro,
                    createdAt: segundosAFecha(doc.data().createdAt.seconds),
                });
            }
        });
        setpartis(arrayinfo)
        setoptionSelect('1')
    }

    const searchMsj = async () => {
        const q = query(collection(db.db, "chats"), where("idUser", "==", idU));
        let arrayinfo = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!Object.entries(doc.data()).length == 0) {
                arrayinfo.push({
                    cours: doc.data().cours,
                    text: doc.data().text,
                    createdAt: segundosAFecha(doc.data().createdAt.seconds),
                });
            }
        });
        setmsjes(arrayinfo)
        setoptionSelect('2')
    }

    const searchPunt = async () => {
        const q = query(collection(db.db, "rankingActividades"), where("codUser", "==", idU));
        let arrayinfo = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!Object.entries(doc.data()).length == 0) {
                arrayinfo.push({
                    codReg: doc.data().codReg,
                    puntaje: doc.data().puntaje,
                });
            }
        });
        setoptionSelect('3')
        setpuntos(arrayinfo)
    }







    const RenderItem = () => {
        if (optionSelect == '1') {
            return (
                <div>
                    <Table striped bordered hover size="sm" responsive="sm">
                        <thead>
                            <tr>
                                <th>Codigo del registro</th>
                                <th>Texto</th>
                                <th>Fecha de publicacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partis.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codRegistro}</td>
                                    <td>{item.bodyMsj}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        } else if (optionSelect == '2') {
            return (
                <div>
                    <Table striped bordered hover size="sm" responsive="sm">
                        <thead>
                            <tr>
                                <th>Codigo del curso (chat)</th>
                                <th>Texto</th>
                                <th>Fecha de publicacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {msjes.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.cours}</td>
                                    <td>{item.text}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        } else if (optionSelect == '3') {
            return (
                <div>
                    <Table striped bordered hover size="sm" responsive="sm">
                        <thead>
                            <tr>
                                <th>Codigo de la actividad</th>
                                <th>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {puntos.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codReg}</td>
                                    <td>{item.puntaje}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }



    return (
        <div>


            <div className="d-flex flex-column">
                <label className="form-label">Nombre {infoEstuid.Nombres + ' ' + infoEstuid.Apellidos}</label>
                <label className="form-label">Correo: {infoEstuid.Correo}</label>
                <label className="form-label">Puntaje: {infoEstuid.Puntaje}</label>
                <label className="form-label">Codigo de registro: {infoEstuid.codUser}</label>
            </div>

            <button className='btn orange' onClick={searchParti}>Ver todas las participaciones</button>
            <button className='btn orange' onClick={searchMsj}>Ver todas los mensajes enviados</button>
            <button className='btn orange' onClick={searchPunt}>Puntajes obtenidos en actividades</button>




            <div>
                <RenderItem></RenderItem>
            </div>







            <div>
                <div>
                    <button
                        className='btn orange'
                        onClick={sendIni}
                    >
                        Volver al inicio
                    </button>
                    <button
                        className='btn orange'
                        onClick={sendTablas}
                    >
                        Volver tablas
                    </button>
                </div>
            </div>
        </div>
    )
}
