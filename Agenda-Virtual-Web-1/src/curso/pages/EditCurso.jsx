import React, { useLayoutEffect, useState, Arrow } from 'react'
import { Cours } from './../components/Cours';
import { BtnCreateCours } from '../components/BtnCreateCours';
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import "../../styles/styleCours.css"

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export const EditCurso = () => {
  const { id } = useParams();
  const [infoCours, setinfoCours] = useState({})
  const [eventos, seteventos] = useState([])
  const [foros, setforos] = useState([])




    const navigate = useNavigate();
    const sedCeate =(id)=>{
      navigate('/curso/creatActiv/' + id,{replace:true})
    }



    const sedNewAc =()=>{
      navigate('/curso/newActiv',{replace:true})
    }
    const sedNewEve =()=>{
      navigate('/curso/newEvent',{replace:true})
    }

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db.db, "Cursos", id), (doc) => {
      setinfoCours(doc.data());
    });

  }, [])

  useLayoutEffect(() => {

    const q = query(collection(db.db, "evento"), where("idCurso", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventos = [];
      querySnapshot.forEach((doc) => {
        eventos.push(doc.data());
      });
      seteventos(eventos)
    });
  }, [])

  useLayoutEffect(() => {
    const q = query(collection(db.db, "registrosForo"), where("codProyecto", "==", id));
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
      <button style={{ backgroundColor: 'white', borderWidth: '0'}}
      onClick={()=> {sedCeate(info.info.codEvento)}}
      >
      <Card style={{ width: '18rem', margin: '20px', height: '200px' }}
        key={info.info.codEvento}
      >
        <Card.Body style={{display:'flex', justifyContent: 'space-evenly' ,flexDirection:'column'}}>
          <Card.Title>{info.info.titulo}</Card.Title>
          <Card.Text>
            {info.info.body}
          </Card.Text>
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
      <button style={{ backgroundColor: 'white', borderWidth: '0'}}
      onClick={()=> {console.log(info.info.idRegistro)}}
      >
      <Card style={{ width: '18rem', margin: '20px', height: '200px' , flexDirection:''}}
        key={info.info.idRegistro}
      >
        <Card.Body style={{display:'flex', justifyContent: 'space-evenly' ,flexDirection:'column'}}>
          <Card.Title>{info.info.titulo}</Card.Title>
          <Card.Text>
            {info.info.body}
          </Card.Text>
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
        <h1 className='titelPage'>{infoCours.nombreCurso} </h1>

        <div className='eventos'>
          <div className='subTitels'>
            <h4>Eventos</h4>
          </div>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >
            {eventos.map((id) => (
              <CardRend
                info={id}
                key={id.codEvento}
              />
            ))}
          </ScrollMenu>
          <div className='btnAdd'>
            <button className="btn orange text-white "
            onClick={()=>{sedNewEve()}}
            >
              Crear nuevo evento
            </button>
          </div>
        </div>


        <div className='actividades'>
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
            onClick={()=> {sedNewAc()}}
            >
              Crear nueva actividad
            </button>
          </div>
        </div>


      </div>
    </>
  )
}








const styles = {
  main: {
    backgroundColor: "#f1f1f1",
    width: "100%",
  },
  inputText: {
    padding: "10px",
    color: "red",
  },
};
