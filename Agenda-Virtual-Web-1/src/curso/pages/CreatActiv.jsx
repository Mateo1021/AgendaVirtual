
import React, { useLayoutEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy,updateDoc} from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'

import "../../styles/styleCours.css"

export const CreatActiv = () => {
  const { idA, idC } = useParams();

  const navigate = useNavigate();

  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }




  const [titelShow, settitelShow] = useState('')
  const [bodyShow, setbodyShow] = useState('')
  const [activeAct, setactiveAct] = useState(false)

  const [responsEstud, setresponsEstud] = useState([])

  useLayoutEffect(() => {

    const unsub = onSnapshot(doc(db.db, "registrosForo", idA), (doc) => {
      settitelShow(doc.data().titulo);
      setbodyShow(doc.data().body)
      setactiveAct(doc.data().active == "1" ? true : false)
    });

  }, [])






  useLayoutEffect(() => {


    const evetRef = collection(db.db, "respuestas");
    const q = query(evetRef, where("codRegistro", "==", idA), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resoponseEs = [];
      querySnapshot.forEach((doc) => {
        resoponseEs.push(doc.data());
      });
      setresponsEstud(resoponseEs)
    });
  }, [])


const updateActiv= async ()=>{
  const washingtonRef = doc(db.db, "registrosForo", idA);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    titulo: titelShow,
    body:bodyShow,
    active:activeAct == true ? '1':0
  });
}


  return (
    <div>
      <h1>Tesssst{idA}</h1>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="titel">Titulo del Evento evento</Form.Label>
        <Form.Control
          type="text"
          id="titel"
          aria-describedby="passwordHelpBlock"
          onChange={e => settitelShow(e.target.value)}
          value={titelShow}
        />

      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="bodyEvent">Example textarea</Form.Label>
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


      <div className='containerCard'>
        <div className='titelCard'>
          <h4>Respuestas de los estudiantes</h4>
        </div>
        {responsEstud.map((id, index) => (
          <div key={index} className="cardResponse">
            <h5>{id.nameUser}</h5>

            <h6>{id.bodyMsj}</h6>
          </div>
        ))}
      </div>


    </div>
  )
}
