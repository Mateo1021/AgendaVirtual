import React, { useEffect, useState } from 'react'
import { useMaterias } from './useMaterias'

export const useHorarioList = () => {

    const [dataToHorario, setdataToHorario] = useState([])
    
    const getMateriasUser = async () =>{ 
 
    const {materias} = useMaterias()
    let materiasArry : any= []
    for(let x in materias){
      let infoMateria = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nombre : materias[x]._data.nombre,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        repet : materias[x]._data.repet
      }
      materiasArry.push(infoMateria)  
    }
  
  var date = new Date();
  var numberOfMlSeconds = date.getTime();
  var addMlSeconds = 60 * 300000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  
  function sumarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  
  let dayInicial;
  if(newDateObj.getUTCDay() >1){
    dayInicial = sumarDias(newDateObj,-(newDateObj.getUTCDay()-1));
  }else{
    dayInicial = newDateObj;
  }
  
  let diasSemana = [];
  let dayMilisegundos = 1440000;
  const diasSem = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo'
  ];
  for(let i = 0; i<7;i++){
    var dateNumber = dayInicial.getTime();
    var dateSumDay = 60 * dayMilisegundos*i;
    var newDateSum = new Date(dateNumber+dateSumDay);
    let arrayDateSemana = {
      date:newDateSum,
      dia: diasSem[i]
    }
    diasSemana.push(arrayDateSemana)
  }
  let sampleEventsComp =[]
  
  function restarHoras(hora1:any, hora2:any) {
    // Convertir las horas a milisegundos
    let hora1ms = hora1.getTime();
    let hora2ms = hora2.getTime();
  
    // Calcular la diferencia en milisegundos
    let diferenciaMs = hora2ms - hora1ms;
  
    // Convertir la diferencia de milisegundos a horas
    let horas = new Date(diferenciaMs)
  
    // Devolver el resultado
    return horas;
  }
  
  for(let mate in materiasArry){
    for(let dia in materiasArry[mate].repet){
      let diaSemana = diasSemana.find(x=>x.dia == materiasArry[mate].repet[dia].dia);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let mes = (diaSemana?.date.getMonth()+1).toString().length >1 ?(diaSemana?.date.getMonth()+1).toString() : '0'+(diaSemana?.date.getMonth()+1).toString();
      let year = diaSemana?.date.getUTCFullYear();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let diaS = diaSemana?.date.getDate().toString().length > 1? diaSemana?.date.getDate():'0'+diaSemana?.date.getDate();
      let hora = materiasArry[mate].repet[dia].horaI
      let horaFin = materiasArry[mate].repet[dia].horaF;
  
      let hi = new Date(year+'-'+mes+'-'+diaS+'T'+hora+':00');
      let hf = new Date(year+'-'+mes+'-'+diaS+'T'+horaFin+':00');
      let horaRest = restarHoras(hi,hf);
  
      let horaRestH = horaRest.getHours().toString().length >1? horaRest.getHours():'0'+horaRest.getHours()
      let horaRestM = horaRest.getMinutes().toString().length >1? horaRest.getMinutes():'0'+horaRest.getMinutes()
      let dataMateria  = {
        note:materiasArry[mate].nombre,
        start: year+'-'+mes+'-'+diaS+' '+hora+':00',
        duration:horaRestH+':'+horaRestM+':00'
      }
      sampleEventsComp.push(dataMateria)
    }
  }

  return sampleEventsComp;
}
const asyncFunction = async () =>{ 
    const datoscomplet = await getMateriasUser()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setdataToHorario(datoscomplet)
}
  useEffect(() => {
    asyncFunction()
}, [])



  return {dataToHorario};
}
