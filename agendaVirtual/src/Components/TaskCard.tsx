import React from 'react';
import { Text, View } from 'react-native'
import { stylesApp, colors } from '../Themes/AppThemes';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';



export const TaskCard = ({tarea}:any) => {

   let secondsToDate = (tarea._data.fechaEntrega.seconds)*1000;
   let date = new Date(secondsToDate);
   let datePrint = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
   
  return (
        <View style={stylesApp.cardTaskStyle}>
          <Card>
            <CardTitle 
            titleStyle={stylesApp.textCardTitle}
            style={stylesApp.styleCardTitel}
              title={tarea._data.titulo} 
            />
            <CardContent textStyle={stylesApp.textCardBody} text={tarea._data.body} />
            <CardAction 
              textStyle={stylesApp.textCardFooter}
              separator={true} 
              inColumn={false}>

              <CardButton
                textStyle={stylesApp.textCardFooterButtom}
                onPress={() => {}}
                title={datePrint}
                color='black'
              />
            </CardAction>
          </Card>
        </View>
 

  )
}
