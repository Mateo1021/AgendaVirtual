import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import at from '../../../firebase/firebaseConfig'
import db from '../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo from '../../images/LogoFundacion.png';
import Background from '../../images/LoginBackground.jpg';
import { AuthContext } from '../context/AuthContext';


export const Login = () => {
 
  const {login} = useContext( AuthContext )
  const navigate = useNavigate();
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
            if (doc.data().cargo != "profesor") {
              alert('Este modulo es solo para profesores')
              /* navigate('/login', { replace: true }) */
            }
          });
          if (ValidUSer == 0) {
            alert('Este modulo es solo para profesores')
            /* navigate('/login', { replace: true }) */
          } else {
            login(JSON.parse(sessionStorage.getItem('codUserWb')))
            setTimeout(() => {
              navigate('/home', {  })
            });
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
  return (


    <div style={{
      backgroundImage: `url(${Background})`
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' }} >
        <Card className='m-auto' style={{ width: '90%', alignItems: 'center', opacity: '0.85'  }}>
          <Card.Img variant="top" src={Logo} style={{ width: '70%', }} />
          <Card.Body>
            <Card.Title>Módulo Web</Card.Title>
            <Card.Text>
              Fundación sin ánimo de lucro que hace 50 años brinda educación, primaria, secundaria y mediatéc
            </Card.Text>
            <form className="bg-white shado-md rounded px8 pt-6 pb-8 mb-4">
              <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label" >Email</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="staticEmail" value={user} placeholder={'Correo'} onChange={e => setUser(e.target.value)} />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label" >Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" value={pass} placeholder={'Contraseña'} onChange={e => setPass(e.target.value)} />
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'center' }}>
                <Button type="button" className="btn btn-primary" style={{backgroundColor: '#ED7C23', border: '3px solid #492013' ,}} onClick={onLogIn}>Iniciar sesión</Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
