import { ProyectState } from './ProyectContext';

type ProyectAction = {type:'datosUser',payload:{
        codeProyect:string,
    }}
export const proyectReducer = (state:ProyectState, action:ProyectAction) => {
    
    switch (action.type) {
        case 'datosUser':
            return{
                ...state,
                codeProyect:action.payload.codeProyect,
            }
        default:
            return state;
    }
    }