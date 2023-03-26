import React, { useLayoutEffect, useState } from 'react'
import { Cours } from './../components/Cours';
import { BtnCreateCours } from '../components/BtnCreateCours';
import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot,doc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'

export const EditCurso = () => {
  const {id} = useParams();
const [infoCours, setinfoCours] = useState({})
  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db.db, "Cursos", id), (doc) => {
      setinfoCours(doc.data());
      console.log(doc.data());
  });

  }, [])

  return (
    <>
    <div>
    <h1>{infoCours.nombreCurso} </h1>
    {<img src={infoCours.banerCurso}  style={styles.main}/>}
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
