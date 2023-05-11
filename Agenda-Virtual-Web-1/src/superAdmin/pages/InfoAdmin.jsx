import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { GrSearchAdvanced } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import { doc, getDoc,setDoc} from "firebase/firestore";

import db from '../../../firebase/firebaseConfig'

export const InfoAdmin = () => {
  const { idU } = useParams();
  const navigate = useNavigate();
const [infoPass, setinfoPass] = useState('')
const [newPass, setnewPass] = useState('')

  const sendIni = () => {
    navigate('/admin')
  }

  useLayoutEffect(() => {
    getpasso()
    return () => {
    };
  }, [])



async function getpasso (){
  const ref = doc(db.db, "contrasenasGenerales", "createUserEstud");
  const docSnap = await getDoc(ref);
  setinfoPass(docSnap.data().pass)

  return () => {
  };
}

const setPass = async ()=>{
  await setDoc(doc(db.db, "contrasenasGenerales", "createUserEstud"), {
    pass: newPass,
  });
  alert('La contraseña se a cambiado con exito')
  sendIni()
}

  if (sessionStorage.getItem('valid') !== '1') {
    return (
      <div>
        <h1>No eres admin logueate como uno</h1>
        <button
          onClick={SendProyect}
        > Go login</button>
      </div>
    )
  } else {
    return (

      <>

        <div className='listasAdmin'>
          <GrLinkPrevious className='ml-4 mt-2 mb-3' size={28} onClick={sendIni}></GrLinkPrevious>

          <div className='formList'>
            <label className="form-label mb-2">Contrasñe general de la institucion</label>
            <input type="text" className="form-control" id="passInsti" placeholder={infoPass} onChange={(e) => setnewPass(e.target.value)}/>
          </div>
          <div className='d-flex justify-content-end mt-3'>
            <button className="btn orange" onClick={setPass} >Actualizar</button>
            <button className="margenForce btn orange" onClick={sendIni}>Cancelar</button>
          </div>
        </div>

      </>
    )

  }

}
