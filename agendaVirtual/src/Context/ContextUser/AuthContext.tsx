import React, { useReducer } from "react";
import { createContext } from "react"
import { authReducer } from "./authReducer";


export interface AuthState{
    logIn: boolean;
    email: string;
    displayName?: string;
    phoneNumber?: string;
    photoURL?: string;
    providerData?:any;
    uid: string;
}


export const authInitialState: AuthState ={
    logIn :false,
    email : '',
    displayName : undefined,
    phoneNumber : undefined,
    photoURL : undefined,
    providerData : undefined,
    uid : '',
}


export interface AuthContextProps {

    authState: AuthState;
    signIn : ()=> void;
    setDataUser : (
        email: string, 
        displayName: string, 
        phoneNumber: string, 
        photoURL: string, 
        providerData: any, 
        uid: string
    ) => void
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }:any)=>{

    const [authState, dispatch] = useReducer(authReducer, authInitialState);
    const signIn = ()=>{
        dispatch({type:'signIn'});
    }
    const setDataUser = (
        email:string,
        displayName:string,
        phoneNumber:string,
        photoURL:string,
        providerData:any,
        uid:string,
        )=>{
        dispatch({type:'datosUser',payload:{email,displayName,phoneNumber,photoURL,providerData,uid}})
    }

    return(
        <AuthContext.Provider value ={{ 
            authState,
            signIn,
            setDataUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}