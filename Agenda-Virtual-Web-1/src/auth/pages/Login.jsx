import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import at from '../../../firebase/firebaseConfig'
import db from '../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const logIn =()=>{
    const auth = at;
    const base = db;
    signInWithEmailAndPassword(auth.at, user, pass)
      .then((userCredential) => {
        // ...
        const obtenerDatos= async()=>{
        const q = query(collection(base.db, "UsuariosWeb"), where("correo", "==", user));
        const querySnapshot = await getDocs(q);
        let ValidUSer = querySnapshot._snapshot.docChanges.length;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          if(doc.data().cargo != "profesor"){
            alert('Este modulo es solo para profesores')
            navigate('/login',{replace:true})
          }
        });
        if(ValidUSer == 0){
          alert('Este modulo es solo para profesores')
          navigate('/login',{replace:true})
        }else{
          navigate('/home',{replace:true})
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
    <div className="container mt-5">
    <form className="row row-cols-lg-auto g-3 align-items-center">
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="staticEmail" value={user} onChange={e => setUser(e.target.value)}/>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword"  value={pass} onChange={e => setPass(e.target.value)}/>
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={logIn}>Ingresar</button>
  </form>
    </div>
  )
}
