import React from 'react'
import { RefreshControl, SafeAreaView, ScrollView, Text, View, TextInput } from 'react-native';
import { stylesApp } from '../../../Themes/AppThemes';
import { useContext, useLayoutEffect, useState } from 'react';

//refres config  
const wait = (timeout : any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
//......


export const ForoScreen = () => {
//refres config  
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
//......


const [stateMessage, setStateMessage] = useState({
    Message: ''
  })


  return (
        <SafeAreaView>
        <ScrollView
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />}>
            <View>
                <Text style={stylesApp.titles}>
                    hola foros
                </Text>


                <TextInput 
                style={stylesApp.generalText}
                onChangeText={(value) => setStateMessage({ ...stateMessage,Message:value})}
                ></TextInput>
            </View>
        </ScrollView>
        </SafeAreaView>
  )
}
