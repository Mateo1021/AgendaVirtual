import React, { useState } from 'react'
import { async } from '@firebase/util';
import db from '../../../firebase/firebaseConfig'
import { collection, query, where, getDoc, onSnapshot, getDocs, updateDoc, doc } from "firebase/firestore";
import { useParams } from 'react-router-dom';

export const Ahorcado = () => {

    const { codC, codA } = useParams();

    const [user, setuser] = useState('')
    const [userInfo, setuserInfo] = useState([])
    const [isLogin, setisLogin] = useState(false)

    const [pistas, setpistas] = useState([])
    const [idPista, setidPista] = useState(0)



    const [idPalabra, setidPalabra] = useState(0)

    const [palabraServ, setpalabraServ] = useState([])


    const [intento, setintento] = useState('')
    const [palabraSeleccionada, setpalabraSeleccionada] = useState('')
    const [letrasAdivinadas, setletrasAdivinadas] = useState([])

    const [intentosRestantes, setintentosRestantes] = useState(4)


    const [update, setupdate] = useState(true)



    const [isDisable, setisDisable] = useState(true)



    const [score, setscore] = useState(0)
    /*     const [palabraSelect, setpalabraSelect] = useState('')
     */

    const loginUser = async () => {
        const q = query(collection(db.db, "Usuarios"), where("Correo", "==", user));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            // doc.data() is never undefined for query doc snapshots
            setuserInfo(doc.data());
            document.getElementById('logIngin').value = ''
        });
        if (querySnapshot.docs.length < 1) {
            alert('No encontramos un usuario con ese correo porfavor intenta nueva mente')
        }
    }

    const starGame = async () => {
        const evetRef = collection(db.db, "preguntasAhoracodo");
        const q = query(evetRef, where("codRegistro", "==", codA));
        const querySnapshot = await getDocs(q);
        let palabrasArray = []
        querySnapshot.forEach((doc) => {
            palabrasArray.push({
                palabra: doc.data().palabra,
                pistas: doc.data().pistas,
            });
            setpalabraServ(palabrasArray)
        });
        setpistas(palabrasArray[idPalabra].pistas)
        setpalabraSeleccionada(palabrasArray[idPalabra].palabra)
        setisLogin(true)
    }



    function SelectPalabra() {
        setidPista(0)
        setletrasAdivinadas([])
        let newid = idPalabra + 1
        setidPalabra(newid)
        setpistas(palabraServ[newid].pistas)
        setpalabraSeleccionada(palabraServ[newid].palabra)
        console.log(palabraServ[newid].palabra);
        setisDisable(true)
    }


    function verificarLetra() {
        let letra = intento
        if (palabraSeleccionada.includes(letra)) {
            // Si la letra está en la palabra, actualizamos la lista de letras adivinadas
            letrasAdivinadas.push(letra);
            setletrasAdivinadas(letrasAdivinadas)
            document.getElementById('intento').value = ''
        } else {
            // Si la letra no está en la palabra, disminuimos el número de intentos restantes
            let newVal = intentosRestantes - 1;
            setintentosRestantes(newVal)
            document.getElementById('intento').value = ''
        }
        let palabraMostrada = '';
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (letrasAdivinadas.includes(palabraSeleccionada[i])) {
                palabraMostrada += palabraSeleccionada[i];
            } else {
                palabraMostrada += '_';
            }
        }
        if (palabraSeleccionada == palabraMostrada) {
            setisDisable(false)
            let newValScore = score + 4
            setscore(newValScore)
        }

        setupdate(!update)
    }

    function MostrarPalabra() {
        let palabraMostrada = '';
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (letrasAdivinadas.includes(palabraSeleccionada[i])) {
                palabraMostrada += palabraSeleccionada[i];
            } else {
                palabraMostrada += '_';
            }
        }
        if (palabraSeleccionada == palabraMostrada) {
            /*             setisDisable(true) */
            palabraMostrada = ''
            let newid = idPalabra + 1
            console.log(newid, palabraSeleccionada, palabraMostrada);
            /*            setidPalabra(newid) */
            return (
                <div>
                    <h1>Bien hecho</h1>
                </div>);
        } else {
            return (
                <div>
                    <h1>{palabraMostrada}</h1>
                </div>);
        }




    }

    function MostrarIntentos() {

        return (
            <div>
                <p>
                    Te quedan {intentosRestantes} intentos
                </p>
            </div>
        )
    }

    function generateNumber() {
let newIdPist = idPista+1 
setidPista(newIdPist)
    }

    function ShowPista() {

        return (
            <div>
                <h1>Pista {pistas[idPista]}</h1>
                <button
                    onClick={generateNumber}
                > otra </button>
            </div>
        )
    }


    function setPuntosUser() {
        console.log(score);
        console.log(userInfo.codUser);
        console.log(codA);
    }

    if (!isLogin) {
        return (
            <div>

                <input type={'text'} onChange={(e) => setuser(e.target.value)} id='logIngin'></input>
                <button onClick={loginUser}>
                    Login
                </button>
                <p>
                    usuario: {userInfo.Nombres}
                </p>
                <button
                    onClick={starGame}
                >play game</button>
            </div>
        )
    } else {
        return (
            <div>
                <ShowPista></ShowPista>
                <MostrarPalabra></MostrarPalabra>
                <input
                    type={'text'}
                    onChange={(e) => setintento(e.target.value)}
                    id='intento'
                >
                </input>
                <button
                    onClick={verificarLetra}
                >
                    Validar
                </button>
                <MostrarIntentos></MostrarIntentos>

                <button
                    onClick={SelectPalabra}
                    disabled={isDisable}
                >
                    Siguiente palabra
                </button>
                <button
                    onClick={setPuntosUser}
                >
                    finalizar
                </button>
            </div>
        )
    }

}
