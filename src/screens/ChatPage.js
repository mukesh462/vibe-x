import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,Asy, Dimensions, Image, BackHandler } from 'react-native'
import React, { useState,useRef, useEffect } from 'react'
import { Avatar, Center, View as ViewB ,Text as TextB, ScrollView} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from "moment";
import MsgComponent from './MsgComponent';
import { sendPushNotification } from './PushNotification'
import Connection from './Connection';
import { useFocusEffect } from '@react-navigation/native';


export default function ChatPage({ navigation ,route }) {
  let {width,height} = Dimensions.get('screen');
  const { details, name } = route.params ;
  const [users, setusers] = useState('')
  const [currentUS, setcurrentUs] = useState('')


useEffect(() => {

  database().ref('users/'+ auth().currentUser.uid).on('value',snap=>{
    if(snap.val()!=null){
      setcurrentUs(snap.val())
      // console.log('d',snap.val())
    }
  })
  database().ref('users/'+ details.person).on('value',snap=>{
if(snap.val()!=null){
  setusers(snap.val())
  // console.log('d',snap.val())
}
  })

  database().ref('chatRooms/'+ details.chatRoom).on('value',snap=>{
if(snap.val() !=null){
  if(snap.val() !== details.chatRoom){
  

    // let valueFr = arraySort(Object.values(snap.val()),'date')
    // console.log('value',valueFr)
    setoldMsg(Object.values(snap.val()))
    // console.log('pathuko',masg)

  }
  
}else{
  console.log('no')
}

})
}, [])
const proV =()=>{
  isTyping(0)
}
useFocusEffect(() => {
  BackHandler.addEventListener("hardwareBackPress",proV );

  return () =>
    BackHandler.removeEventListener("hardwareBackPress", proV);
});

const [textData, settextData] = useState('')
  const res =useRef()
  const flatRef = useRef()
 
const [oldMsg, setoldMsg] = useState([])

const SentMsg =()=>{
  let keyMs = database().ref('chatRooms/'+ details.chatRoom).push()
  const incO = {
  user_id:currentUserId(),
  key:keyMs.key,
  message:textData,
  created_at:moment().format(),
  isView:0,
  date:moment().format('YYYY-MM-DD')

}
 
keyMs.set(incO);
database().ref('users/' +currentUserId() + '/chatRooms/' + details.cur_id  ).update({
  id:details.op_id,
  chatRoom:details.chatRoom,
  person:details.person,
  lastmsg:textData,
  lastmsgTime:moment().format(),
  viewCount:'',
  cur_id:details.cur_id,
  op_id:details.op_id
})

database().ref('users/' +details.person + '/chatRooms/' + details.op_id  ).update({
  id:details.op_id,
  chatRoom:details.chatRoom,
  person:currentUserId(),
  lastmsg:textData,
  lastmsgTime:moment().format(),
  viewCount:'',
  cur_id:details.op_id,
  op_id:details.cur_id
})
const url = currentUS.profile !='' ? currentUS.profile:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

if(users.liveStatus ==0){
 console.log('efuteff',url)
  sendPushNotification(users.token,currentUS.userName,textData,url)
}
res.current.clear()
settextData('')
}


 



const nowD = moment()
const diffChat =(date)=>{
var now = moment(new Date()); //todays date
var end = moment(date); // another date
var duration = moment.duration(now.diff(end));
var days = duration.asDays();
return days.toFixed()
// let previousI =
// if
// console.log('ed',days.toFixed())
}

function byDate(a, b) {
  //chronologically by year, month, then day
  // console.log(new Date(a.date).getHours())
  // return moment.utc(b.created_at) - diff(moment.utc(a.created_at))
  return moment.utc(b.created_at).diff(moment.utc(a.created_at))
//  return   new moment(b.created_at).format('YYYYMMDD')-new moment(a.created_at).format('YYYYMMDD')
  // return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf(); //timestamps
}

const currentUserId=()=>{
  return  auth().currentUser.uid
}
// console.log('dwf',oldMsg)
// console.log('sort',oldMsg.sort(byDate))

const isTyping =(value)=>{
  database().ref('users/' +details.person + '/chatRooms/' + details.op_id ).update({
    type:value
  })
}

  var user = 1;
  return (
    <ViewB style={styles.totalView}>
     
    
      <View style={styles.chat}>
        <Connection/>
        <ScrollView>

           { oldMsg.length == 0 ?
      
      <ViewB  marginTop={12} height={height / 1.6} >
        <Image alt='img' resizeMode='contain' style={{width:'100%',height:height / 1.6}} source={require('../asset/let.png')}/>
<TextB fontSize={'lg'} justifyContent="center" alignSelf={'center'} color={'#000'} position='relative' top={-35}>Let Start Chat &#x1F590;</TextB>
    </ViewB> :  <FlatList
          data={oldMsg.sort(byDate)}
          
     ref={flatRef}
     
          renderItem={({ item, index }) => {
            // console.log(index,item)
            // console.log('days',diffChat(item.created_at)) 
            var currentI = index;
            var previousI = index -1;
            // console.log(`${index}.${nowD.diff(item.created_at,'day')} `)
            return (
              <>
              { diffChat(item.created_at) >0 && diffChat(oldMsg[previousI].created_at) != diffChat(item.created_at) ?
                <ViewB alignSelf={'center'} background="#3c9dea" padding={1} borderRadius={10}>
                <TextB color={'#fff'}>{moment(moment(item.created_at).toDate()).calendar()}</TextB>
              </ViewB>:''
        }
              <MsgComponent item={item}/>
              
              </>
            

            )
          }}
          inverted
          keyExtractor={(item) => item.key}
          horizontal={false}
          showsVerticalScrollIndicator={true}


        />
    
    }
        </ScrollView>
     

      
<ViewB flexDirection={"row"} padding={5} alignItems={"center"} backgroundColor={"#fff"} >
  
  <TextInput
  style={styles.input}
  placeholder={"Type your Text Here "}
  placeholderTextColor={'#000'}
  multiline
  onEndEditing={()=>isTyping(0)}
  onFocus={()=>isTyping(1)}
  onChangeText={settextData}
  ref={res}
  ></TextInput>
  <TouchableOpacity onPress={ textData.length >0 ? SentMsg :null} activeOpacity={0.8}>
  <Feather name="send" style={styles.send} size={25}/>

  </TouchableOpacity>
</ViewB>
      </View>
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


    padding: 10
  },name:{
    fontWeight:"bold",
    color:"#fff",
    fontSize:15,
    marginBottom:5
    
  },
  mess:{

    color:"#000",
    fontWeight:"300",
    fontSize:18

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