import React, { useState } from 'react'
import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const fire = useFirebaseApp();

    const sbmut = async ()=>{
        console.log(email,pass);
    
    }
  return (
    <div>
        <div>
            <label htmlFor='email'>Correo Electronico</label>
            <input type="email" id='email' onChange={(ev) => setEmail(ev.target.value)} />
            <label htmlFor='password'>Contraseña</label>
            <input type="password" id='password' onChange={(ev) => setPass(ev.target.value)}/>   
            <button onClick={sbmut}> iniciar sesion </button>
        </div>
    </div>
  )
}
