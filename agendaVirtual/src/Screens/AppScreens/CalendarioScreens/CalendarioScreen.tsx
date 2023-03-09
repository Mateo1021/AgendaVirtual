import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import { grey100, grey700, red300 } from 'react-native-paper/lib/typescript/styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import defineLocale from '../../../core/defineLocale';

LocaleConfig.locales['fr'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar','Abr','May','Jul','Jul.','Agos','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mier.','Jue.','Vie.','sab.']
};
 
LocaleConfig.defaultLocale = 'fr';

const timeToString = (time : any) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export const CalendarioScreen: React.FC = () => {
  const [items, setItems] = useState({});

  const loadItems = (day: any) => {
    setTimeout(() => {

      const nDnate = new Date();
        const strTime : any = timeToString(nDnate);
        // @ts-ignore
        if (!items[strTime]) {
          // @ts-ignore
          items[strTime] = [];

            // @ts-ignore
            items[strTime].push({
              name: 'Evento ' + strTime + ' #' ,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          
        }
      
      const newItems : any= {};
      Object.keys(items).forEach((key) => {              
        // @ts-ignore
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item : any) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{
                color:'black'
              }}>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2023-03-09'}
        renderItem={renderItem}

      />
        <TouchableOpacity
          style={{

          }}
          onPress={() => console.log('test')}
        >
          <View style={{

          }}>
            <Icon name={'squared-plus'} size={40} color='#ed7c23' />
          </View>
        </TouchableOpacity>
    </View>
  );

}