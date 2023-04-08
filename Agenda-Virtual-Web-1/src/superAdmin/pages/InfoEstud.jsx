import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc, getDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import Table from 'react-bootstrap/Table';


export const InfoEstud = () => {
    document.body.style.background = "linear-gradient(90.04deg, rgb(225 225 225 / 76%) 0.03%, rgb(230, 228, 227) 99.96%)";

    const { idU } = useParams();
    const navigate = useNavigate();


    const [infoEstuid, setinfoEstuid] = useState([])

    const [optionSelect, setoptionSelect] = useState(null)

    const [partis, setpartis] = useState([])
    const [msjes, setmsjes] = useState([])
    const [puntos, setpuntos] = useState([])

    const [searchReg, setsearchReg] = useState([])
    const [cantTxt, setcantTxt] = useState(0)
    const [saveInfo, setsaveInfo] = useState([])


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
        setsaveInfo(arrayinfo)
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
        setsaveInfo(arrayinfo)
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
        setsaveInfo(arrayinfo)
    }

    const searchTable = (txt) => {

        let arraySearh = []
        let newArray = []

        if (cantTxt > txt.length) {
            arraySearh = saveInfo;
        } else {
            if (optionSelect == '1') {
                arraySearh = partis;
            } else if (optionSelect == '2') {
                arraySearh = msjes;
            } else if (optionSelect == '3') {
                arraySearh = puntos;
            }
        }

        for (let y in arraySearh) {
            if (JSON.stringify(arraySearh[y]).replaceAll('"', " ").toLowerCase().includes(txt.toLowerCase())) {
                newArray.push(arraySearh[y])
            }
        }

        setcantTxt(txt.length)

        if (optionSelect == '1') {
            setpartis(newArray)
        } else if (optionSelect == '2') {
            setmsjes(newArray)
        } else if (optionSelect == '3') {
            setpuntos(newArray)
        }
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
        <div className='mt-5'>


            <div className="d-flex flex-row justify-content-between infoStuf">
                <div>
                    <p>Nombre: {infoEstuid.Nombres + ' ' + infoEstuid.Apellidos}</p>
                    <p>Correo: {infoEstuid.Correo}</p>
                    <p>Puntaje: {infoEstuid.Puntaje}</p>
                    <p>Codigo de registro: {infoEstuid.codUser}</p>
                </div>

                <div className='d-flex flex-column mt-2 mb-2 justify-content-between'>
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

            <div className='infoStuf d-flex justify-content-evenly'>
                <button className='btn orange' onClick={searchParti}>Ver todas las participaciones</button>
                <button className='btn orange' onClick={searchMsj}>Ver todas los mensajes enviados</button>
                <button className='btn orange' onClick={searchPunt}>Puntajes obtenidos en actividades</button>
            </div>



            <div className='infoStuf'>
                <div className='d-flex justify-content-end mt-3'>
                    <input className='form-control w-25' onChange={(e) => searchTable(e.target.value)} ></input>
                </div>
                <RenderItem></RenderItem>
            </div>



        </div>
    )
}
