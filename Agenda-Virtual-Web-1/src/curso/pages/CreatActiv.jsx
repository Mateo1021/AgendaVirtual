
import React, { useLayoutEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'

import "../../styles/styleCours.css"


export const CreatActiv = () => {
  document.body.style.backgroundColor = "#f5f5f5";
  const { idA, idC } = useParams();

  const navigate = useNavigate();

  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }

  const [titelShow, settitelShow] = useState('')
  const [bodyShow, setbodyShow] = useState('')
  const [activeAct, setactiveAct] = useState(false)
  const [responsEstud, setresponsEstud] = useState([])



  const [tipoSelect, settipoSelect] = useState(null)
  const [rankArray, setrankArray] = useState([])
  const [idUSers, setidUSers] = useState([])
  const [inasist, setinasist] = useState([])

  const [particForo, setparticForo] = useState([])
  const [diferenciaPart, setdiferenciaPart] = useState([])
  useLayoutEffect(() => {

    const unsub = onSnapshot(doc(db.db, "registrosForo", idA), (doc) => {
      settitelShow(doc.data().titulo);
      setbodyShow(doc.data().body)
      setactiveAct(doc.data().active == "1" ? true : false)
      setidUSers(doc.data().participacion)
    });

  }, [])


  useLayoutEffect(() => {
    const evetRef = collection(db.db, "respuestas");
    const q = query(evetRef, where("codRegistro", "==", idA), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resoponseEs = [];
      const codsRespuestas = []
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

        resoponseEs.push({
          nameUser: doc.data().nameUser,
          bodyMsj: doc.data().bodyMsj,
          createdAt: horaEnEspanol
        })
        codsRespuestas.push(doc.data().idUser)
      });
      setparticForo(codsRespuestas)
      setresponsEstud(resoponseEs)
    });


  }, [])

  useLayoutEffect(() => {
    const activyRef = collection(db.db, "rankingActividades");
    const qA = query(activyRef, where("codReg", "==", idA), orderBy("puntaje", "desc"));
    const unsubscribeS = onSnapshot(qA, (querySnapshot) => {
      const rank = [];
      querySnapshot.forEach((doc) => {
        const fecha = new Date(doc.data().createAt.seconds * 1000); // Crear una instancia de Date

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
        console.log(horaEnEspanol);
        rank.push({
          codReg: doc.data().codReg,
          codUser: doc.data().codUser,
          createAt: horaEnEspanol,
          nombreUser: doc.data().nombreUser,
          puntaje: doc.data().puntaje
        });
      });
      setrankArray(rank)
    });
  }, [])

  const updateActiv = async () => {
    const washingtonRef = doc(db.db, "registrosForo", idA);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      titulo: titelShow,
      body: bodyShow,
      active: activeAct == true ? '1' : 0
    });
    sendProyect()
  }

  const validarPuntos = async () => {

    const q = query(collection(db.db, "Usuarios"), where("idCurso", "==", idC));
    const querySnapshot = await getDocs(q);
    let idUSerTod = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      idUSerTod.push(doc.data())
    });


    const diff = [];
    idUSerTod.forEach((elem) => {
      if (!idUSers.includes(elem.codUser)) {
        diff.push(elem);
      }
    });
    setinasist(diff)

  }

  const validarForo = async () => {

    const q = query(collection(db.db, "Usuarios"), where("idCurso", "==", idC));
    const querySnapshot = await getDocs(q);
    let idUSerTod = []

    querySnapshot.forEach((doc) => {
      idUSerTod.push(doc.data())
    });
    const diff = [];
    idUSerTod.forEach((elem) => {

      if (!particForo.includes(elem.codUser)) {
        diff.push(elem);
      }
    });
    setdiferenciaPart(diff)

  }



  const RenderAction = () => {
    if (tipoSelect == '1') {
      return (
        <div>
          <div className='infoStuf'>
            <div className='titelCard'>
              <h4>Comentarios</h4>
            </div>

            <div className='scrollList'>
              {responsEstud.map((id, index) => (
                <div key={index} className="cardResponse d-flex flex-row justify-content-between">
                  <div >
                    <h5>{id.nameUser}</h5>

                    <h6>{id.bodyMsj}</h6>
                  </div>
                  <div >
                    <h5>fecha</h5>
                    <h6> {id.createdAt}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='infoStuf'>
            <div className='d-flex justify-content-end'>
              <button className='btn orange mt-5'
                onClick={validarForo}
              >
                validar participacion
              </button>
            </div>

            <div className='mt-4 mb-5'>
              <h4>Estudiantes que no participaron</h4>
              {diferenciaPart.map((id, index) => (
                <div key={index} className="cardResponse">
                  <li>{id.Nombres} {id.Apellidos}</li>
                </div>
              ))}
            </div>


          </div>
        </div>
      )
    } else if (tipoSelect == '2') {

      return (
        <div>
          <div className='infoStuf'>

            <div className='titelCard'>
              <h4>Puntajes</h4>
            </div>
            <div className='scrollList'>
              {rankArray.map((id, index) => (
                <div key={index}  className="cardResponse d-flex flex-row justify-content-between">
                  <div>
                    <h5>{id.nombreUser}</h5>
                    <h6>{id.puntaje}</h6>
                  </div>
                  <div>
                    <h5>fecha</h5>
                    <h6>{id.createAt}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='infoStuf'>
            <div className='d-flex justify-content-end'>
              <button className='btn orange mt-5'
                onClick={validarPuntos}
              >
                validar participacion
              </button>
            </div>
            <div className='mt-4 mb-5'>
              <h4>Estudiantes que no participaron</h4>
              {inasist.map((id, index) => (
                <div key={index} className="cardResponse">
                  <li key={index}>{id.Nombres} {id.Apellidos}</li>
                </div>
              ))}
            </div>
          </div>

        </div>
      )
    }
  }



  return (
    <div className=' mt-5'>
      <div className='infoStuf'>
        <div className='d-flex justify-content-center'>
          <h3 className='text-uppercase'>Informacion de la actividad</h3>
        </div>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="titel" className='titulo'>Actividad</Form.Label>
          <Form.Control
            className='mb-3'
            type="text"
            id="titel"
            aria-describedby="passwordHelpBlock"
            onChange={e => settitelShow(e.target.value)}
            value={titelShow}
          />

          <Form.Label htmlFor="bodyEvent">Descripción</Form.Label>
          <Form.Control as="textarea" id="bodyEvent" rows={3}
            onChange={e => setbodyShow(e.target.value)}
            value={bodyShow} />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Activar o desactivar los comentarios de los estudiantes"
            checked={activeAct}
            onChange={e => { setactiveAct(!activeAct) }}
          />
        </Form.Group>

        <div className='d-flex justify-content-between'>
          <button className='btn orange'
            onClick={updateActiv}
          >
            Actualizar actividad
          </button>

          <button className='btn orange'
            onClick={sendProyect}
          >
            Cancelar
          </button>
        </div>

        <Form.Select className='mt-5' onChange={e => settipoSelect(e.target.value)} aria-label="Default select example">
          <option value="0">Selecciona lo que quieres ver</option>
          <option value="1">Comentarios por usuario</option>
          <option value="2">Participacion en juego</option>
        </Form.Select>
      </div>




      <RenderAction></RenderAction>
    </div>
  )
}
