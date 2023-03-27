import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CreatActiv } from '../pages/CreatActiv';
import { EditCurso } from '../pages/EditCurso';
import { InicioCurso } from '../pages/InicioCurso';
import { ListaEstud } from '../pages/ListaEstud';
import { NewActivi } from '../pages/NewActivi';
import { NewEvent } from '../pages/NewEvent';
import { Cours } from './../components/Cours';

export const CursoRoter = () => {
  return (
    <>
       
        <Routes>
          <Route path="/curso/iniCurso" element={<InicioCurso></InicioCurso>} />
          <Route path="/curso/editCurso/:id" element={<EditCurso></EditCurso>} />
          <Route path="/curso/listEstud" element={<ListaEstud></ListaEstud>} />
          <Route path="/curso/creatActiv/:idA" element={<CreatActiv></CreatActiv>} />
          <Route path="/curso/newActiv" element={<NewActivi></NewActivi>} />
          <Route path="/curso/newEvent" element={<NewEvent></NewEvent>} />
        </Routes>
      

    </>
  )
}
