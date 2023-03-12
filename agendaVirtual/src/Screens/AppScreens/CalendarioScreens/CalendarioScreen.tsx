import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import { grey100, grey700, red300 } from 'react-native-paper/lib/typescript/styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import defineLocale from '../../../core/defineLocale';
import { useTareas } from '../../../Hooks/useTareas';
import { colors } from '../../../Themes/AppThemes';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar','Abr','May','Jul','Jul.','Agos','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mier.','Jue.','Vie.','sab.']
};
 
LocaleConfig.defaultLocale = 'es';

const timeToString = (time : any) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export const CalendarioScreen = () => {
  
  const [items, setItems] = useState({});
  const navigation = useNavigation();
  const {getTareas,tareas, isLoading}=useTareas();

  function toDateTime(secs:any) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

  const loadItems = () => {
    getTareas();
    setTimeout(() => {

      for(let x in tareas){

         let count =0;
                  // @ts-ignore
        const nDnate = toDateTime(tareas[x]._data.fechaEntrega.seconds);
          const strTime : any = timeToString(nDnate);
          // @ts-ignore
          if(!items[strTime]){
            // @ts-ignore
            items[strTime] = [];
            // @ts-ignore
            items[strTime].push({
            // @ts-ignore
            name: 'Evento ' + tareas[x]._data.body,
            // @ts-ignore
            id: tareas[x]._data.codTarea
          });
          }else{
            // @ts-ignore
            for(let t in items[strTime]){
              // @ts-ignore
              if(items[strTime][t].id == tareas[x]._data.codTarea){
                count++;
              }
              
            }
            // @ts-ignore
            if(!count>0 ){
              // @ts-ignore
            items[strTime].push({
              // @ts-ignore
              name: 'Evento ' + tareas[x]._data.body,
              // @ts-ignore
              id: tareas[x]._data.codTarea
            });
            }
          }
        const newItems : any= {};
        Object.keys(items).forEach((key) => {              
          // @ts-ignore
          newItems[key] = items[key];
        });
        setItems(newItems);
        
      }
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

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
        loadItems();

    });
    return focusHandler;
  }, [navigation]);

  return (
    
    <View style={{flex: 1}}>
      <View style={{flex: 11}}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={'2023-03-09'}
          renderItem={renderItem}

        />
      </View>
      <View           
      style={{
        flex:1,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'center',
/*         backgroundColor:'#ed7c23' */

          }}>

        <Button 
            color={colors.primary}
            title='Agregar nuevo evento'
            // @ts-ignore
            onPress={() => navigation.navigate('TareaScreen')}
          ></Button>
      </View>
    </View>
  );

}