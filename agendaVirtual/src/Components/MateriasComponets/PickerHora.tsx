import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { stylesApp } from '../../Themes/AppThemes';



export const PickerHora = ({dias}:any) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fullHora, sethora] = useState('00:00')
    const [horaFormat, sethoraF] = useState('')

    let fullHoraV:string = '';
    const onChange = (event:any, selectedDate:any) => {

        let getHora = new Date(selectedDate)
        let hora = getHora.getUTCHours();
        let minut =  getHora.getUTCMinutes()
        fullHoraV = hora+':'+minut
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        console.log(fullHoraV);
        btnHora()
    };
    function btnHora (){
        let horaComplet = fullHoraV.split(':')[0].length < 2 ? '0'+fullHoraV.split(':')[0]+','+'AM' : ((Number(fullHoraV.split(':')[0]) + 11) % 12 + 1)+','+'PM' ;
        let minCoplet = fullHoraV.split(':')[1].length < 2 ? '0'+fullHoraV.split(':')[1] : fullHoraV.split(':')[0];
        sethoraF(fullHoraV)
        sethora(horaComplet.split(',')[0]+':'+minCoplet+' '+horaComplet.split(',')[1])
    }


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
    const showTimepicker = () => {
      showMode('time');
    };


    return (
        <View>
            <View>
                <Text style={stylesApp.titles}>{dias}</Text>
            </View>
            <Text style={stylesApp.generalText}>Hora Inicio</Text>
            <View>
            <View>
            <Button onPress={showTimepicker} title={fullHora} />
            </View>
            {show && (
            <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
            />
            )}
        </View>
        <Text style={stylesApp.generalText}>Hora Fin</Text>
        <View>
            <View>
            <Button onPress={showTimepicker} title={fullHora} />
            </View>
            {show && (
            <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
            />
            )}
        </View>
      </View>
 )
}
