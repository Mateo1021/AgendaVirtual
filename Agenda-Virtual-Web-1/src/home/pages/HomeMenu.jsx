import React, { useContext, useEffect } from 'react'
import { useLayoutEffect } from 'react';
import { AuthContext } from '../../auth'
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc,limit} from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';


export const HomeMenu = () => {

  const { user } = useContext(AuthContext);
  const [cursoByD, setcursoByD] = useState([])
  const [registr, setregistr] = useState([])

  const [notifi, setnotifi] = useState([])


  useEffect(() => {
    const coursoRef = collection(db.db, "Cursos");
    const qRef = query(coursoRef, where("codDocente", "==", user.name.id));
    const unsubscribe = onSnapshot(qRef, (querySnapshot) => {
      const curso = [];
      querySnapshot.forEach((doc) => {
        curso.push({ cod: doc.data().codCurso, name: doc.data().nombreCurso });
      });

      if (curso.length > 0) {
        let arrayReg = []
        const registros = [];
        for (let i in curso) {
          const regRef = collection(db.db, "registrosForo");
          const qReg = query(regRef, where("codProyecto", "==", curso[i].cod));
          const unsubscribe = onSnapshot(qReg, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
/*               registros.push({
                nombreReg: doc.data().titulo,
                nameCours: curso[i].name,
                codReg: doc.data().idRegistro
              }); */
              registros.push(doc.data())
            });
      console.log(registros);
            if (registros.length > 0) {
              let respuestaCompuest =[]
              for (let y in registros) {
                const respRef = collection(db.db, "respuestas");
                const qRes = query(respRef, where("codRegistro", "==", registros[y].codReg));
                const unsubscribe = onSnapshot(qRes, (querySnapshot) => {
                  const notificationShow = [];
                  querySnapshot.forEach((doc) => {
                    notificationShow.push({
                      msj:doc.data().bodyMsj,
                      userNAme:doc.data().nameUser,
                      curso:curso[i].name,
                      reg:registros[y].nombreReg
                    });


         
                  });

               
                });
              }
              
            }


          });

        }
      }

    });
  }, [])

  return (
    <div>
      <h1> Hola s{user?.name.nombre}</h1>
    </div>


  )
}
