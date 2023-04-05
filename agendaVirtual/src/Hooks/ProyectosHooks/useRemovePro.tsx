import { useContext, useEffect, useState,useLayoutEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context/ContextUser/AuthContext';


export const useRemovePro = () => {
    const { authState } = useContext(AuthContext);

    const removePro = async (idCours:any,cant:any) =>{   
      let newCant = Number(cant)
      console.log(newCant--);
      
      const cantCour = await firestore()
      .collection('Cursos').doc(idCours)
      .update({
        cantEstudiantes: newCant--
      })
      
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
