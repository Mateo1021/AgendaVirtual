import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { async } from "@firebase/util";

export  const useTareas = () => {
const [isLoading, setisLoading] = useState(true)
    const [tareas, settareas] = useState([])


const getTareas = async () =>{

    const tareasArray = await firestore()
    .collection('Tareas')
    .where('idCalendario', '==', 'cal_0')
    .get();
    
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    settareas(tareasArray._docs)    
    setisLoading(false)
}

    useEffect(() => {        
        getTareas();
    }, [])


  return {
    tareas,
    isLoading
  }
}
