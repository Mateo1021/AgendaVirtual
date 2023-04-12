
import { useState, useLayoutEffect, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../../firebase/firebaseConfig'
import { collection, query, where, getDoc, onSnapshot, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { async } from '@firebase/util';


export const AlphabetSoup = () => {
    const { codC, codA } = useParams();

    document.body.style.background = "linear-gradient(90.04deg, rgb(255 109 109) 0.03%, rgb(255 171 107) 99.96%)";
    const [palabras, setpalabras] = useState([])
    const [tiempoSopa, settiempoSopa] = useState(0)
    let arrayWorld = []
    let puntos = 0;
    let tiempoRestante;
    let temporizador;


    const [isLoged, setisLoged] = useState(false)
    const [user, setuser] = useState('')
    const [userInfo, setuserInfo] = useState([])
    function generarSopaDeLetras(palabras, size) {
        const soup = new Array(size).fill(null).map(() => new Array(size).fill(undefined));
        const directions = [
            [-1, 0], // Arriba
            [1, 0], // Abajo
            [0, -1], // Izquierda
            [0, 1], // Derecha
            [-1, -1], // Diagonal superior izquierda
            [-1, 1], // Diagonal superior derecha
            [1, -1], // Diagonal inferior izquierda
            [1, 1] // Diagonal inferior derecha
        ];

        function addWord(word, diagonal) {
            let added = false;
            while (!added) {
                const direction = directions[Math.floor(Math.random() * directions.length)];
                const row = Math.floor(Math.random() * size);
                const col = Math.floor(Math.random() * size);
                const wordArray = word.split('');
                let overlap = false;

                // Verifica la superposición con otras palabras existentes
                for (let i = 0; i < wordArray.length; i++) {
                    const newRow = row + i * direction[0];
                    const newCol = col + i * direction[1];
                    if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size || (soup[newRow][newCol] !== undefined && soup[newRow][newCol] !== wordArray[i])) {
                        overlap = true;
                        break;
                    }
                }

                // Agrega la palabra si no hay superposición
                if (!overlap) {
                    for (let i = 0; i < wordArray.length; i++) {
                        const newRow = row + i * direction[0];
                        const newCol = col + i * direction[1];
                        soup[newRow][newCol] = wordArray[i];
                    }
                    added = true;
                }
            }
        }

        // Agrega todas las palabras a la sopa de letras, incluyendo palabras en diagonal
        for (let i = 0; i < palabras.length; i++) {
            addWord(palabras[i], true);
        }

        // Llena los espacios vacíos con letras aleatorias
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (soup[i][j] === undefined) {
                    soup[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                }
            }
        }

        return soup;
    }

    const validWorld = (txt, id) => {
        let btnSelect = document.getElementById(id)
        let term = { txt: txt, id: id }
        const index1 = arrayWorld.findIndex(p => p.txt === term.txt && p.id === term.id);
        if (index1 < 0) {
            arrayWorld.push(term)
            btnSelect.classList.add('btnSoupClik')
        } else {
            arrayWorld = arrayWorld.filter(x => x.id !== id)
            btnSelect.classList.remove('btnSoupClik')
        }
        let txtValid = ''
        for (let c of arrayWorld) {
            txtValid = txtValid + c.txt
        }
        console.log(txtValid);
        if (palabras.includes(txtValid)) {
            console.log('felicidades');
            for (let c of arrayWorld) {
                let btnSelectQuit = document.getElementById(c.id)
                btnSelectQuit.classList.remove('btnSoupClik')
                btnSelectQuit.classList.add('btsnFindtxt')
                btnSelectQuit.disabled = true;
            }
            let palabrasEncontradas = document.getElementById('palabrasEncontradas')
            const li = document.createElement('li');

            // Set the text content of the new list item element
            li.textContent = txtValid;

            palabrasEncontradas.appendChild(li)
            arrayWorld = []
            puntos = (puntos + 2)
        }
    }

    const RendrSoup = () => {

        const size = 13;
        const sopaDeLetras = generarSopaDeLetras(palabras, size);


        return (
            <table>
                <tbody>
                    {
                        sopaDeLetras.map((answer, indexTr) => (
                            <tr key={indexTr}>
                                {
                                    answer.map((answer, index) => (
                                        <td key={index}>
                                            <button
                                                id={index + '-' + indexTr}
                                                onClick={() => validWorld(answer, index + '-' + indexTr)}
                                                className='btnSoup'
                                            >
                                                {answer}
                                            </button>
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    function Temporizador() {
        const btnStart = document.getElementById("btnStart");
        btnStart.classList.add('hidenDiv')
        const termianr = document.getElementById("termianr");
        termianr.classList.remove('hidenDiv')
        termianr.classList.add('btn')
        termianr.classList.add('orange')
        termianr.classList.add('mt-3')

        tiempoRestante = tiempoSopa
        let divSoup = document.getElementById('divSoup')
        divSoup.classList.remove('hidenDiv')

        // Obtener el elemento HTML donde se mostrará el temporizador
        const timerEl = document.getElementById("timer");

        // Crear el temporizador con setTimeout()
        const timer = setTimeout(function () {
            timerEl.innerHTML = "¡Se termino el tiempo!";
        }, tiempoRestante * 1000);

        temporizador = setInterval(function () {
            tiempoRestante--;
            timerEl.innerHTML = "Temporizador:" + tiempoRestante + " segundos";
            if (tiempoRestante == 1) {
                finalizar()
            }
        }, 1000);


    }

    const finalizar = () => {
        const btnStart = document.getElementById("btnStart");
        
        clearInterval(temporizador);
        divSoup.classList.add('hidenDiv')
        btnStart.disabled = true;
        const showPuntos = document.getElementById("showPuntos");
        const h1 = document.createElement('h1');
        h1.textContent = puntos;
        showPuntos.appendChild(h1)
        showPuntos.classList.remove('hidenDiv')
        showPuntos.classList.add('d-flex')
        showPuntos.classList.add('align-items-center')
        showPuntos.classList.add('flex-column')
        const termianr = document.getElementById("termianr");
        termianr.classList.add('hidenDiv')

        const btnEnviar = document.getElementById("btnEnviar");
        btnEnviar.classList.remove('hidenDiv')
        btnEnviar.classList.add('btn')
        btnEnviar.classList.add('orange')
        btnEnviar.classList.add('mt-3')

    }


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


        const evetRef = collection(db.db, "palabrasSopa");
        const q = query(evetRef, where("codReg", "==", codA));
        const querySnapshot = await getDocs(q);
        let palabrasArray = []
        let tiempoServ
        querySnapshot.forEach((doc) => {
            palabrasArray.push(
                doc.data().palabra
            );
            tiempoServ =doc.data().tiempo
        });
        setpalabras(palabrasArray)
        settiempoSopa(tiempoServ)





        if (userInfo.Correo) {
            const docRef = doc(db.db, "registrosForo", codA);
            const docSnap = await getDoc(docRef);
            let arrayTemp = docSnap.data().participacion
            if (arrayTemp.indexOf(userInfo.codUser) < 0) {
                setisLoged(true)
            } else {
                alert('Tu ya realizaste esta actividad')
            }
        } else {
            alert('Por favor ingresa tu usuario primero para poder darte los puntos al finalizar ')
        }
    }

    const envPutnaje =()=>{
console.log(puntos);
console.log(userInfo);
    }

    if (isLoged) {
        return (
            <div className='d-flex justify-content-center pt-1 flex-column align-items-center'>
                <div className='d-flex justify-content-center mb-3 mt-4'>
                    <h3>Sopa de letras</h3>
                </div>
                <div id='divSoup' className='hidenDiv'>
                    <RendrSoup></RendrSoup>
                </div>
                <p id="timer" className='text-center'>El tiempo para resolver la sopa es de {tiempoSopa} segundos</p>
                <div id='showPuntos' className='hidenDiv'>
                    <h1>Tu puntaje</h1>
                </div>
                <div className='d-flex'>
                    <div>
                        {
                            palabras.map((answer, index) => (
                                <li key={index}>{answer}</li>
                            ))
                        }
                    </div>
                    <div id='palabrasEncontradas'>

                    </div>
                </div>
                <button onClick={() => Temporizador()} id='btnStart' className='btn orange mt-3'>Strat</button>
                <button onClick={() => finalizar()} className='btn orange mt-3' className='hidenDiv' id='termianr'>Terminar</button>

                <button onClick={() => envPutnaje()} className='hidenDiv' id='btnEnviar'>Enviar puntaje</button>
            </div>
        )
    } else {
        return (
            <>
                <div className='contLogAh'>
                    <div className='divContAh'>
                        <h5>Ingresa tu correo</h5>
                        <input className="form-control" type={'email'} onChange={(e) => setuser(e.target.value)} id='logIngin'></input>

                        <button className="btn orange mt-3 w-100" onClick={loginUser}>
                            Ingresar
                        </button>

                        <p className="mt-3 text-center">
                            Bienvenido {userInfo.Nombres} los puntos ganados seran registrados a este correo
                        </p>
                        <button
                            className="btn orange w-100"
                            onClick={starGame}
                        >Empezar Avtividad</button>
                    </div>
                </div>
            </>
        )
    }


}

