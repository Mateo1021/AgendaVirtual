import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { async } from '@firebase/util';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc, getDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import Table from 'react-bootstrap/Table';
import { FiUserCheck } from "react-icons/fi";
export const InfoCours = () => {
    document.body.style.background = "linear-gradient(90.04deg, rgb(225 225 225 / 76%) 0.03%, rgb(230, 228, 227) 99.96%)";

    const { idU } = useParams();
    const navigate = useNavigate();

    const [datosCurso, setdatosCurso] = useState([])
    const [optionSelect, setoptionSelect] = useState(null)
    const [actividades, setactividades] = useState([])
    const [eventos, seteventos] = useState([])
    const [msjs, setmsjs] = useState([])


    const [estudCurso, setestudCurso] = useState([])
    const [inasist, setinasist] = useState([])
    const [showAsist, setshowAsist] = useState(false)

    const [inasistActi, setinasistActi] = useState([])


    const [saveInfo, setsaveInfo] = useState([])
    const [cantTxt, setcantTxt] = useState(0)

    const sendIni = () => {
        navigate('/admin')
    }
    const sendTablas = () => {
        navigate('/listaDocentes')
    }
    const getInfoCurso = async () => {
        const docRef = doc(db.db, "Cursos", idU);
        const docSnap = await getDoc(docRef);
        setdatosCurso(docSnap.data())
    }
    useLayoutEffect(() => {
        getInfoCurso()

    }, [])

    function segundosAFecha(segundos) {
        var fecha = new Date(segundos * 1000); // convierte los segundos a milisegundos
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1; // los meses en JavaScript comienzan en 0, por lo que hay que sumar 1
        var año = fecha.getFullYear();
        return dia + '/' + mes + '/' + año;
    }


    const getActivs = async () => {
        setshowAsist(false)
        const q = query(collection(db.db, "registrosForo"), where("codProyecto", "==", idU));
        let arrayinfo = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!Object.entries(doc.data()).length == 0) {
                arrayinfo.push({
                    active: doc.data().active,
                    body: doc.data().body,
                    createdAt: segundosAFecha(doc.data().createdAt.seconds),
                    idRegistro: doc.data().idRegistro,
                    titulo: doc.data().titulo,
                    participacion: doc.data().participacion
                });
            }
        });
        setactividades(arrayinfo)
        setsaveInfo(arrayinfo)
        setoptionSelect('1')
    }

    const getEvents = async () => {
        setshowAsist(false)
        const q = query(collection(db.db, "evento"), where("idCurso", "==", idU));
        let arrayinfo = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!Object.entries(doc.data()).length == 0) {
                arrayinfo.push({
                    codEvento: doc.data().codEvento,
                    titulo: doc.data().titulo,
                    body: doc.data().body,
                    passAsis: doc.data().passAsis,
                    createdAt: segundosAFecha(doc.data().createdAt.seconds),
                    asistencia: doc.data().asistencia
                });
            }
        });
        seteventos(arrayinfo)
        setsaveInfo(arrayinfo)
        setoptionSelect('2')
    }

    const getMsj = async () => {
        setshowAsist(false)
        const q = query(collection(db.db, "chats"), where("cours", "==", idU));
        let arrayinfo = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (!Object.entries(doc.data()).length == 0) {
                arrayinfo.push({
                    _id: doc.data()._id,
                    idUser: doc.data().idUser,
                    text: doc.data().text,
                    createdAt: segundosAFecha(doc.data().createdAt.seconds),
                });
            }
        });
        setmsjs(arrayinfo)
        setsaveInfo(arrayinfo)
        setoptionSelect('3')
    }



    const ValidAsistencia = async (paramAsist) => {
        setshowAsist(true)
        console.log(paramAsist);
        const q = query(collection(db.db, "Usuarios"), where("idCurso", "==", idU));
        const querySnapshot = await getDocs(q);
        let idUSerTod = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            idUSerTod.push(doc.data())
        });

        const diff = [];
        idUSerTod.forEach((elem) => {
            if (!paramAsist.includes(elem.codUser)) {
                diff.push(elem);
            }
        });

        setestudCurso(idUSerTod)
        setinasist(diff)

    }


    const RenderAsist = () => {
        if (showAsist) {
            return (
                <div className='d-flex flex-row justify-content-evenly' >

                    <div >
                        <h5>Estudiantes del curso</h5>
                        {estudCurso.map((item, index) => (
                            <li key={index}>{item.Nombres}</li>
                        ))}
                    </div>

                    <div >
                        <h5>Estudiantes que no marcaron asistencia</h5>
                        {inasist.map((item, index) => (
                            <li key={index}>{item.Nombres}</li>
                        ))}
                    </div>

                </div>
            )
        }
    }



    const searchTable = (txt) => {

        let arraySearh = []
        let newArray = []

        if (cantTxt > txt.length) {
            arraySearh = saveInfo;
        } else {
            if (optionSelect == '1') {
                arraySearh = actividades;
            } else if (optionSelect == '2') {
                arraySearh = eventos;
            } else if (optionSelect == '3') {
                arraySearh = msjs;
            }
        }

        for (let y in arraySearh) {
            if (JSON.stringify(arraySearh[y]).replaceAll('"', " ").toLowerCase().includes(txt.toLowerCase())) {
                newArray.push(arraySearh[y])
            }
        }

        setcantTxt(txt.length)

        if (optionSelect == '1') {
            setactividades(newArray)
        } else if (optionSelect == '2') {
            seteventos(newArray)
        } else if (optionSelect == '3') {
            setmsjs(newArray)
        }
    }


    const RenderItem = () => {
        if (optionSelect == '1') {
            return (
                <div>
                    <Table striped bordered hover size="sm" responsive="sm">
                        <thead>
                            <tr>
                                <th>Codigo de la actividad</th>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Ver participacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actividades.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.idRegistro}</td>
                                    <td>{item.titulo}</td>
                                    <td>{item.body}</td>
                                    <td>{item.active == '1' ? 'activa' : 'in activa'}</td>
                                    <td>{item.createdAt}</td>
                                    <td><FiUserCheck onClick={() => ValidAsistencia(item.participacion)}></FiUserCheck></td>
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
                                <th>Codigo del evento</th>
                                <th>Titulo</th>
                                <th>Descripcion del evento</th>
                                <th>Clave para la asistencia</th>
                                <th>Fecha del evento</th>
                                <th>Validas asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codEvento}</td>
                                    <td>{item.titulo}</td>
                                    <td>{item.body}</td>
                                    <td>{item.passAsis}</td>
                                    <td>{item.createdAt}</td>
                                    <td><FiUserCheck onClick={() => ValidAsistencia(item.asistencia)}></FiUserCheck></td>
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
                                <th>Id inico de mensaje</th>
                                <th>Id del usuario</th>
                                <th>Texto enviado</th>
                                <th>Fecha de envio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {msjs.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.idUser}</td>
                                    <td>{item.text}</td>
                                    <td>{item.createdAt}</td>
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
                <div className='d-flex flex-column' >
                    <p className="form-label">Nombre del curso: {datosCurso.nombreCurso}</p>
                    <p className="form-label">Nombre del profesor: {datosCurso.nombreDocente}</p>
                    <p className="form-label">Codigo del curso: {datosCurso.codCurso}</p>
                    <p className="form-label">Clave de ingreso: {datosCurso.claveDingreso}</p>
                    <p className="form-label">Clave de Salida: {datosCurso.ClaveDSalida}</p>
                    <p className="form-label">Cantidad de estudiantes: {datosCurso.ClaveDSalida}</p>
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
                <button className='btn orange' onClick={getActivs}>Ver todas las actividades creadas</button>
                <button className='btn orange' onClick={getEvents}>Ver todos los eventos creados</button>
                <button className='btn orange' onClick={getMsj}>Ver todos los msj</button>
            </div>

            <div className='infoStuf'>
                <div className='d-flex justify-content-end mt-3'>
                    <input className='form-control w-25' onChange={(e) => searchTable(e.target.value)} ></input>
                </div>
                <RenderItem></RenderItem>

                <RenderAsist></RenderAsist>
            </div>

        </div >
    )
}
