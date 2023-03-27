import React, { useContext, useEffect } from 'react'
import { useLayoutEffect } from 'react';
import { AuthContext } from '../../auth'
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc, limit } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const HomeMenu = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendActiv = (idReg, idCour) => {
    navigate('/curso/creatActiv/'+ idReg+'/'+idCour)
  }


  const [cursoByD, setcursoByD] = useState([])
  const [registr, setregistr] = useState([])

  const [notifi, setnotifi] = useState([])



  const getCours = async () => {
    let idCursos = []
    const coursoRef = collection(db.db, "Cursos");
    const q = query(coursoRef, where("codDocente", "==", user.name.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      idCursos.push({ cod: doc.data().codCurso, name: doc.data().nombreCurso });
    });


    return (idCursos)
  }

  const getRegistros = async () => {

    let arrayCursos = await getCours()
    let idRegistros = []
    if (arrayCursos.length > 0) {
      for (let i in arrayCursos) {
        const regRef = collection(db.db, "registrosForo");
        const q = query(regRef, where("codProyecto", "==", arrayCursos[i].cod));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          idRegistros.push({
            titelReg: doc.data().titulo,
            nameCours: arrayCursos[i].name,
            codReg: doc.data().idRegistro,
            idCours: arrayCursos[i].cod,
          });
        });
      }
    }
    return (idRegistros)

  }
  const getRespuestas = async () => {
    let arrayReg = await getRegistros()
    let arrayCompuesto = []
    if (arrayReg.length > 0) {
      for (let i in arrayReg) {
        let respuestas = []
        const respRef = collection(db.db, "respuestas");
        const q = query(respRef, where("codRegistro", "==", arrayReg[i].codReg));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          respuestas.push({
            tituloRes: arrayReg[i].titelReg,
            userPlublic: doc.data().nameUser,
            msj: doc.data().bodyMsj,
            cours: arrayReg[i].nameCours,
            codReg: arrayReg[i].codReg,
            idCours: arrayReg[i].idCours,
          });
        });
        arrayCompuesto.push(respuestas);
      }
    }

    let arrayDesestructurado = []
    for (let p in arrayCompuesto) {
      if (arrayCompuesto[p].length > 0) {
        for (let x in arrayCompuesto[p]) {
          arrayDesestructurado.push(arrayCompuesto[p][x])
        }
      }
    }
    setnotifi(arrayDesestructurado);
  }
  useLayoutEffect(() => {
    const q = query(collection(db.db, "respuestas"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      getRespuestas()
    });
  }, [])


  console.log(notifi);


  return (
    <div>
      <h1> Hola s{user?.name.nombre}</h1>


      <div className='containerCard'>
        <div className='titelCard'>
          <h4>Respuestas de los estudiantes</h4>
        </div>
        {notifi.map((id, index) => (
          <button
          onClick={()=>{sendActiv(id.codReg,id.idCours)}}
          key={index}
          >
            <div className="cardResponse">
              <h5>{id.cours}</h5>

              <h6>{id.tituloRes}</h6>
              <h6>{id.msj}</h6>
              <h6>{id.userPlublic}</h6>
            </div>
          </button>
        ))}
      </div>

    </div>


  )
}
