import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { EditCurso } from '../pages/EditCurso';
import { InicioCurso } from '../pages/InicioCurso';
import { ListaEstud } from '../pages/ListaEstud';
import { Cours } from './../components/Cours';

export const CursoRoter = () => {
  return (
    <>

    <Routes>
        <Route path="/curso/iniCurso" element={<InicioCurso></InicioCurso>}/>
        <Route path="/curso/editCurso" element={<EditCurso></EditCurso>}/>
        <Route path="/curso/listEstud" element={<ListaEstud></ListaEstud>}/>
    </Routes>
    </>
  )
}
