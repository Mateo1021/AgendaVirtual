import React, { useEffect, useLayoutEffect, useState } from 'react'

import db from '../../../firebase/firebaseConfig'
import { doc, setDoc } from "firebase/firestore";


import { collection, query, where, getDoc, updateDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const storage = getStorage();

let idCurso = "";
let codCuors;
let codProfesor;
let nameProfesor;
let user = "";


export const ChangeCours = () => {


  document.body.style.backgroundColor = "#f5f5f5";
  let base = db

  const { id } = useParams();
  const navigate = useNavigate();


  const sendProyect = () => {
    navigate('/curso/iniCurso')
  }

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);



  const [courseName, setcourseName] = useState('');
  const [descL, setdescL] = useState('');
  const [temaCou, settemaCou] = useState('');
  const [descShort, setdescShort] = useState('');
  const [passRemove, setpassRemove] = useState('');
  const [passAdd, setpassAdd] = useState('')
  const [banner, setbanner] = useState('');




useLayoutEffect(() => {
  getId()
}, [])

  async function getId() {
    const q = doc(base.db, "Cursos", id);
    const querySnapshot = await getDoc(q);
    let idCours = []
    console.log(querySnapshot.data());
    setcourseName(querySnapshot.data().nombreCurso)
    setdescL(querySnapshot.data().largeDescription)
    settemaCou(querySnapshot.data().temas)
    setdescShort(querySnapshot.data().shortDescrip)
    setpassAdd(querySnapshot.data().claveDingreso)
    setpassRemove(querySnapshot.data().ClaveDSalida)
    setbanner(querySnapshot.data().banerCurso)
  }
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    console.log(2);
    if (!file) {
      alert("Por favor carga una imagen primero!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setbanner(url)
        });
      }
    );
  };

  const createCurs = async () => {

    await updateDoc(doc(base.db, "Cursos", id), {
      ClaveDSalida: passRemove,
      banerCurso: banner,
      claveDingreso: passAdd,
      largeDescription: descL,
      nombreCurso: courseName,
      shortDescrip: descShort,
      temas: temaCou,
    });

    alert('Curso editado con exito')
    sendProyect()

  }


  return (
    <div className='infoStuf mt-5'>
      <h1>CREAR CURSO</h1>
      <div className="mb-3">
        <label className="form-label">Nombre Curso</label>
        <input type="text" className="form-control" id="nameCours" placeholder="Fotografia" value={courseName}
          onChange={e => setcourseName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripcion del curso</label>
        <textarea className="form-control" id="largeDesc" rows="3" placeholder='Curso de fotografia para principiantes enfocado en...'
          onChange={e => setdescL(e.target.value)}
          value={descL}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Temas del curso</label>
        <textarea className="form-control" id="temas" rows="3" placeholder='Fotografia y video, Planos, Edicion'
          onChange={e => settemaCou(e.target.value)}
          value={temaCou}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripcion corta </label>
        <input type="text" className="form-control" id="shortDesc" placeholder="Curso de fotografia y edicion"
          onChange={e => setdescShort(e.target.value)}
          value={descShort}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Clave para ingreso</label>
        <input type="text" className="form-control" id="shortDesc" placeholder="Selecciona una clave"
          onChange={e => setpassAdd(e.target.value)}
          value={passAdd}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Clave para retiro</label>
        <input type="text" className="form-control" id="shortDesc" placeholder="Selecciona una clave"
          onChange={e => setpassRemove(e.target.value)}
          value={passRemove}
        />
      </div>


      <div className="mb-3">
        <div>
          <label className="form-label">Banner para el curos</label>
          <input className="form-control" type="file" onChange={handleChange} id="formFile" accept="/image/*" />
          <br></br>
          <button type="button" className="btn btn-secondary orange" onClick={handleUpload}>Cargar Imagen</button>

          <p>{percent}%</p>
        </div>

      </div>
      <button type="button" className="btn orange" onClick={createCurs}>Editar curso</button>

    </div>
  )
}

