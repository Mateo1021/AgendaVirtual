
import { createContext, useReducer } from "react"
import { proyectReducer } from "./proyectReducer";



export interface ProyectState{
    codeProyect:string,
}


export const proyectInitialState: ProyectState ={
    codeProyect:'',
}


export interface ProyectContextProps {

    proyecthState: ProyectState;
    setDataProyect : (
        codeProyect:string, 
    ) => void
}


/* createContext({} as AuthContextProps); */
export const ProyectContext = createContext({} as ProyectContextProps);

export const ProyectProvider = ({ children }:any)=>{
    const [proyectState, dispatch] = useReducer(proyectReducer, proyectInitialState);
    const setDataProyect = (
        codeProyect:string, 
        )=>{
        dispatch({type:'datosUser',payload:{codeProyect}})
    }

    return(
        <ProyectContext.Provider value ={{ 
            //@ts-ignore
            proyectState,
            setDataProyect,
        }}>
            {children}
        </ProyectContext.Provider>
    )
}