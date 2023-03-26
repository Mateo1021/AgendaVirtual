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

export const EditCurso = () => {
  const { id } = useParams();
  const [infoCours, setinfoCours] = useState({})
  const [eventos, seteventos] = useState([])
  const [foros, setforos] = useState([])



  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
      ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id);

        setSelected((currentSelected) =>
          itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
      };



  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db.db, "Cursos", id), (doc) => {
      setinfoCours(doc.data());
      console.log(doc.data());
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
      console.log(eventos);
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
      console.log(foros);
    });

  }, [])


  function CardRend(info) {
    const visibility = React.useContext(VisibilityContext);
console.log(info);
    return (
      <Card style={{ width: '18rem' ,margin:'20px' ,height:'200px'}}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{info.info.titulo}</Card.Title>
        <Card.Text>
          {info.info.body}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    );
  }

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <button disabled={isFirstItemVisible} onClick={() => scrollPrev()} 
      style={{backgroundColor:"white",borderWidth:"0"}}>
        <IoChevronBackSharp >

        </IoChevronBackSharp>
      </button>


    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <button disabled={isLastItemVisible} onClick={() => scrollNext()}
      style={{backgroundColor:"white",borderWidth:"0"}}
      >
        <IoChevronForwardSharp></IoChevronForwardSharp>
      </button>

    );
  }

  return (
    <>
      <div>
        {<img src={infoCours.banerCurso} className="banner" />}
        <h1>{infoCours.nombreCurso} </h1>


        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >
          {eventos.map((id) => (
            <CardRend
            info={id}
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
