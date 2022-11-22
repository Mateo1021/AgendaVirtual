import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, where } from "firebase/firestore";

let idCurso="";
let codCuors;
let codProfesor;
let nameProfesor;
let user ="";

export const CreateCours = () => {


  const [dataCours, setDataCours] = useState({
    nombreC:'',
    temasC:'',
    nameBanner:''
});
const database = db
useEffect(() => {
  const auth = getAuth();
  try {
    user = auth.currentUser.email;
    console.log(user);
  } catch (error) {
    
  }


  const obtenerDatos= async()=>{
   const querySnapshot = await getDocs(collection(database.db, "Cursos"));
   querySnapshot.forEach((doc) => {
     idCurso = doc.id;
   });
  }
  obtenerDatos();

  const obtenercodProf= async()=>{
    const q = query(collection(database.db, "UsuariosWeb"), where("correo", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      codProfesor = doc.data().id
      nameProfesor = doc.data().nombre
    });
  }
  obtenercodProf();

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
 await setDoc(doc(database.db, "Cursos", codCuors), {
   apellidosDocente:"Test",
   banerCurso:dataCours.nameBanner,
   cantEstudiantes:"0",
   codCurso: codCuors,
   codDocente:codProfesor,
   idActividades:"2",
   idForo:"0",
   idNotas:"0",
   nombreCurso:dataCours.nombreC,
   nombreDocente:"test",
   temas:dataCours.temasC,
   uid:"123"
 });
}


  return (
    <div className='p-5'>
        <h1>Crear Curso</h1>
        <div className="mb-3">
        <label  className="form-label">Nombre Curso</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
        onChange={(eve) => setDataCours({ ...dataCours,nombreC:eve.target.value})}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">Temas Del Curso</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
        onChange={(eve) => setDataCours({ ...dataCours,temasC:eve.target.value})}
        ></textarea>
        </div>
        <div className="mb-3">
        <label className="form-label">Banner para el curos</label>
        <input className="form-control" type="file" id="formFile"
        onChange={(eve) => setDataCours({ ...dataCours,nameBanner:eve.target.value})}
        />
        </div>
        <button type="button" className="btn btn-primary" onClick={createCurs}>Crear</button>
    </div>
  )
}
