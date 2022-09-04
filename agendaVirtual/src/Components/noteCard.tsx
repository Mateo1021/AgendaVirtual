import React from 'react';
import { Text, View } from 'react-native'
import { stylesApp, colors } from '../Themes/AppThemes';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';

export const NoteCard = ({note}:any) => {



       return (
             <View style={stylesApp.cardTaskStyle}>
               <Card>
                 <CardTitle 
                 titleStyle={stylesApp.textCardTitle}
                 style={stylesApp.styleCardTitel}
                   title={note._data.Titulo}
                 />
                 <CardContent textStyle={stylesApp.textCardBody} text={note._data.body} />
                 <CardAction 
                   textStyle={stylesApp.textCardFooter}
                   separator={true} 
                   inColumn={false}>
     
                   <CardButton
                     textStyle={stylesApp.textCardFooterButtom}
                     onPress={() => {}}
                     title='Editar'
                     color='black'
                   />
                 </CardAction>
               </Card>
             </View>
      
     
       )
     }