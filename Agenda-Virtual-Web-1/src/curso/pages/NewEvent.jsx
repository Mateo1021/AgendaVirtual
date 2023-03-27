import React from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'

import { doc, setDoc, query, collection, getDocs } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export const NewEvent = () => {
  const { idC } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [titel, settitel] = useState('')
  const [bodyEve, setbodyEve] = useState('')

  const navigate = useNavigate();
  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }



  const getIdEvent = async () => {

    const q = query(collection(db.db, "evento"));
    const querySnapshot = await getDocs(q);
    let idCours = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      idCours.push(doc.id.split('_')[1]);
    });
    idCours.sort((a, b) => {
      return a - b;
    });

    let idCoursDb = idCours[idCours.length - 1];
    let idCoursComplet = 'ev_' + (++idCoursDb);

    return (idCoursComplet);
  }
  const addEvent = async () => {
    let idResponse = await getIdEvent()
    console.log(titel, bodyEve, startDate, '..');

    await setDoc(doc(db.db, "evento", idResponse), {
      body: bodyEve,
      codEvento: idResponse,
      idCurso: idC,
      titulo: titel,
      createdAt: startDate
    });
    setStartDate( new Date())
    settitel('')
    setbodyEve('')
    navigate('/curso/editCurso/' + idC)
  }

  return (
    <div>
      <h1>Crear Nuevo Evento</h1>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="titel">Titulo para el evento</Form.Label>
        <Form.Control
          type="text"
          id="titel"
          aria-describedby="passwordHelpBlock"
          onChange={e => settitel(e.target.value)}
        />

      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="bodyEvent">Example textarea</Form.Label>
        <Form.Control as="textarea" id="bodyEvent" rows={3} onChange={e => setbodyEve(e.target.value)} />
      </Form.Group>


      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />


      <button className='btn orange'
        onClick={() => { addEvent() }}
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
