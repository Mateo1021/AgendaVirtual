import React, { useContext, useEffect } from 'react'
import { useLayoutEffect } from 'react';
import { AuthContext } from '../../auth'
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc, limit } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/StayleClass.css'
import { NavBar } from '../../navigators/components/NavBar';


export const HomeMenu = () => {

  document.body.style.backgroundColor = "rgb(245 245 245 / 50%)";

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendActiv = (idReg, idCour) => {
    navigate('/curso/creatActiv/' + idReg + '/' + idCour)
  }


  const [cursoByD, setcursoByD] = useState([])
  const [registr, setregistr] = useState([])

  const [notifi, setnotifi] = useState([])



  const getCours = async () => {
    let idCursos = []
    const coursoRef = collection(db.db, "Cursos");
    const q = query(coursoRef, where("codDocente", "==", user.name.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      idCursos.push({ cod: doc.data().codCurso, name: doc.data().nombreCurso });
    });


    return (idCursos)
  }

  const getRegistros = async () => {

    let arrayCursos = await getCours()
    let idRegistros = []
    if (arrayCursos.length > 0) {
      for (let i in arrayCursos) {
        const regRef = collection(db.db, "registrosForo");
        const q = query(regRef, where("codProyecto", "==", arrayCursos[i].cod));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          idRegistros.push({
            titelReg: doc.data().titulo,
            nameCours: arrayCursos[i].name,
            codReg: doc.data().idRegistro,
            idCours: arrayCursos[i].cod,
          });
        });
      }
    }
    return (idRegistros)

  }
  const getRespuestas = async () => {
    let arrayReg = await getRegistros()
    let arrayCompuesto = []
    if (arrayReg.length > 0) {
      for (let i in arrayReg) {
        let respuestas = []
        const respRef = collection(db.db, "respuestas");
        const q = query(respRef, where("codRegistro", "==", arrayReg[i].codReg));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

          const fecha = new Date(doc.data().createdAt.seconds * 1000); // Crear una instancia de Date

          // Opciones de formato para imprimir la hora en español (España)
          const opciones = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
            timeZone: 'America/Bogota',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZoneName: 'short',
            locale: 'es-CO' // Configuración regional y el idioma en español (España)
          };

          const horaEnEspanol = fecha.toLocaleTimeString('es-CO', opciones);


          respuestas.push({
            tituloRes: arrayReg[i].titelReg,
            userPlublic: doc.data().nameUser,
            msj: doc.data().bodyMsj,
            cours: arrayReg[i].nameCours,
            codReg: arrayReg[i].codReg,
            idCours: arrayReg[i].idCours,
            createdAt: horaEnEspanol
          });
        });
        arrayCompuesto.push(respuestas);
      }
    }

    let arrayDesestructurado = []
    for (let p in arrayCompuesto) {
      if (arrayCompuesto[p].length > 0) {
        for (let x in arrayCompuesto[p]) {
          arrayDesestructurado.push(arrayCompuesto[p][x])
        }
      }
    }
    setnotifi(arrayDesestructurado);
  }
  useLayoutEffect(() => {
    const q = query(collection(db.db, "respuestas"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      getRespuestas()
    });
  }, [])



  return (
    <div className='fondo'>

      <div className='paddinForceInicio'>

        <h1 className='px-4 pt-3 titulo'> Bienvenido {user?.name.nombre} {user?.name.apellidos}</h1>


        <div className='titelCard'>
          <h2 className='titulomenor'>Actividad reciente en sus cursoss</h2>
        </div>

        <div className='d-flex flex-column px-0 contInicio pb-5'>
          {notifi.map((id, index) => (

            <div
              className='divInicio'
              onClick={() => { sendActiv(id.codReg, id.idCours) }}
              key={index}
            >


              <div>
                <h4>{id.cours}</h4>
              </div>

              <div className='infoComent'>
                <div>
                  <h4>{id.userPlublic}</h4>
                </div>
                <div>
                  <h6>Actividad: {id.tituloRes}</h6>
                  <p>{id.msj}</p>
                </div>
                <div className='d-flex justify-content-end'>
                  <p>{id.createdAt}</p>
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>


    </div>


  )
}
