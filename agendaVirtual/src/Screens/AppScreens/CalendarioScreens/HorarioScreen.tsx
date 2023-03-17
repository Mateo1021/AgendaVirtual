import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { stylesApp } from '../../../Themes/AppThemes';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { colors } from '../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import { HorarioComp } from '../../../Components/MateriasComponets/HorarioComp';
import { TouchableOpacity } from 'react-native-gesture-handler';
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

interface Props extends StackScreenProps<any, any> {};


export const HorarioScreen = ({ navigation }: Props) => {
//refres config  
const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)
      codCalendar();
    });
  }, []);
//......


React.useEffect(() => {
  const focusHandler = navigation.addListener('focus', () => {
    codCalendar();
  });
  return focusHandler;
}, [navigation]);

const [calState, calSetState] = useState({
  stateCal:'',
  flagCal:'0'
})
  const { authState } = useContext(AuthContext);


function codCalendar(){
      firestore()
      .collection('Horarios')
      .where('codEstud', '==', authState.uid)
      .get()
      .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
             
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                calSetState({calState,stateCal:documentSnapshot._data.codHorario})


        });
      }); 
}

  useLayoutEffect(() => {
    codCalendar()
  },[])

  if(calState.stateCal){
    return(

      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:80
      }}>
          <HorarioComp/>
          <Button 
            color={colors.primary}
            title='Editar'
            onPress={()=>navigation.navigate('editarHorarioScreen')}
          ></Button>

      </View>
  
    )
  }else{
    return(

      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
        
      }}>
          <Text style={{
            ...stylesApp.generalText,
            marginBottom:20,
          }}>Aun no tiene ningun horario reguistrado</Text>
          <Button 
            color={colors.primary}
            title='Crear un nuevo Horario'
            onPress={()=>navigation.navigate('NewHorario')}
          ></Button>
      </View>
  
    )
  }
  

}