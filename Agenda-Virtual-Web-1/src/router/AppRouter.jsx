
import { Route, Routes } from 'react-router-dom'


import { NavBar } from '../navigators/components/NavBar'
import { HomeRouter } from '../../src/home/router/HomeRouter'
import { Login } from '../../src/auth/pages/Login'
import { PrivateRoute } from './PrivateRoute'
import { LoginActivity } from '../activity/pages/LoginActivity'


export const AppRouter = () => {
  return (
    <>
{/* :codC/:codA */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="activity/:codC/:codA" element={<LoginActivity />} />

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
