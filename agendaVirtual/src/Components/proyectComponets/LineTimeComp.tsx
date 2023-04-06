import React, { useLayoutEffect, useState } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { colors } from '../../Themes/AppThemes'
import firestore from '@react-native-firebase/firestore';

export const LineTimeComp = (id:any) => {

    const [dataTimeLine, setdataTimeLine] = useState([])

    const formatDate = (date: Date) => {
        let meses = ['ene', 'feb', 'marz', 'abri', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
        // @ts-ignore
        let secondsToDate = (date.seconds) * 1000;
        let dateF = new Date(secondsToDate);
        let datePrint = meses[dateF.getMonth()] + " - " + dateF.getDate();
        return datePrint
      }


    useLayoutEffect(() => {

        var unsubscribe = firestore().collection("evento").orderBy('createdAt', 'asc')
          .onSnapshot((querySnapshot) => {
            var msj: any = [];
            querySnapshot.forEach((doc) => {
              // @ts-ignore
    
    
              if (doc.data().idCurso == id.id) {
    
    
                msj.push(
                  {
                    time: formatDate(doc.data().createdAt),
                    description: doc.data().body,
                    title: doc.data().titulo,
                  }
                );
              }
    
            });
    
    
            setdataTimeLine(msj)
          });
    
        return unsubscribe;
    
      }, []);

  return (
    <Timeline
    data={dataTimeLine}
    circleSize={20}
    circleColor={colors.primary}
    lineColor={colors.secundary}
    timeContainerStyle={{ minWidth: 52, marginTop: 5 }}
    timeStyle={{ textAlign: 'center', backgroundColor: colors.secundary, color: 'white', padding: 5, borderRadius: 13 }}
    descriptionStyle={{ color: 'black' }}
    isUsingFlatlist={true}
    titleStyle={{ color: 'black' }}
  />
  )
}
