import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';


export const InfoAdmin = () => {
  const { idU } = useParams();
  const navigate = useNavigate();


  const sendIni = () => {
    navigate('/admin')
  }
  const sendTablas = () => {
    navigate('/listaDocentes')
  }

useLayoutEffect(() => {


}, [])




  return (
    <div>
      InfoAdmin {idU}





      <div>
        <button
          onClick={sendIni}
        >
          Volver al inicio
        </button>
        <button
          onClick={sendTablas}
        >
          Volver tablas
        </button>
      </div>
    </div>



  )
}
