import React from 'react'
import { Cours } from './../components/Cours';
import { BtnCreateCours } from '../components/BtnCreateCours';
export const EditCurso = () => {
  return (
    <>
    <Cours></Cours>   
    <div>
    <h1>Configuracion Curso</h1>
    <BtnCreateCours></BtnCreateCours>
    </div>
    </>
  )
}