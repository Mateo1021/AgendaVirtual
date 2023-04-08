import React from 'react'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
import { GrSearchAdvanced } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export const ListaDocentes = () => {
  document.body.style.background = "linear-gradient(90.04deg, rgb(225 225 225 / 76%) 0.03%, rgb(230, 228, 227) 99.96%)";

  const navigate = useNavigate();

  const SendProyect = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const sendIniAdmin = () => {
    navigate('/admin')
  }

  const sendInfoItem = (id) => {
    navigate('/info/' + id)
  }

  const sendInfoEst = (id) => {
    navigate('/infoEs/' + id)
  }

  const sendInfoCour = (id) => {
    navigate('/infoCo/' + id)
  }


  const [listElement, setlistElement] = useState([])
  const [saveInfo, setsaveInfo] = useState([])
  const [item, setitem] = useState('')
  const [cantTxt, setcantTxt] = useState(0)

  const validSearchTable = () => {
    if (item == '1') {
      getProfDat("UsuariosWeb")
    } else if (item == '2') {
      getProfDat("Usuarios")
    } else if (item == '3') {
      getProfDat("Cursos")
    }
  }

  const getProfDat = async (element) => {
    let arrayPrfof = []
    const qProf = query(collection(db.db, element));
    const querySnapshotProf = await getDocs(qProf);
    querySnapshotProf.forEach((doc) => {
      if (!Object.entries(doc.data()).length == 0) {
        arrayPrfof.push(doc.data());
      }
      // doc.data() is never undefined for query doc snapshots
    });
    setlistElement(arrayPrfof)
    setsaveInfo(arrayPrfof)
  }

  const SearchinElement = (txt) => {
    let arraySearh = []
    let newArray = []
    if (cantTxt > txt.length) {
      arraySearh = saveInfo;
    } else {
      arraySearh = listElement;
    }
    for (let y in arraySearh) {
      if (JSON.stringify(arraySearh[y]).replaceAll('"', " ").toLowerCase().includes(txt.toLowerCase())) {
        newArray.push(arraySearh[y])
      }
    }
    setcantTxt(txt.length)
    setlistElement(newArray)
  }


  const RenderTable = () => {
    if (item == '1') {
      return (
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {listElement.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nombre} {item.apellido}</td>
                <td>{item.correo}</td>
                <td>{item.cargo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    } else if (item == '2') {
      return (
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Puntaje</th>
              <th>Id Curso</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {listElement.map((item, index) => (
              <tr key={index}>
                <td>{item.codUser}</td>
                <td>{item.Nombres} {item.Apellidos}</td>
                <td>{item.Correo}</td>
                <td>{item.Puntaje}</td>
                <td>{item.idCurso}</td>
                <td><GrSearchAdvanced onClick={() => sendInfoEst(item.codUser)}></GrSearchAdvanced></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    } else if (item == '3') {
      return (
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Nombre Docente</th>
              <th>Cantidad Estudiantes</th>
              <th>Clave Ingreso</th>
              <th>Clave Salida</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {listElement.map((item, index) => (
              <tr key={index}>
                <td>{item.codCurso}</td>
                <td>{item.nombreCurso}</td>
                <td>{item.nombreDocente} {item.apellidosDocente}</td>
                <td>{item.cantEstudiantes}</td>
                <td>{item.claveDingreso}</td>
                <td>{item.ClaveDSalida}</td>
                <td><GrSearchAdvanced onClick={() => sendInfoCour(item.codCurso)}></GrSearchAdvanced></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }





  if (sessionStorage.getItem('valid') !== '1') {
    return (
      <div>
        <h1>No eres admin logueate como uno</h1>
        <button
          onClick={SendProyect}
        > Go login</button>
      </div>
    )
  } else {
    return (



      <div className='listasAdmin'>
        <GrLinkPrevious className='ml-4 mt-2 mb-3' size={28} onClick={sendIniAdmin}></GrLinkPrevious>

        <div className='formList'>
          <label className="form-label mb-2">Lista de tablas disponibles</label>
          <select className='form-control mb-4' aria-label="Default select example" onChange={(e) => setitem(e.target.value)}>
            <option value="0">Selecciona el item</option>
            <option value="1">Profesores</option>
            <option value="2">estudiantes</option>
            <option value="3">Cursos</option>
          </select>
          <button
            className='btn orange mb-3'
            onClick={validSearchTable}
          >
            Generar tabla
          </button>

          <div className='d-flex justify-content-end'>
            <input type={'text'} className='form-control inpushSearch' onChange={(e) => SearchinElement(e.target.value)}  ></input>
          </div>
          <RenderTable></RenderTable>
        </div>

      </div>
    )

  }
}
