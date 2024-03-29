import React, { useLayoutEffect, useState, Arrow } from 'react'
import { Cours } from './../components/Cours';
import { BtnCreateCours } from '../components/BtnCreateCours';
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot, doc, orderBy } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import "../../styles/styleCours.css"

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


import Linkify from 'react-linkify';



export const EditCurso = () => {
  useLayoutEffect(() => {

    document.body.style.backgroundColor = "rgb(245 245 245 / 50%)";
  }, [])

  document.body.style.backgroundColor = "rgb(245 245 245 / 50%)";
  const { id } = useParams();
  const [infoCours, setinfoCours] = useState({})
  const [eventos, seteventos] = useState([])
  const [foros, setforos] = useState([])


  const navigate = useNavigate();
  const sedCreateActv = (idA) => {
    navigate('/curso/creatActiv/' + idA + '/' + id)
  }

  const sedCreateEven = (idE) => {
    navigate('/curso/createEvent/' + idE + '/' + id)
  }

  const sedNewAc = () => {
    navigate('/curso/newActiv/' + id)
  }
  const sedNewEve = () => {
    navigate('/curso/newEvent/' + id)
  }
  const sendStud = () => {
    navigate('/curso/listEstud/' + id)
  }

  const sendEditCurso = () => {
    navigate('/curso/configCurso/' + id)
  }

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db.db, "Cursos", id), (doc) => {
      setinfoCours(doc.data());
    });

  }, [])

  useLayoutEffect(() => {
    const evetRef = collection(db.db, "evento");
    const q = query(evetRef, where("idCurso", "==", id), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventos = [];
      querySnapshot.forEach((doc) => {
        eventos.push(doc.data());
      });
      seteventos(eventos)
    });
  }, [])

  useLayoutEffect(() => {
    const regRef = collection(db.db, "registrosForo");
    const q = query(regRef, where("codProyecto", "==", id), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foros = [];
      querySnapshot.forEach((doc) => {
        foros.push(doc.data());
      });
      setforos(foros)
    });

  }, [])


  function CardRend(info) {
    const visibility = React.useContext(VisibilityContext);
    return (
      <button style={{ backgroundColor: 'white', borderWidth: '0' }}
        onClick={() => { sedCreateEven(info.info.codEvento) }}
      >
        <Card style={{ width: '25rem', margin: '20px', height: '200px', borderColor: '#492013', boxShadow: '10px 5px 5px #492013' }}
          key={info.info.codEvento}
        >
          <Card.Body style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
            <Card.Title>{info.info.titulo}</Card.Title>
            <div className='hideenEvent'>
                <p>
                  {info.info.body}
                </p>
              </div>
          </Card.Body>
        </Card>
      </button>
    );
  }

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}
        style={{ backgroundColor: "white", borderWidth: "0" }}>
        <IoChevronBackSharp >

        </IoChevronBackSharp>
      </button>


    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <button disabled={isLastItemVisible} onClick={() => scrollNext()}
        style={{ backgroundColor: "white", borderWidth: "0" }}
      >
        <IoChevronForwardSharp></IoChevronForwardSharp>
      </button>

    );
  }

  function CardRendF(info) {
    const visibility = React.useContext(VisibilityContext);
    return (
      <button style={{ backgroundColor: 'white', borderWidth: '0' }}
        onClick={() => { sedCreateActv(info.info.idRegistro) }}
      >
        <Card style={{ width: '25rem', margin: '20px', height: '200px', borderColor: '#492013', boxShadow: '10px 5px 5px #492013' }}
          key={info.info.idRegistro}
        >
          <Card.Body style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
            <Card.Title>{info.info.titulo}</Card.Title>

            <Linkify>
              <div className='hideenEvent'>
                <p>
                  {info.info.body}
                </p>
              </div>
            </Linkify>

          </Card.Body>
        </Card>
      </button>
    );
  }

  function LeftArrowF() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}
        style={{ backgroundColor: "white", borderWidth: "0" }}>
        <IoChevronBackSharp >

        </IoChevronBackSharp>
      </button>


    );
  }

  function RightArrowF() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <button disabled={isLastItemVisible} onClick={() => scrollNext()}
        style={{ backgroundColor: "white", borderWidth: "0" }}
      >
        <IoChevronForwardSharp></IoChevronForwardSharp>
      </button>

    );
  }

  return (
    <>
      <div>
        {<img src={infoCours.banerCurso} className="banner" />}
        <div>
          <div className='infoStuf pt-5'>
            <div className='d-flex justify-content-center'>
              <h1 className='titelPage text-uppercase'>{infoCours.nombreCurso} </h1>
            </div>
            <div className='d-flex justify-content-between px-3 pt-5'>
              <button className="d-flex btn orange text-white"
                onClick={() => { sendEditCurso() }}
              >
                Modificar curso
              </button>

              <button className="d-flex btn orange text-white"
                onClick={() => { sendStud() }}
              >
                Lista Estudiantes
              </button>
            </div>
          </div>



          <div className='infoStuf'>
            <div className='subTitels'>
              <h4>Eventos</h4>
            </div>
            <div>
              <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >
                {eventos.map((id) => (
                  <CardRend
                    info={id}
                    key={id.codEvento}
                  />
                ))}
              </ScrollMenu>
            </div>
            <div className='btnAdd'>
              <button className="btn orange text-white "
                onClick={() => { sedNewEve() }}
              >
                Crear nuevo evento
              </button>
            </div>
          </div>


          <div className='infoStuf'>
            <div>
              <h4 className='subTitels'>
                Actividades
              </h4>
            </div>

            <ScrollMenu LeftArrow={LeftArrowF} RightArrow={RightArrowF} >
              {foros.map((id) => (
                <CardRendF
                  info={id}
                  key={id.idRegistro}
                />
              ))}
            </ScrollMenu>

            <div className='btnAdd'>
              <button className="btn orange text-white "
                onClick={() => { sedNewAc() }}
              >
                Crear nueva actividad
              </button>
            </div>
          </div>
        </div>



      </div>
    </>
  )
}








const styles = {
  main: {
    backgroundColor: "red",
    width: "100%",
  },
  inputText: {
    padding: "10px",
    color: "red",
  },
};
