import {AppState } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import Home from './src/screens/Home'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Start from './src/screens/Start'
import Header from './src/screens/Header'
import ChatPage from './src/screens/ChatPage'
import ChatHeader from './src/screens/ChatHeader'
import ProfileView from './src/screens/ProfileView'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import NoInternet from './src/screens/NoInternet'
import UserSearch from './src/screens/UserSearch'
import Request from './src/screens/Request'
import auth from '@react-native-firebase/auth';
export default function App() { 

 







  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
     
<ApplicationProvider {...eva} theme={eva.light}>
<NavigationContainer>
      <Stack.Navigator  >
      <Stack.Screen name="Start"  options={{headerShown:false}} component={Start} />
       {/* { auth().currentUser ? */}
     
       
         <Stack.Screen name="Home" options={{header:()=><Header/>}}  component={Home} />
        <Stack.Screen name="Chat" options={{header:()=><ChatHeader/>}} component={ChatPage} />
        <Stack.Screen name="Profile" options={{headerShown:false}}   component={ProfileView} />
         <Stack.Screen name="NoInternet" options={{headerShown:false}}   component={NoInternet} />
        <Stack.Screen name="Search"  options={{headerShown:false}}   component={UserSearch} />
        <Stack.Screen name="UserRequest"  options={{headerShown:false}}   component={Request} />
       {/* </> : */}
       {/* <> */}
       
       <Stack.Screen name="Register" options={{headerShown:false}}   component={Register} />
      <Stack.Screen name="Login" options={{headerShown:false}}   component={Login} />
       
       {/* </> */}
    
    
      {/* } */}
       



      </Stack.Navigator>
    </NavigationContainer>
</ApplicationProvider>
    
 

    </NativeBaseProvider>
       
         
     
     
   

  )
}