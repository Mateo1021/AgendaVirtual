
import { Route, Routes } from 'react-router-dom'


import { NavBar } from '../navigators/components/NavBar'
import { HomeRouter } from '../../src/home/router/HomeRouter'
import { Login } from '../../src/auth/pages/Login'
import { PrivateRoute } from './PrivateRoute'


export const AppRouter = () => {
  return (
    <>

      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="/*" element={
          <PrivateRoute>
            <HomeRouter />
          </PrivateRoute>
        }>

        </Route>


      </Routes>

    </>
  )
}
