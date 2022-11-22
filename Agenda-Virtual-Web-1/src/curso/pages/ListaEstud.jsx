import React from 'react'
import { Cours } from './../components/Cours';
import { BtnCreateCours } from '../components/BtnCreateCours';


export const ListaEstud = () => {
  return (
    <>
    <Cours></Cours>  
    <div>
    <h1>Lista Estudiantes</h1>
    <BtnCreateCours></BtnCreateCours>
    </div>
    
    </>
  )
}
