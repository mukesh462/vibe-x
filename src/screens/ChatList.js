import { AppState, BackHandler, Dimensions, FlatList, ImageBackground, PixelRatio, ScrollView, StyleSheet, Text, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { background, border, position } from 'native-base/lib/typescript/theme/styled-system'
import { Box, Container ,Avatar, Badge, View as ViewB , Text as TextB, Image, Divider, Pressable, PresenceTransition, Fab} from 'native-base'
import StatusBars from './StatusBar'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Ionicon from "react-native-vector-icons/Ionicons";
import moment from 'moment'
import  arraySort from 'array-sort'
import messaging from '@react-native-firebase/messaging';
let {width,height} = Dimensions.get('window');
import notifee from '@notifee/react-native';
import { useFocusEffect } from '@react-navigation/native'
import ProfileModel from './Models/ProfileModel'
import Connection from './Connection'

let widthScreen = Dimensions.get('window').width;

export default function ChatList({navigation}) {

  const [chatList, setchatList] = useState([])
  const [userList, setuserList] = useState([])
  const [dcToken, setdcToken] = useState('')
  const [exit, setexit] = useState(0)
  const [pop, setpop] = useState(false)
  const [prover, setprover] = useState('')


  
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const backAction = () => {
    setTimeout(() => {
      setexit(0);
    }, 2000); // 2 seconds to tap second-time

    if (exit === 0) {
      setexit(exit + 1);

      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
    } else if (exit === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useFocusEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  });


  useEffect(() => {
   
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
    
        if(appStateVisible !== 1){
           setAppStateVisible(1);
        }
       
      } else {
       
        if(appStateVisible !== 0){
          setAppStateVisible(0);
       }
        
      }
      appState.current = nextAppState;
     
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
  if (auth().currentUser.uid != null) {
     database().ref('users/' + auth().currentUser.uid).update({
    liveStatus:appStateVisible
  })
  }
  
  }, [appStateVisible])
  


 useEffect(() => {
  setUsers()

  getUserChatRoom()
  registerAppWithFCM()

 }, [])
 async function registerAppWithFCM() {
   await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  setdcToken(token);
  database().ref('users/'+ auth().currentUser.uid).on('value',snap=>{
    // console.log('sna',snap.val().token)
    // if (snap.val().token != '' && dcToken != snap.val().token) {
      database().ref('users/'+ auth().currentUser.uid ).update({
        token:token
      })
      // setdcToken(snap.val().token)
    // }
  })
}
// console.log('tone',dcToken)
 const getUserChatRoom =()=>{
  // console.log('userfrmom',userList)
  database().ref('users/'+ auth().currentUser.uid +'/'+ 'chatRooms').on('value',snap=>{
    if (snap.val() !== null) {
      setchatList(Object.values(snap.val()))
    } else {
      console.log('null')
    }
  })
}

useEffect(() => {

}, [userList])

 const setUsers= ()=>{

  database().ref('users').on('value',  snap => {
     if (snap.val() !== null) {
        setuserList(Object.values(snap.val()))
     
     }

   })
   
}
 const renderName =(items)=>{
  // console.log('income',items)
//  console.log('user',userList)
    const found = userList.find(element => element.uid == items);
//  console.log('outcome',found)
  return  found == undefined ? {userName:'...'}:found;
}

function byDate(a, b) {
  //chronologically by year, month, then day
  return moment.utc(b.lastmsgTime).diff(moment.utc(a.lastmsgTime))
//timestamps
}



  const renderItem = ({ item ,index}) => {
    return (
      
         <View style={styles.List}>
     
   <Box p="3"   style={styles.Box} flexDirection="row"   _text={{
    fontSize: "md",
    fontWeight: "bold",
    color: "white"
    }}>
    <TouchableOpacity  style={{width:widthScreen/7,marginRight:3}} onPress={()=> {setpop(true),setprover(renderName(item.person).profile !=''? {uri:renderName(item.person).profile}: require('../asset/no_profile.jpg'))}}>
             <Image
          
          size="sm"
          rounded={"2xl"}
         alt="profile"
          source={renderName(item.person).profile !=''? {uri:renderName(item.person).profile}: require('../asset/no_profile.jpg')}
        ></Image>
          </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate("Chat",{details:item,name:renderName(item.person).userName})} style={{flexDirection:'row'}}>
           <ViewB  marginX={3}  borderColor="blue.500" >
    
    <TextB isTruncated maxW={widthScreen /3} flexWrap='wrap'> {renderName(item.person).userName}</TextB>
    <TextB isTruncated maxW={widthScreen /2} color={item.type==1 ?"blue.400":null}>{ item.type==1 ? 'Typing...':item.lastmsg}</TextB>
    
 
   </ViewB>
   <ViewB  marginLeft={1} style={{width:moment(moment(item.lastmsgTime).toDate()).calendar().length ==10 ?widthScreen/5:widthScreen/2.5}} >
    <TextB fontSize={'xs'}>{  item.lastmsgTime !='' ?moment(moment(item.lastmsgTime).toDate()).calendar():null}</TextB>
   

    </ViewB>
       </TouchableOpacity>
        </Box>   
        </View>
      
     
    );  
  };



  return (
    <View style={styles.MainList}>
    <Connection/>
    <ProfileModel action={pop} remove={setpop} img={prover}/>
      { chatList.length == 0 ? 
   <ViewB position={'relative'} top={-35} >
     
    <Image alt='message image' size={550} resizeMode='center' source={require('../asset/message.png')}/>
   <TextB  flexWrap={'wrap'}  position={'relative'} top={-50} padding={5} fontSize={'xl'} color={'#000'} >Tap on Search Icon and Chat with your Friends and Enjoy It </TextB>
   </ViewB>:
      <>
        <View>
          {/* <StatusBars/> */}
      </View>
   
    <FlatList
        data={chatList.sort(byDate)}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        
      
      />
      <Fab renderInPortal={false} shadow={2}   backgroundColor={"#000"}  bottom={50} size="md" icon={<Ionicon name='chatbubble-ellipses-outline' color={"#fff"} size={30}/>} />
      </>
    }
      {/* onPress={()=>navigation.navigate("Login")} */}
     
    </View>
  )
}

const styles = StyleSheet.create({
    MainList:{  
        height:'100%',
        width:width,
 
        
        backgroundColor:"#fff",
        borderTopLeftRadius:40,
    borderTopRightRadius:40,



    },
    List:{

    },
    TextName:{
      color:"#000",
      paddingBottom:10,
      fontSize:15,
 
      
      
      
    },
    Box:{
    justifyContent:'space-between',
    
    // marginHorizontal:3,
    // backgroundColor:'red'
    },
    TextLast:{
      color:"#000",
      position:"relative",
      left:18
    },
    lastSeen:{
      color:"#000",
      paddingBottom:5
    },lastGroup:{
      // left:width/10*3
    }
})