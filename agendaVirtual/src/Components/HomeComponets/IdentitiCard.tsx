import React from 'react';
import { Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { stylesApp } from '../../Themes/AppThemes';
export const IdentitiCard = () => {

  return (
  <View style={stylesApp.cardIdentit}>
    <View style={{
      flexDirection:'row',
      paddingTop:20,
      paddingHorizontal:10,
      justifyContent:'space-between'
    }}>
      <View>
      <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/agenda-virtual-fearc.appspot.com/o/userImgs%2FtestUSer.jpg?alt=media&token=07be05ce-0f33-4cac-8858-7fceba340d3b" }}
          />
      </View>
      <View style={{
      flexDirection:'column',
      paddingHorizontal:15,
      justifyContent:'space-between'
      }}>
        <Text style={{
          fontWeight: 'bold',
          color: 'black',
        }}>Mateo Peña Duran</Text>
        <Text style={{
          fontWeight: 'bold',
          color: '#ed7c23',
        }}>Activo</Text>
        <Text style={{
           color: 'black',
        }}>Mateopd1021@gmail.com</Text>
        <Text style={{
           color: 'black',
        }}>23 años</Text>
        <Text style={{
           color: 'black',
        }}>Estudiante de ingenieria</Text>
        <Text style={{
           color: 'black',
        }}>SD231A2AD3DWT54W</Text>
      </View>
      <View>
      <Icon name={'star'} size={25} color='#ed7c23' />
      </View>
    </View>
  </View>
  )
}
