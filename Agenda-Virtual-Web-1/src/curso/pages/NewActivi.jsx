
import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'


export const NewActivi = () => {

  const { idC } = useParams();

  const [titulo, settitulo] = useState('')
  const [bodyAc, setbody] = useState('')
  const [dateReg, setdateReg] = useState(new Date())


  const navigate = useNavigate();
  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }
  const getIdReg = async () => {

    const q = query(collection(db.db, "registrosForo"));
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
    let idCoursComplet = 'reg_' + (++idCoursDb);

    return (idCoursComplet);
  }
  const addReg = async () => {
    let idResponse = await getIdReg()

    await setDoc(doc(db.db, "registrosForo", idResponse), {
      body: bodyAc,
      idRegistro: idResponse,
      codProyecto: idC,
      titulo: titulo,
      createdAt: dateReg,
      file: 'test',
      active:'1'
    });
    setbody('')
    settitulo('')
    sendProyect()
  }


  
  return (
    <div>
      <h1>New activi {idC}</h1>


      <Form.Group className="mb-3" >
        <Form.Label htmlFor="titel">Titulo para el evento</Form.Label>
        <Form.Control
          type="text"
          id="titel"
          aria-describedby="passwordHelpBlock"
          onChange={e => settitulo(e.target.value)}
        />

      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="bodyEvent">Example textarea</Form.Label>
        <Form.Control as="textarea" id="bodyEvent" rows={3} onChange={e => setbody(e.target.value)} />
      </Form.Group>


      <button
        onClick={addReg}
        className='btn orange'
      >
        Test
      </button>
      <button
        onClick={sendProyect}
        className='btn orange'
      >
        Cancelar
      </button>
    </div>
  )
}
