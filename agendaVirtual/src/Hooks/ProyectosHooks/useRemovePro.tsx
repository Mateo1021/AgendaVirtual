import { useContext, useEffect, useState,useLayoutEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context/ContextUser/AuthContext';


export const useRemovePro = () => {
    const { authState } = useContext(AuthContext);

    const removePro = async () =>{   
        const codCal = await firestore()
        .collection('Usuarios').doc(authState.uid)
        .update({
          idCurso: '0'
        })
      }  

  return {
    removePro
  }
}
