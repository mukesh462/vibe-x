import { StyleSheet, Text, View ,BackHandler,ImageBackground} from 'react-native'
import React, { useEffect } from 'react'
import { background } from 'native-base/lib/typescript/theme/styled-system'
import { useNavigation } from '@react-navigation/native'
import NetInfo from "@react-native-community/netinfo";
import auth from '@react-native-firebase/auth';
const NoInternet = () => {
  const navi =useNavigation();

useEffect(() => {
  setTimeout(function(){
    NetInfo.fetch().then(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      if(state.isConnected){
        
        if(auth().currentUser != null){
           navi.navigate('Home')
        }else{
          navi.navigate('Login')
        }
 
      }else{
        BackHandler.exitApp();
      }
    });
  
}, 5000);
}, [])


  return (
<ImageBackground style={{flex:1,}} resizeMode={'contain'} source={require("../asset/no.png")} >
  <Text style={{justifyContent:"center",alignSelf:"center",fontSize:50,marginTop:100}}>No Internet</Text>
</ImageBackground>
  )
}

export default NoInternet

const styles = StyleSheet.create({})