import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,Asy, Dimensions, Image } from 'react-native'
import React, { useState,useRef, useEffect } from 'react'
import { Avatar, Center, View as ViewB ,Text as TextB} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigation ,Route, useRoute} from "@react-navigation/native"
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from "moment";

export default function MsgComponent({item}) {
    const list = useRoute()

   const {name} =  list.params
    const currentUserId=()=>{
        return  auth().currentUser.uid
      }
  return (
    <ViewB style={styles.container} >            
    <ViewB style={{ backgroundColor: item.user_id == currentUserId() ? "#dfdfdfdf" : "#20b9d6", borderTopLeftRadius: item.user_id == currentUserId() ? 10 :0, alignSelf: item.user_id == currentUserId() ? 'flex-end' : 'flex-start',borderRadius:10,padding:10
  }}>
   
       
             {item.user_id !== currentUserId() ? <Text style={styles.name}> {name} </Text>: ""}
      <Text style={styles.mess} >{item.message}</Text>
      <Text style={{ alignSelf: "flex-end",color:"gray" }}>{moment(item.created_at).format('LT')} </Text>

   
    </ViewB>



  </ViewB>
  )
}

const styles = StyleSheet.create({
    totalView: {
      backgroundColor: "#000",
      flex: 1
    },
    chat: {
  
      backgroundColor: "#fff",
      marginTop: 10,
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  
  
    },
    container: {
  
  
      padding: 5
    },name:{
      fontWeight:"bold",
      color:"#fff",
      fontSize:15,
      marginBottom:5
      
    },
    mess:{
  
      color:"#000",
      fontWeight:"300",
      fontSize:14
  
    },
    input:{
      // backgroundColor:"green",
      borderColor:"#000",
      borderWidth:1,
      flex:1,
      marginHorizontal:5,
      borderRadius:50,
  paddingVertical:5,
      color:"#000",
      fontSize:15
    
      
  
    },send:{
      padding:10,
      borderRadius:50,
      alignSelf:"center",
      backgroundColor:'#3c9dea',
      color:"#fff",
      marginHorizontal:5
  
    }
  
  })