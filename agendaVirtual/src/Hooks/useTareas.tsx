import { useContext, useEffect, useState,useLayoutEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../Context/ContextUser/AuthContext";



export  const useTareas = () => {

const [isLoading, setisLoading] = useState(true)
const [tareas, settareas] = useState([])

const { authState } = useContext(AuthContext);


  const getTareas = async () =>{ 

    const tareasArray = await firestore()
    .collection('Tareas')
    .where('cudUser', '==',authState.uid )
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
    isLoading,
    getTareas
  }
}
