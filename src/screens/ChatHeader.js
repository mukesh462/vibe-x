import {  Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedbackBase, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, Menu } from 'native-base'
import Ionicon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo"
import {useNavigation , useRoute} from "@react-navigation/native"
// import { Avatar } from '@ui-kitten/components';
import { Avatar , View as ViewB, Text as TextB } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ProfileModel from './Models/ProfileModel';

export default function ChatHeader() {

const navigation = useNavigation()
const [pop, setpop] = useState(false)
const [users, setusers] = useState('')
const list = useRoute()

   const {name,details} =  list.params

   useEffect(() => {
    database().ref('users/'+ details.person).on('value',snap=>{
      if(snap.val()!=null){
        setusers(snap.val())
     
      }
        })
   }, [])
   
// console.log('***',users.liveStatus)
  return (
    <View>
      <ProfileModel action={pop} img={users.profile !=''? {uri:users.profile}: require('../asset/no_profile.jpg')} remove={setpop}/>
    <HStack style={styles.topBar}>
        <Ionicon name="arrow-back-outline" color={"#fff"} size={30} onPress={()=>navigation.navigate('Home')} />
        <ViewB flexDirection={"row"}  paddingLeft={6} alignItems={"center"} >
          <Pressable onPress={()=> setpop(true) }>
               <Avatar   size="md" source={users.profile !=''? {uri:users.profile}: require('../asset/no_profile.jpg')}>

            <Avatar.Badge bg={users.liveStatus !== 0?"green.400":'gray.400'}></Avatar.Badge>
            
        </Avatar>
          </Pressable>
         
        <TouchableHighlight underlayColor={"gray"} >
            <TextB  isTruncated fontSize={25} color="#fff" paddingLeft={5} bold={true} w={"200"}>{users.userName}</TextB>
        </TouchableHighlight>
      
        </ViewB>
        
        <Box    flexDirection={"row"}  >
        <Ionicon style={styles.icons}  name='call'  color={"#fff"} size={20}/>
      <Menu w="190" backgroundColor={"#dfdfdf"}  trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Entypo
            name="dots-three-vertical"
            size={20}
            style={styles.icons}
            color="#fff"
          ></Entypo>
            </Pressable>;
    }}>
        <Menu.Item>
       
      Block
        </Menu.Item>
        <Menu.Item>
       
       Set Wallpaper
         </Menu.Item>
      </Menu>
    </Box>
    </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
    topBar:{
        height:120,
        alignItems:"center",
        backgroundColor:"#000",
        justifyContent:"space-evenly",
        paddingHorizontal:20
        
    
        
    },
    icons:{
        backgroundColor:'#3c9dea',
        padding:10,
        borderRadius:50,margin:5
      
    }
})