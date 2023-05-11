import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import React, { useLayoutEffect, useState } from 'react';
import img1 from '../../images/image.png';
import img3 from '../../images/image2.png';
import img4 from '../../images/image3.png';
import img5 from '../../images/image4.png';
import img6 from '../../images/image5.png';
import img7 from '../../images/image6.png';
import img9 from '../../images/image9.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const optionsGenerica = {
  responsive: true,
  plugins: {

    title: {
      display: true,
      text: 'Eventos por mes',
    },
  },
};
const labelsGenericos = ['Ene'];

const dataGenerica = {
  labelsGenericos,
  datasets: [1],
};

export const InicioAdmin = () => {

  document.body.style.background = "linear-gradient(90.04deg, rgb(236 236 236) 0.03%, rgb(245 245 245) 99.96%)";
  const [graficSelect, setgraficSelect] = useState(null)

  const [eventsData, seteventsData] = useState([])

  const [activiData, setactiviData] = useState([])

  const [labelsEstud, setlabelsEstud] = useState([])
  const [cantEstud, setcantEstud] = useState([])
  const [colorsCant, setcolorsCant] = useState([])
  const [colorsCantd, setcolorsCantd] = useState([])

  const [asistEvent, setasistEvent] = useState([])

  const [asistActiv, setasistActiv] = useState([])

  const [graficDef, setgraficDef] = useState([])

  const navigate = useNavigate();



  useLayoutEffect(() => {
    getDataEventsAndActiv()
  }, [])

  const SendProyect = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('valid')
    sessionStorage.removeItem('codUserWb')
    navigate('/login')
  }
  const SendLista = () => {
    navigate('/listaDocentes')
  }
  const SendCreate = () => {
    navigate('/createUser')
  }

  const SendConfig = () => {
    navigate('/configAdmin')
  }



  let options;
  let labels;
  let data;


  let ene = []
  let feb = []
  let mar = []
  let abr = []
  let may = []
  let jun = []
  let jul = []
  let ago = []
  let sep = []
  let oct = []
  let nov = []
  let dic = []


  function groupByAttribute(array, attribute) {
    return array.reduce((result, item) => {
      const key = item[attribute];

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item);

      return result;
    }, {});
  }

  const getDataEvents = async () => {
    let dataServ = [];
    const querySnapshot = await getDocs(collection(db.db, "evento"));
    querySnapshot.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        dataServ.push(doc.data())
      }
    }
    );
    let dataTotal = [];
    let agrupInfoByCours = groupByAttribute(dataServ, 'idCurso');
    for (let x of Object.keys(agrupInfoByCours)) {
      let dataBymes = []
      ene = []
      feb = []
      mar = []
      abr = []
      may = []
      jun = []
      jul = []
      ago = []
      sep = []
      oct = []
      nov = []
      dic = []

      for (let y in agrupInfoByCours[x]) {
        const date = new Date(agrupInfoByCours[x][y].createdAt.seconds * 1000);
        switch (date.getMonth()) {
          case 0:
            ene.push(agrupInfoByCours[x][y])
            break;
          case 1:
            feb.push(agrupInfoByCours[x][y])
            break;
          case 2:
            mar.push(agrupInfoByCours[x][y])
            break;
          case 3:
            abr.push(agrupInfoByCours[x][y])
            break;
          case 4:
            may.push(agrupInfoByCours[x][y])
            break;
          case 5:
            jun.push(agrupInfoByCours[x][y])
            break;
          case 6:
            jul.push(agrupInfoByCours[x][y])
            break;
          case 7:
            ago.push(agrupInfoByCours[x][y])
            break;
          case 8:
            sep.push(agrupInfoByCours[x][y])
            break;
          case 9:
            oct.push(agrupInfoByCours[x][y])
            break;
          case 10:
            nov.push(agrupInfoByCours[x][y])
            break;
          case 11:
            dic.push(agrupInfoByCours[x][y])
            break;

          default:
            break;
        }

      }
      dataBymes.push(ene.length)
      dataBymes.push(feb.length)
      dataBymes.push(mar.length)
      dataBymes.push(abr.length)
      dataBymes.push(may.length)
      dataBymes.push(jun.length)
      dataBymes.push(jul.length)
      dataBymes.push(ago.length)
      dataBymes.push(sep.length)
      dataBymes.push(oct.length)
      dataBymes.push(nov.length)
      dataBymes.push(dic.length)
      let colorline = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
      dataTotal.push({
        label: x,
        data: dataBymes,
        borderColor: colorline,
        backgroundColor: colorline,
      })
    }

    seteventsData(dataTotal)

  }

  const getDataActivits = async () => {
    let dataServ = [];
    const querySnapshot = await getDocs(collection(db.db, "registrosForo"));
    querySnapshot.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        dataServ.push(doc.data())
      }
    }
    );
    let dataTotal = [];
    let agrupInfoByCours = groupByAttribute(dataServ, 'codProyecto');
    for (let x of Object.keys(agrupInfoByCours)) {
      let dataBymes = []
      ene = []
      feb = []
      mar = []
      abr = []
      may = []
      jun = []
      jul = []
      ago = []
      sep = []
      oct = []
      nov = []
      dic = []

      for (let y in agrupInfoByCours[x]) {
        const date = new Date(agrupInfoByCours[x][y].createdAt.seconds * 1000);
        switch (date.getMonth()) {
          case 0:
            ene.push(agrupInfoByCours[x][y])
            break;
          case 1:
            feb.push(agrupInfoByCours[x][y])
            break;
          case 2:
            mar.push(agrupInfoByCours[x][y])
            break;
          case 3:
            abr.push(agrupInfoByCours[x][y])
            break;
          case 4:
            may.push(agrupInfoByCours[x][y])
            break;
          case 5:
            jun.push(agrupInfoByCours[x][y])
            break;
          case 6:
            jul.push(agrupInfoByCours[x][y])
            break;
          case 7:
            ago.push(agrupInfoByCours[x][y])
            break;
          case 8:
            sep.push(agrupInfoByCours[x][y])
            break;
          case 9:
            oct.push(agrupInfoByCours[x][y])
            break;
          case 10:
            nov.push(agrupInfoByCours[x][y])
            break;
          case 11:
            dic.push(agrupInfoByCours[x][y])
            break;

          default:
            break;
        }

      }
      dataBymes.push(ene.length)
      dataBymes.push(feb.length)
      dataBymes.push(mar.length)
      dataBymes.push(abr.length)
      dataBymes.push(may.length)
      dataBymes.push(jun.length)
      dataBymes.push(jul.length)
      dataBymes.push(ago.length)
      dataBymes.push(sep.length)
      dataBymes.push(oct.length)
      dataBymes.push(nov.length)
      dataBymes.push(dic.length)
      let colorline = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
      dataTotal.push({
        label: x,
        data: dataBymes,
        borderColor: colorline,
        backgroundColor: colorline,
      })
    }

    setactiviData(dataTotal)

  }

  const getDataEstud = async () => {
    let nombrsCurso = [];
    let cantidadEstud = [];
    let colorsAleat = [];
    let colorsAleatd = [];
    const querySnapshot = await getDocs(collection(db.db, "Cursos"));
    querySnapshot.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        let col1;
        let col2;
        let col3;
        nombrsCurso.push(doc.data().nombreCurso)
        cantidadEstud.push(doc.data().cantEstudiantes)
        col1 = Math.floor(Math.random() * 255);
        col2 = Math.floor(Math.random() * 255);
        col3 = Math.floor(Math.random() * 255);

        let colorline = 'rgb(' + col1 + ',' + col2 + ',' + col3 + ')'
        colorsAleat.push(colorline)
        let colorlined = 'rgb(' + col1 + ',' + col2 + ',' + col3 + ',0.5)'
        colorsAleatd.push(colorlined)
      }
    }
    );
    setlabelsEstud(nombrsCurso)
    setcantEstud(cantidadEstud)
    setcolorsCant(colorsAleat)
    setcolorsCantd(colorsAleatd)
  }

  const getDataAsistE = async () => {
    let dataServ = [];
    const querySnapshot = await getDocs(collection(db.db, "evento"));
    querySnapshot.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        let colorline = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.5)'
        dataServ.push({
          label: doc.data().codEvento,
          data: [doc.data().asistencia.length],
          backgroundColor: colorline,
        })

      }
    }
    );
    setasistEvent(dataServ)
  }
  const getDataAsistA = async () => {
    let dataServ = [];
    const querySnapshot = await getDocs(collection(db.db, "registrosForo"));
    querySnapshot.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        let colorline = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.5)'
        dataServ.push({
          label: doc.data().idRegistro,
          data: [doc.data().participacion.length],
          backgroundColor: colorline,
        })

      }
    }
    );
    setasistActiv(dataServ)
  }

  const getDataEventsAndActiv = async () => {
    let dataServ = [];
    const querySnapshot = await getDocs(collection(db.db, "registrosForo"));
    querySnapshot.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        dataServ.push(doc.data())
      }
    }
    );

    const querySnapshotE = await getDocs(collection(db.db, "evento"));
    querySnapshotE.forEach((doc) => {
      if (!Object.keys(doc.data()).length == 0) {
        dataServ.push(doc.data())
      }
    }
    );
    let dataEventsAndActiv = []
    let dataEventsAndActivF = []
    ene = []
    feb = []
    mar = []
    abr = []
    may = []
    jun = []
    jul = []
    ago = []
    sep = []
    oct = []
    nov = []
    dic = []
    for (let i in dataServ) {
      const date = new Date(dataServ[i].createdAt.seconds * 1000);
      switch (date.getMonth()) {
        case 0:
          ene.push(dataServ[i])
          break;
        case 1:
          feb.push(dataServ[i])
          break;
        case 2:
          mar.push(dataServ[i])
          break;
        case 3:
          abr.push(dataServ[i])
          break;
        case 4:
          may.push(dataServ[i])
          break;
        case 5:
          jun.push(dataServ[i])
          break;
        case 6:
          jul.push(dataServ[i])
          break;
        case 7:
          ago.push(dataServ[i])
          break;
        case 8:
          sep.push(dataServ[i])
          break;
        case 9:
          oct.push(dataServ[i])
          break;
        case 10:
          nov.push(dataServ[i])
          break;
        case 11:
          dic.push(adataServ[i])
          break;

        default:
          break;
      }

    }
    dataEventsAndActiv.push(ene.length)
    dataEventsAndActiv.push(feb.length)
    dataEventsAndActiv.push(mar.length)
    dataEventsAndActiv.push(abr.length)
    dataEventsAndActiv.push(may.length)
    dataEventsAndActiv.push(jun.length)
    dataEventsAndActiv.push(jul.length)
    dataEventsAndActiv.push(ago.length)
    dataEventsAndActiv.push(sep.length)
    dataEventsAndActiv.push(oct.length)
    dataEventsAndActiv.push(nov.length)
    dataEventsAndActiv.push(dic.length)

    let colorline = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
    dataEventsAndActivF.push({
      label: 'Uso del modulo web',
      data: dataEventsAndActiv,
      borderColor: colorline,
      backgroundColor: colorline,
    })

    setgraficDef(dataEventsAndActivF);
  }

  const selectGrafic = (varSelect) => {
    switch (varSelect) {
      case "1":
        getDataEvents()
        setgraficSelect(varSelect)
        break;
      case "2":
        getDataActivits()
        setgraficSelect(varSelect)
        break;
      case "3":
        getDataEstud()
        setgraficSelect(varSelect)
        break
      case "4":
        getDataAsistE()
        setgraficSelect(varSelect)
        break
      case "5":
        getDataAsistA()
        setgraficSelect(varSelect)
        break
      default:
        getDataEventsAndActiv()
        break
    }
  }

  const GraficRender = () => {

    switch (graficSelect) {
      case "1":
        options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Eventos por mes',
            },
          },
        };
        labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        data = {
          labels,
          datasets: eventsData,
        };
        return (
          <Line options={options} data={data} />
        )
      case "2":

        options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Actividades por mes',
            },
          },
        };
        labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        data = {
          labels,
          datasets: activiData,
        };
        return (
          <Line options={options} data={data} />
        )
      case "3":
        options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Estudiantes por curso',
            },
          },
        };

        data = {
          labels: labelsEstud,
          datasets: [
            {
              label: 'Estudiantes',
              data: cantEstud,
              backgroundColor: colorsCantd,
              borderColor: colorsCant,
              borderWidth: 1,
            },
          ],
        };
        return (
          <div className='stylePaiChart'>
            <Doughnut options={options} data={data} />
          </div>
        )
      case "4":
        labels = ['Eventos'];
        options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Asistencia a eventos',
            },
          },
        };
        data = {
          labels,
          datasets: asistEvent,
        };
        return (
          <Bar options={options} data={data} />
        )
      case "5":
        labels = ['Actividades'];
        options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Participaciones por actividad',
            },
          },
        };
        data = {
          labels,
          datasets: asistActiv,
        };
        return (
          <Bar options={options} data={data} />
        )
      default:
        options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Eventos por mes',
            },
          },
        };
        labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        data = {
          labels,
          datasets: graficDef,
        };
        return (
          <Line options={options} data={data} />
        )
    }


  }


  if (sessionStorage.getItem('valid') !== '1') {
    return (
      <div>
        <h1>No eres admin logueate como uno</h1>
        <button
          onClick={SendProyect}
        > Go login</button>
      </div>
    )
  } else {
    return (



      <div>

        <div className='d-flex justify-content-center mt-5'>
          <div className='divBtnsGraf'>
            <button className='btnDSAdmin clor1' onClick={() => selectGrafic('1')}>
              <p className='txtImgsGraphic'>Eventos por mes</p>
              <img
                className='graficImg'
                src={img1}
              />
            </button>
            <button className='btnDSAdmin clor2' onClick={() => selectGrafic('2')}>
              <p className='txtImgsGraphic'>Actividades por mes</p>
              <img
                className='graficImg2'
                src={img3}
              />
            </button>
            <button className='btnDSAdmin clor3' onClick={() => selectGrafic('3')}>
              <p className='txtImgsGraphic'>Estudiantes por curso</p>
              <img
                className='graficImg'
                src={img1}
              />
            </button>
            <button className='btnDSAdmin clor4' onClick={() => selectGrafic('4')}>
              <p className='txtImgsGraphic'>Asistencia a eventos</p>
              <img
                className='graficImg2'
                src={img3}
              />
            </button>
            <button className='btnDSAdmin clor5' onClick={() => selectGrafic('5')}>
              <p className='txtImgsGraphic'>Participacion en actividades</p>
              <img
                className='graficImg'
                src={img1}
              />
            </button>
          </div>
        </div>

        <div className='stileGraphic mb-5'>
          <GraficRender></GraficRender>
        </div>

        <div className='d-flex justify-content-center mt-2 mb-5'>
          <button className='btnDSAdmin clor6' onClick={() => SendLista()}>
            <p className='txtImgsGraphic'>Ver listas de actividades</p>
            <img
              className='graficImg2'
              src={img7}
            />
          </button>

          <button className='btnDSAdmin clor6' onClick={() => SendCreate()}>
            <p className='txtImgsGraphic'>Crear nuevos usuarios</p>
            <img
              className='graficImg2'
              src={img5}
            />
          </button>

          <button className='btnDSAdmin clor6' onClick={() => SendConfig()}>
            <p className='txtImgsGraphic'>Configuraciones generales</p>
            <img
              className='graficImg2'
              src={img9}
            />
          </button>

          <button className='btnDSAdmin clor6' onClick={() => SendProyect()}>
            <p className='txtImgsGraphic'>Salir</p>
            <img
              className='graficImg2'
              src={img6}
            />
          </button>
        </div>


      </div>
    )

  }

}
