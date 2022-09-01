import React from 'react';
import { Text, View } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { stylesApp } from '../Themes/AppThemes';



export const TaskCard = ({tarea}:any) => {

   let secondsToDate = (tarea._data.fechaEntrega.seconds)*1000;
   let date = new Date(secondsToDate);
   let datePrint = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
   
  return (
        <View style={stylesApp.cardTaskStyle}>
            <Text style={stylesApp.textCardTitle}>
            {tarea._data.titulo}
            </Text>   

            <Text style={stylesApp.textCardBody}>
            {tarea._data.body}
            </Text>  
            
            <Text style={stylesApp.textCardFooter}>
            {datePrint}
            </Text>  
        </View>
 

  )
}
