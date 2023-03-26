import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {NavBar} from '../../navigators/components/NavBar'
import {HomeMenu} from '../../home/pages/HomeMenu'
import {PerfilUser} from '../../home/pages/PerfilUser'
import {Cours} from '../../curso/components/Cours'
import { CursoRoter } from '../../curso/router/CursoRoter';
import { EditCurso } from './../../curso/pages/EditCurso';
import { InicioCurso } from './../../curso/pages/InicioCurso';
import { ListaEstud } from './../../curso/pages/ListaEstud';
import { CreateCours } from './../../curso/pages/CreateCours';

export const HomeRouter = () => {
  return (
   <>
   <NavBar></NavBar>

   <Routes>
       <Route path="home/*" element={<HomeMenu/>}/>
       <Route path="/perfil" element={<PerfilUser/>}/>
       <Route path="/curso//*" element={<CursoRoter/>}/>
       <Route path="/" element={<Navigate to="/home"/>}/>
       <Route path="/curso/editCurso/:id" element={<EditCurso></EditCurso>}/>
        <Route path="/curso/iniCurso" element={<InicioCurso></InicioCurso>}/>
        <Route path="/curso/listEstud" element={<ListaEstud></ListaEstud>}/>
        <Route path="/curso/createCours" element={<CreateCours></CreateCours>}/>
   </Routes>
   </>
  )
}
