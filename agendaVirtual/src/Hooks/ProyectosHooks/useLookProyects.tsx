import { useContext, useEffect, useState,useLayoutEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../Context/ContextUser/AuthContext";



export const useLookProyects = () => {
    const [isLoading, setisLoading] = useState(true)
    const [proyectosArrayL, setproyectosArrayL] = useState([])

    const lookProyects = async () =>{   
        const coursDB = await firestore().collection('Cursos').get();   
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setproyectosArrayL(coursDB._docs)
        setisLoading(false)
    
    }


    useEffect(() => {   
        lookProyects();
    }, [])


  return {
    isLoading,
    proyectosArrayL
  }
}
