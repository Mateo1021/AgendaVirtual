 import React, { useEffect, useState } from 'react'
 import { collection, getDocs } from "firebase/firestore";
import db from './firebase/firebaseConfig'
import { doc, setDoc } from "firebase/firestore";

let idCurso="";
let codCuors;
 export const App = () => {

const [dataCours, setdataCours] = useState({
  nombreCurso:"",
  nombreDocente:"",
  temas:"",
})
   useEffect(() => {
     const obtenerDatos= async()=>{
      const querySnapshot = await getDocs(collection(db, "Cursos"));
      querySnapshot.forEach((doc) => {
        idCurso = doc.id;
      });
     }
     obtenerDatos();
  
   }, [])


   const test = () =>{
     let codTemp;
    console.log(idCurso);
    console.log(idCurso.split('_'));
    codTemp = parseInt(idCurso.split('_')[1])+1;
    codCuors = "pg_"+codTemp;
    console.log(codCuors);
    console.log(dataCours.nombreCurso , dataCours.nombreDocente, dataCours.temas);
   }

   const createCurs = async() =>{
    test();
    await setDoc(doc(db, "Cursos", codCuors), {
      apellidosDocente:"Test",
      banerCurso:"2",
      cantEstudiantes:"0",
      codCurso: codCuors,
      codDocente:"2",
      idActividades:"2",
      idForo:"2",
      idNotas:"2",
      nombreCurso:dataCours.nombreCurso,
      nombreDocente:dataCours.nombreDocente,
      temas:dataCours.temas,
      uid:"123"
    });
   }


   return (
      <div>
       <h1>Formulario Agregar Cursos</h1>
       <label>nombre Curso</label>
       <input type={'text'} onChange={(eve) => setdataCours({ ...dataCours,nombreCurso:eve.target.value})}></input>
       <label>nombre Docente</label>
       <input type={'text'} onChange={(eve) => setdataCours({ ...dataCours,nombreDocente:eve.target.value})}></input>
       <label>temas</label>
       <input type={'text'} onChange={(eve) => setdataCours({ ...dataCours,temas:eve.target.value})}></input>

       <button onClick={createCurs}>Agregar curso</button>
       <button onClick={test}>Test</button>
      </div>
   )
 }
 export default App;
 