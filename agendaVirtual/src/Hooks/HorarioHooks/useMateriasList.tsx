import React, { useEffect, useState } from 'react'
import { useMaterias } from './useMaterias';


export const useMateriasList = () => {



const [datos, setdatos] = useState([])

function cargarSelect(){
    let nombresMaterias:any = []
/*     for(let i in materias){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nombresMaterias.push({label: materias[i]._data.nombre , value:materias[i]._data.nombre})
    } */

}

useEffect(() => {
cargarSelect()

},)


  return {
    datos,
    cargarSelect
  }
}
