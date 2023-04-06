import React, { useState } from 'react'

export const generalArray = () => {
  const [idCoursGeneral, setidCoursGeneral] = useState('aa')

    let tiposNotasArray = [{label:'Quiz',value:1},{label:'Examen/Evaluacion',value:2},{label:'Tarea',value:3},{label:'Control',value:4},
{label:'Actividad',value:5},{label:'Nota corte',value:6},{label:'Otros',value:7}]
const addCours =(id:string)=>{

  setidCoursGeneral(id)
}

  return {
    tiposNotasArray,
    idCoursGeneral,
    addCours
  }
}
