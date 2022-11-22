import React from 'react';
import { Text, View } from 'react-native'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { stylesApp } from '../../Themes/AppThemes';
export const IdentitiCard = () => {



  return (
    <View style={stylesApp.cardIdentit}>
    <Card>
      <CardTitle 
      titleStyle={stylesApp.textCardTitle}
      style={stylesApp.styleCardTitel}
        title={'tarea._data.titulo'} 
      />
      <CardContent textStyle={stylesApp.textCardBody} text='{tarea._data.body} '/>
      <CardAction 
        textStyle={stylesApp.textCardFooter}
        separator={true} 
        inColumn={false}>

        <CardButton
          textStyle={stylesApp.textCardFooterButtom}
          onPress={() => {}}
          title='{datePrint}'
          color='black'
        />
      </CardAction>
    </Card>
  </View>
  )
}
