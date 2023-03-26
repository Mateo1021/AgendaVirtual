import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import at from '../../../firebase/firebaseConfig'
import db from '../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Logo from '../../images/LogoFundacion.png';
import Background from '../../images/LoginBackground.jpg';


export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const logIn = () => {
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
            if (doc.data().cargo != "profesor") {
              alert('Este modulo es solo para profesores')
              navigate('/login', { replace: true })
            }
          });
          if (ValidUSer == 0) {
            alert('Este modulo es solo para profesores')
            navigate('/login', { replace: true })
          } else {
            navigate('/home', { replace: true })
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


    <div >
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' }} >
        <Card className='m-auto' style={{ width: '90%', alignItems: 'center' }}>
          <Card.Img variant="top" src={Logo} style={{ width: '70%' }} />
          <Card.Body>
            <Card.Title>Módulo Web</Card.Title>
            <Card.Text>
              Fundación sin ánimo de lucro que hace 50 años brinda educación, primaria, secundaria y mediatéc
            </Card.Text>
            <form className="bg-white shado-md rounded px8 pt-6 pb-8 mb-4">
              <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="staticEmail" value={user} onChange={e => setUser(e.target.value)} />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" value={pass} onChange={e => setPass(e.target.value)} />
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={logIn}>Iniciar sesión</button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
