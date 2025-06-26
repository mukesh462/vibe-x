import { AlertDialog, Box, Button, Center, CloseIcon, HStack, IconButton, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from "moment";
import { useToast } from "native-base";
import { Alert, Text } from "react-native";
import { sendPushNotification } from "./PushNotification";


const AcceptModel = ({ action, trigger, type ,userData,clear,token}) => {
  const [disable, setdisable] = useState(false)
  const [userRequest, setuserRequest] = useState([])
const [current, setcurrent] = useState('')
  const toast = useToast();
  

useEffect(() => {
 
  database().ref('users/'+ userData.requester_id).on('value',snap=>{
    if(snap.val()!=null){
      setcurrent(snap.val())
   
    }
      })


}, [])


  console.log('income',current)
  const url = current.profile !='' ? current.profile:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  const sendRq = async () => {
    setdisable(true)

if(type == 1){

  let chatId = database().ref('chatRooms').push();

  await chatId.set(chatId.key).then((res)=>{
     database().ref('userRequest/'+ userData.senderId +'/'+ userData.parent_key  ).update({
      request_status:1,
      chatRoom:chatId.key
     })
     database().ref('allRequest/'+userData.id ).update({
      request_status:1,
      chatRoom:chatId.key
     })
     let rooms =  database().ref('users/'+userData.senderId+'/chatRooms' ).push()
     var reqRoom = database().ref('users/'+userData.requester_id+'/chatRooms' ).push()
    rooms.set({
      id:rooms.key,
      chatRoom:chatId.key,
      person:userData.requester_id,
      lastmsg:'',
      lastmsgTime:'',
      viewCount:'',
      op_id:reqRoom.key,
      cur_id:rooms.key,
      type:0
    })
    reqRoom.set({
      id:rooms.key,
      chatRoom:chatId.key,
      person:userData.senderId,
      lastmsg:'',
      lastmsgTime:'',
      viewCount:'',
      op_id:rooms.key,
      cur_id:reqRoom.key,
      type:0
    })
      toast.show({
        render: () => {
          return <Box bg={"green.400"} px="2" py="1" rounded="sm" mb={5}>
            Request Accepted Successfully
          </Box>;
        },
        placement: "top"
      })
      sendPushNotification(token,'Follow request',current.userName + ' '+'Accept Your follow Request',url)

  }).catch(error =>{
    toast.show({
      render: () => {
        return <Box bg={"red.400"} px="2" py="1" rounded="sm" mb={5}>
          Something Went Wrong
        </Box>;
      },
      placement: "top"
    })
  })

  trigger(false)
  clear('')
  setdisable(false)

}else{
  database().ref('userRequest/'+ auth().currentUser.uid+'/'+ userData.parent_key ).update({
    request_status:2,
    
   })
   database().ref('allRequest/'+userData.id ).update({
    request_status:2,
  
   }).then(res=>{
    sendPushNotification(token,'Follow request',current.userName + 'Reject Your follow Request',url)
     toast.show({
    render: () => {
      return <Box bg={"green.400"} px="2" py="1" rounded="sm" mb={5}>
        Request Rejected Successfully
      </Box>;
    },
    placement: "top"
  })
   }).catch(er=>{
    
    toast.show({
      render: () => {
        return <Box bg={"red.400"} px="2" py="1" rounded="sm" mb={5}>
          Something Went Wrong
        </Box>;
      },
      placement: "top"
    })


   })
   trigger(false)
  clear('')
  setdisable(false)

}

    

  }

  const cancelRef = React.useRef(null);
  return <Center>
    <AlertDialog isOpen={action} >
      <AlertDialog.Content>
        <AlertDialog.CloseButton onPress={() => trigger(false)} />
        <AlertDialog.Header> Chat Request</AlertDialog.Header>
{ type ==1?
  <AlertDialog.Body>
          Are your Sure accepted request
        </AlertDialog.Body>:<AlertDialog.Body>
          Are your Sure cancel request
        </AlertDialog.Body>
}
      
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={() => trigger(false)}  >
              Cancel
            </Button>
            <Button disabled={disable} colorScheme="success" onPress={sendRq} >
              Send
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  </Center>;
};

export default AcceptModel