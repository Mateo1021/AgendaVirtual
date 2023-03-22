import React, { useContext, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context/ContextUser/AuthContext';

export const getInfo = () => {
    const { authState } = useContext(AuthContext);
    const [datosUserPerf, setdatosUserPerf] = useState({})

    const editUserinfo = (dataUser:{})=>{
        firestore()
         // @ts-ignore
          .collection('Usuarios').doc(dataUser.idUser)
          .update(dataUser)
    } 
    const getInfoUserPerf =(idUser:string)=>{
        firestore()
        .collection('Usuarios')
        // Filter results
        .doc(idUser)
        .get()
        .then(querySnapshot => {
            // @ts-ignore
            // @ts-ignore
            setdatosUserPerf(querySnapshot._data)

        });
    }

    const addImgUser =(url:string)=>{
        firestore()
        // @ts-ignore
         .collection('Usuarios').doc(authState.uid)
         .update({
            foto: url
         })
    }
  return {
    editUserinfo,
    getInfoUserPerf,
    datosUserPerf,
    addImgUser
  }
}
