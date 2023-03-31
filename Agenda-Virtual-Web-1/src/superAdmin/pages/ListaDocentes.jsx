import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ListaDocentes = () => {


    const navigate = useNavigate();

    const SendProyect = () => {
      localStorage.removeItem('user')
      navigate('/login')
    }


    if (sessionStorage.getItem('valid') !== '1') {
        return (
          <div>
            <h1>No eres admin logueate como uno o ingresa con tu usuario de administrador</h1>
            <button
              onClick={SendProyect}
            > Go login</button>
          </div>
        )
      } else {
        return (
    
    
          
          <div>test admin
    
            <button
           
            > go lista </button>
    
          </div>
        )
    
      }
}
