import { useContext, useEffect, useState,useLayoutEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../Context/ContextUser/AuthContext";



export const useProyectos = () => {
    const [isLoading, setisLoading] = useState(true)
    const [proyectosArray, setproyectos] = useState([])
    /* const [idCursoDB, setidCursoDB] = useState() */
    const { authState } = useContext(AuthContext);
    let idCursoDB:any;

     const getidProyects = async () =>{    
        const idCurso = await firestore()
        .collection('Usuarios')
        .where('codUser', '==', authState.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                idCursoDB = documentSnapshot._data.idCurso
        });
        });
        console.log(idCursoDB);
        
       if(idCursoDB!=='0'){
        const proyectos = await firestore()
        .collection('Cursos')
        .where('codCurso', '==', idCursoDB)
        .get();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setproyectos(proyectos._docs[0]._data)    
        setisLoading(false)
       }else{
        setproyectos([])
        setisLoading(false)
       }

        
    }
  

    useEffect(() => {       
        getidProyects();        
    }, [])


    return {
      isLoading,
      proyectosArray,
      getidProyects,
      idCursoDB
  }
}
