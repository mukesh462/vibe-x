import { View, Text, ImageBackground, Animated } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { Box, Button, Center, HStack, Image } from 'native-base'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Start({navigation}) {
 const postion = useRef(new Animated.Value(100)).current
  useEffect(() => {
    Animated.timing(postion,{
      toValue : 0,
      duration : 1000,
      useNativeDriver:true
    }).start()
    NetInfo.fetch().then(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      if(state.isConnected){
         setTimeout(function(){
        if(auth().currentUser != null){
           navigation.navigate('Home')
        }else{
          navigation.navigate('Login')
        }
       
    }, 3000);
      }else{
        navigation.navigate('NoInternet')
      }
     
    });
   
  }, [])
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@userAuth', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  return (
    
      // <ImageBackground resizeMode="cover" style={{flex:1}} imageStyle={{transform:[{rotate:"180deg"}]}} source={{uri:"https://i.pinimg.com/originals/02/cc/d6/02ccd67acc7ebc1c7337053da0d6c924.png"}}>
      
    
      
      <Center flex={1} style={{backgroundColor:"#000"}} justifyContent={"center"} alignItems={'center'} >
      <Image height="100%" resizeMode='contain' width="100%" source={require('../asset/logo.png')} alt="Alternate Text"  marginBottom={20} />
      {/* <Animated.View style={{ transform : [{  */}
      {/* // translateY : postion,  */}
    {/* // }]}}> */}
      {/* <Box bgColor={"#000"} _text={{color:"#fff",textAlign:"center",fontWeight:550}} borderRadius={35} padding={3} width="220px" >
        <Button bgColor={"#000"} fontSize={25} onPress={() => navigation.navigate('Home')}>
        Get Started
        </Button> */}
   
        {/* </Box> */}
      {/* </Animated.View> */}
     
      
      </Center>
   

   
      

    // </ImageBackground>
 
  )
}