import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import firestore from '@react-native-firebase/firestore';

export const useMaterias = () => {

    const [isLoading, setisLoading] = useState(true)
    const [materias, setmaterias] = useState([])
    const { authState } = useContext(AuthContext);

        const getUser = async () =>{ 
        const user = await firestore().collection('Usuarios').doc(authState.uid).get();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return user._data.idHorario;

        }
        const getMateriasUser = async () =>{ 
            
        const codHorarioBD = await getUser();

            const notarArray = await firestore()
            .collection('Materia')
            .where('codHorario', '==', codHorarioBD)
            .get();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            setmaterias(notarArray._docs)    
            setisLoading(false)
        }


useEffect(() => {
    getMateriasUser();
    
}, [])


  return {

    isLoading,
    materias,
    getMateriasUser,
    getUser
  }
}
