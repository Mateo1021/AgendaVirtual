import React, { useContext } from 'react'
import { AuthContext } from '../../auth'

export const HomeMenu = () => {

  const { user } = useContext( AuthContext );

  return (
    <div>
      <h1>{user?.name.nombre}</h1>
    </div>


  )
}
