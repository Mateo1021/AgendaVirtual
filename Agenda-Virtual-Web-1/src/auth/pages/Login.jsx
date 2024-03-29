import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import at from '../../../firebase/firebaseConfig'
import db from '../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../context/AuthContext';

import '../../styles/StayleClass.css'
import Logo from '../../images/LogoFundacion.png';
import Background from '../../images/LoginBackground.jpg';
import { useEffect } from 'react';



export const Login = () => {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate();


  const [isActivi, setisActivi] = useState('')
  useLayoutEffect(() => {
    setisActivi(sessionStorage.getItem('isActivity'))
  }, [])


  const sendProyect = () => {
    let tipo;
    if (sessionStorage.getItem('tipoActiv') == '1') {
      tipo = 'quiz'
    } else if (sessionStorage.getItem('tipoActiv') == '2') {
      tipo = 'ahorcado'
    }else if (sessionStorage.getItem('tipoActiv') == '3') {
      tipo = 'soup'
    }
    navigate('/' + tipo + '/' + sessionStorage.getItem('cursoSession') + '/' + sessionStorage.getItem('actividadSession'))
    setTimeout(() => {
      sessionStorage.removeItem('actividadSession')
      sessionStorage.removeItem('cursoSession')
      sessionStorage.removeItem('isActivity')
      sessionStorage.removeItem('tipoActiv')
    }, 4000);
  }


  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const onLogIn = () => {
    const auth = at;
    const base = db;

    signInWithEmailAndPassword(auth.at, user, pass)
      .then((userCredential) => {
        // ...
        const obtenerDatos = async () => {
          const q = query(collection(base.db, "UsuariosWeb"), where("correo", "==", user));
          const querySnapshot = await getDocs(q);
          let ValidUSer = querySnapshot._snapshot.docChanges.length;
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            sessionStorage.setItem('codUserWb', JSON.stringify(doc.data()))

          });
          if (ValidUSer == 0) {
            alert('Este modulo es solo para profesores')
            /* navigate('/login', { replace: true }) */
          } else {
            login(JSON.parse(sessionStorage.getItem('codUserWb')))

            if (JSON.parse(sessionStorage.getItem('codUserWb')).cargo == 'admin') {
              sessionStorage.setItem('valid', '1')
              navigate('/admin', { replace: true })
            } else {
              navigate('/home', {})
            }

          }

        }
        obtenerDatos();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }


  if (isActivi == '1') {
    return (
      <div className='loginEstudActivyCont'>
        <div  className='loginEstud'>
          <h4>Bienvenido a la actividad</h4>
          <button onClick={sendProyect} className='btn orange mt-5' >Empezar activdad</button>
        </div>
      </div>
    )

  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', backgroundImage: `url(${Background})` }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '70%', height: '90vh' }} >
          <Card className='m-auto' style={{ width: '100%', alignItems: 'center', opacity: '0.95' }}>
            <Card.Img variant="top" src={Logo} style={{ width: '70%', }} />
            <Card.Body>
              <Card.Title>Módulo Web</Card.Title>
              <Card.Text>
                Fundación sin ánimo de lucro que hace 50 años brinda educación, primaria, secundaria y mediatéc
              </Card.Text>
              <form className="d-flex flex-column align-items-center">
                <div className='mt-1'>
                  <label htmlFor="staticEmail" className="" >Email</label>
                  <input type="text" className="input form-control" id="staticEmail" value={user} placeholder={'Correo'} onChange={e => setUser(e.target.value)} />
                </div>
                <div className='mt-1'>
                  <label htmlFor="inputPassword" className="" >Password</label>
                  <input type="password" className="input form-control" id="inputPassword" value={pass} placeholder={'Contraseña'} onChange={e => setPass(e.target.value)} />
                </div>
                <div >
                  <Button type="button" className="btn orange mt-3" onClick={onLogIn}>Iniciar sesión</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}
