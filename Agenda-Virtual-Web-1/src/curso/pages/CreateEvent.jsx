
import React, { useLayoutEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/styleCours.css"


export const CreateEvent = () => {
  const { idE, idC } = useParams();
  const navigate = useNavigate();


  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }

  const [titelShow, settitelShow] = useState('')
  const [bodyShow, setbodyShow] = useState('')
  const [startDate, setStartDate] = useState(new Date());



  useLayoutEffect(() => {

    const unsub = onSnapshot(doc(db.db, "evento", idE), (doc) => {
      settitelShow(doc.data().titulo);
      setbodyShow(doc.data().body)
      setStartDate(doc.data().createdAt.toDate())
    });

  }, [])

const uptadeEvent =async ()=>{
  const washingtonRef = doc(db.db, "evento", idE);
  await updateDoc(washingtonRef, {
    titulo: titelShow,
    body:bodyShow,
    createdAt:startDate
  });

  sendProyect()
}
  return (
    <div>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="titel">Titulo para el evento</Form.Label>
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
        <Form.Control as="textarea" id="bodyEvent" rows={3} onChange={e => setbodyShow(e.target.value)}
          value={bodyShow}
        />
      </Form.Group>

      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      <button className='btn orange'
        onClick={() => { uptadeEvent()}}
      >
        Crear Evento
      </button>
      <button className='btn orange'
        onClick={sendProyect}
      >
        Cancelar
      </button>
    </div>
  )
}
