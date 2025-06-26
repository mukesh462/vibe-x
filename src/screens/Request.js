
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Text as TextB, View as ViewB, Center, Container,Button as ButtonB } from "native-base";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { Button, ListItem ,List,Avatar} from '@ui-kitten/components';
import Feather from "react-native-vector-icons/Feather"
import AcceptModel from './AcceptModel';

const {height,width} = Dimensions.get("window");
export default function Request() {


  const [result, setresult] = useState(false)
  const [status, setstatus] = useState(1)
  const [userList, setuserList] = useState([])
  const [received, setreceived] = useState([])
  const [openModel,setopenModel] = useState(false)
  const [currentUser, setcurrentUser] = useState([])

  const [send, setsend] = useState([])
  useEffect( () => {
    setUsers()
     database().ref('userRequest/'+ auth().currentUser.uid).on('value',snap =>{
      if (snap.val()!== null) {
         setsend(Object.values(snap.val()))
      }
     console.log('list',snap.val())
    })
   
  database().ref('allRequest').on('value',snap =>{
      if (snap.val()!== null) {
        console.log('online',Object.values(snap.val()))
        const valueEx= Object.values(snap.val())
        setreceived( valueEx.filter(item =>{
 return item.requester_id == auth().currentUser.uid
        } ))
        
      }
    })
   
  }, [])
  
  console.log('final',received)
  console.log('sta',userList)

useEffect(() => {
 console.log('userlist',userList)
}, [userList])

  const setUsers= async()=>{
    await  database().ref('users' ).on('value',async(snap)=>  {
      if (snap.val()!== null) {
      await  setuserList(Object.values(snap.val()))
     }
      
    } )
  }


const renderName =(items)=>{
  console.log('income',items)
  const found = userList.find(element => element.uid == items);
 
 console.log('outcome',found)
 return  found == undefined ? {userName:'...'}:found;
}


  const senderItem = ({ item, index }) => (
    <ListItem
      title={renderName(item.requester_id).userName}
      description={renderName(item.requester_id).about}
      accessoryLeft={()=>(
        <Image  style={{width:40,height:40,borderRadius:50}} source={renderName(item.senderId).profile !=''?{
          uri:renderName(item.senderId).profile
        }: require('../asset/no_profile.jpg')}></Image>
      )}
      accessoryRight={<>
      <Button size='tiny' status={item.request_status == 0 ? 'warning':"danger" }>{item.request_status == 0 ? 'Pending': item.request_status ==1 ?'Message':"Rejected" }</Button>
      
      
      </>}
    />
  );
  const ReceivedItem = ({ item, index }) => (
    <ListItem
    title={renderName(item.senderId).userName}
    description={renderName(item.senderId).about}
    accessoryLeft={()=>(
      <Image  style={{width:40,height:40,borderRadius:50}} source={renderName(item.senderId).profile !=''?{
        uri:renderName(item.senderId).profile
      }: require('../asset/no_profile.jpg')}></Image>
    )}
      accessoryRight={<>
      {item.request_status == 1? <ButtonB>Message</ButtonB> :

      item.request_status== 2 ?  <ButtonB  marginRight={3} colorScheme={"danger"} > Rejected</ButtonB>:
      <>
       <ButtonB  marginRight={3} colorScheme={"danger"} onPress={()=> {setstatus(2)
         setopenModel(true)
         setcurrentUser(item)
         
         }} ><Feather size={15} name='x' color={"#fff"}/></ButtonB>
      <ButtonB colorScheme={"success"}  onPress={()=>{ setopenModel(true)
      setstatus(1)
      setcurrentUser(item)
      }} ><Feather size={15} name='check' color={"#fff"}/></ButtonB>
      {openModel == true ? <AcceptModel userData={currentUser} token={renderName(item.senderId).token} clear={setcurrentUser} action={openModel} trigger={setopenModel} type={status}  /> : ""}
      </>
      }
     

      
      
      </>}
    />
  );
console.log('daaaa',)
  const navigation= useNavigation()
  return (
    <View>
     <ViewB style={styles.top}>
     
        <Ionicon
              name="arrow-back-outline"
              size={30}
              style={{paddingLeft:10}}
              color="#fff"
              onPress={() => navigation.goBack()}
            ></Ionicon>
            <TextB style={styles.text}>Connect Request</TextB>
    
     
     </ViewB>
<ViewB padding={5}>
  <Center marginX={25}   justifyContent={"space-evenly"} flexDirection={"row"}>

<Button status='success'  size='medium'  onPress={()=>setresult(false)}> Received</Button>
<Button status='info'    size='medium' onPress={()=>setresult(true)}> Sender</Button>

  </Center>
</ViewB>
{(() => {
       if (result == true) {
        if(send.length == 0){
          return <ImageBackground resizeMode='contain' style={{width:"100%",height:'100%',marginBottom:-450}} source={require('../asset/nolist.png')}/>
        }else{
        return  <List
      style={styles.container}
      data={send}
      renderItem={senderItem}
    />

        }

       } else if(result == false) {
        if (received.length == 0) {
          return <ImageBackground resizeMode='contain' style={{width:"100%",height:'100%',marginBottom:-450}} source={require('../asset/nolist.png')}/>
        } else {
          return  <List
          style={styles.container}
          data={received}
          renderItem={ReceivedItem}
        />
        }
       }
      })()}






    </View>
  )
}

const styles = StyleSheet.create({
  top:{
    backgroundColor:"#000",
    height:100,
    // justifyContent:"space-evenly",
    alignItems:"center",
    flexDirection:"row",



  },
  text:{
    color:"#FFF",
    fontSize:18,
    paddingLeft:width/4
  },
  container:{
    height:"100%",
    // backgroundColor:"red"
  }
})