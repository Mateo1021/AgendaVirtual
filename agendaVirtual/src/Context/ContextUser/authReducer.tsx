import { AuthState } from './AuthContext';

type AuthAction = 
    |{type:'signIn'}
    |{type:'datosUser',payload:{
        email:string,
        displayName:string,
        phoneNumber:string,
        photoURL:string,
        providerData:[]
        uid:string,
        
    }}

export const authReducer =(state:AuthState, action:AuthAction): AuthState=>{

switch (action.type) {
    case 'signIn':
        return{
            ...state,
            logIn:true,
        }
    case 'datosUser':
        return{
            ...state,
            email:action.payload.email,
            displayName:action.payload.displayName,
            phoneNumber:action.payload.phoneNumber,
            photoURL:action.payload.photoURL,
            providerData:action.payload.providerData,
            uid:action.payload.uid
        }
    default:
        return state;
}
}