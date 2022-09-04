import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { stylesApp } from '../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useAgenda } from '../../../Hooks/useAgenda';
import { colors } from '../../../Themes/AppColors';
import Carousel from 'react-native-snap-carousel';
import { NoteCard } from '../../../Components/noteCard';
//refres config  
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......
interface Props extends StackScreenProps<any, any> {};



export const AgendaScreen = ({ navigation, route }: Props) => {
  const {getNotes,notas,isLoading}=useAgenda();
//refres config  
const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)
      getNotes()
    });
  }, []);
//......

React.useEffect(() => {
  const focusHandler = navigation.addListener('focus', () => {
    getNotes();
  });
  return focusHandler;
}, [navigation]);


if(isLoading){
  return (
    <View style={{flex: 1, justifyContent:'center', alignContent: 'center' }}>
      <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
    </View>
  )
}

  return (

<SafeAreaView>
        <ScrollView
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />}>
        <View>

        <Carousel
            data={notas}
            renderItem={({item}:any)=><NoteCard note={item}></NoteCard>}
            sliderWidth={400}
            itemWidth={300}
            />
            
            <View style={{
              flex: 0,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingTop: 150
                }}
                onPress={() => navigation.navigate('newNoteScreen')}
              >
                <Text style={stylesApp.titles}>Nueva Nota.</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
        </SafeAreaView>
  )
}
