
import { Route, Routes } from 'react-router-dom'


import { HomeRouter } from '../../src/home/router/HomeRouter'
import { Login } from '../../src/auth/pages/Login'
import { PrivateRoute } from './PrivateRoute'
import { LoginActivity } from '../activity/pages/LoginActivity'
import Quiz from './../activity/pages/Quiz';
import { AlphabetSoup } from '../activity/pages/AlphabetSoup'
import { Ahorcado } from '../activity/pages/Ahorcado'

import { InicioAdmin } from '../superAdmin/pages/InicioAdmin'
import { ListaDocentes } from '../superAdmin/pages/ListaDocentes';
import { CreateUser } from './../superAdmin/pages/CreateUser';
import { InfoAdmin } from '../superAdmin/pages/InfoAdmin'
import { InfoEstud } from '../superAdmin/pages/InfoEstud'
import { InfoCours } from '../superAdmin/pages/InfoCours'


export const AppRouter = () => {

  return (
    <>
      {/* :codC/:codA */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="activity/:codC/:codA" element={<LoginActivity />} />
        <Route path="quiz/:codC/:codA" element={<Quiz />} />
        <Route path="soup/:codC/:codA" element={<AlphabetSoup />} />
        <Route path="ahorcado/:codC/:codA" element={<Ahorcado />} />
        

        <Route path="/*" element={
          <PrivateRoute>
            <HomeRouter />
          </PrivateRoute>
        }>
        </Route>

        <Route path="admin/*" element={
          <PrivateRoute>
            <InicioAdmin />
          </PrivateRoute>
        }>
        </Route>

        <Route path="configAdmin/" element={
          <PrivateRoute>
            <InfoAdmin/>
          </PrivateRoute>
        }>
        </Route>

        <Route path="listaDocentes/" element={
          <PrivateRoute>
            <ListaDocentes/>
          </PrivateRoute>
        }>
        </Route>

        <Route path="createUser/*" element={
          <PrivateRoute>
            <CreateUser/>
          </PrivateRoute>
        }>
        </Route>

        <Route path="info/:idU" element={
          <PrivateRoute>
            <InfoAdmin/>
          </PrivateRoute>
        }>
        </Route>

        <Route path="infoEs/:idU" element={
          <PrivateRoute>
            <InfoEstud/>
          </PrivateRoute>
        }>
        </Route>

        <Route path="infoCo/:idU" element={
          <PrivateRoute>
            <InfoCours/>
          </PrivateRoute>
        }>
        </Route>

      </Routes>

    </>
  )
}
