import { StackScreenProps } from '@react-navigation/stack'
import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, Button, Dimensions, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TaskCard } from '../../Components/TaskCard';
import { useTareas } from '../../Hooks/useTareas';
import { colors, stylesApp } from '../../Themes/AppThemes';
import Carousel from 'react-native-snap-carousel';
import { usePuntaje } from '../../Hooks/usePuntaje';
import { PuntajeComp } from '../../Components/HomeComponets/PuntajeComp';
import { IdentitiCard } from '../../Components/HomeComponets/IdentitiCard';
import { useIdentification } from '../../Hooks/UserHooks/useIdentification';
import { infoUser } from '../../Hooks/UserHooks/infoUser';
import { async } from '@firebase/util';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import { useContext } from 'react';
import { ProyectContext } from '../../Context/ContextProyecto/ProyectContext';
import { generalArray } from '../../Context/ContexGeneralVar/generalArray';

interface Props extends StackScreenProps<any, any> { };
export const HomeScreen = ({ navigation, route }: Props) => {

  const {addCours} =generalArray()

  const { getTareas, tareas, isLoading } = useTareas();

  const { info, getInfoUser, isLoadingIn } = useIdentification();

  let dimencionSWind = (Dimensions.get('window').width) - 50;
  const { authState } = useContext(AuthContext);

  const [puntaje, setpuntaje] = useState('')

  useLayoutEffect(() => {
    //@ts-ignore
    var unsubscribe = firestore().collection("Usuarios").doc(authState.uid)
      .onSnapshot((querySnapshot) => {
        //@ts-ignore
        setpuntaje(querySnapshot.data().Puntaje);

      });
    return unsubscribe;
  }, []);

  async function callInfoFuntion() {
    await getTareas()
    await getInfoUser()
  }

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      callInfoFuntion()
    });
    return focusHandler;
  }, [navigation]);



/*   const { setDataProyect } = useContext(ProyectContext)

  addCours('test') */

  if (isLoading || isLoadingIn) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
      </View>
    )
  }
  return (
    <ScrollView style={{
      flex: 1
    }}>
      <View style={stylesApp.stylHome}>
        <View style={stylesApp.styleCarruserHome}>
          <Carousel
            data={tareas}
            renderItem={({ item }: any) => <TaskCard tarea={item}></TaskCard>}
            sliderWidth={410}
            itemWidth={dimencionSWind}
          />
        </View>


        <View style={stylesApp.styleidentitiHome}>
          <IdentitiCard
            infoUser={info}
          ></IdentitiCard>
        </View>

        <View style={stylesApp.stylePuntajeHome}>
          <PuntajeComp
            puntaje={puntaje}
          ></PuntajeComp>
        </View>

      </View>
    </ScrollView>
  )

}
