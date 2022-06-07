import 'react-native-gesture-handler';
import React from 'react'
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigatorLogin } from './src/Navigators/LoginNavigator/StackNavigatorLogin';
import { AuthProvider, authInitialState } from './src/Context/ContextUser/AuthContext';


import {initializeApp} from 'firebase/app'





export const App = () => {

  return (  
<NavigationContainer>
  <AppState>
    <StackNavigatorLogin></StackNavigatorLogin>
  </AppState>
</NavigationContainer>
  )
}



const AppState=({children}:any) =>{
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
export default App;