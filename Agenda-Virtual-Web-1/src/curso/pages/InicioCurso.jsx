import React, { useLayoutEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { BtnCreateCours } from '../components/BtnCreateCours';
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";


export const InicioCurso = () => {
  const navigate = useNavigate();
  const sendCours =(id)=>{
    navigate('/curso/editCurso/' + id,{replace:true})
  }

  const [Cursos, setCursos] = useState([])

  useLayoutEffect(() => {

    const infoPro = JSON.parse(sessionStorage.getItem("codUserWb"))

    const q = query(collection(db.db, "Cursos"), where("codDocente", "==", infoPro.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cursos = [];
      querySnapshot.forEach((doc) => {
        cursos.push(doc.data());
      });
      setCursos(cursos)
    });
  }, [])

  function CardRend(info) {
    const visibility = React.useContext(VisibilityContext);
    return (
      <Card style={{display: 'flex', justifyContent: 'space-evenly', width: '18rem', margin: '20px', height: '400px' }}>
        <Card.Img variant="top" src={info.info.banerCurso} />
        <Card.Body>
          <Card.Title>{info.info.nombreCurso}</Card.Title>
          <Card.Text>
            {info.info.largeDescription}
          </Card.Text>
          <Button variant="primary" onClick={() => {sendCours(info.info.codCurso)}}>Ver curso</Button>
        </Card.Body>
      </Card>
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

  return (
    <>
      <div>

        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >
          {Cursos.map((id) => (
            <CardRend
              info={id}
              key={id.codCurso}
            />
          ))}
        </ScrollMenu>


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