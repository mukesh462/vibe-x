import { AlertDialog, Box, Button, Center, CloseIcon, HStack, IconButton, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from "moment";
import { useToast } from "native-base";
import { Alert, Text } from "react-native";
import { sendPushNotification } from "./PushNotification";


const ReqestModel = ({ action, trigger, data, clear }) => {
  const [disable, setdisable] = useState(false)
  const [userRequest, setuserRequest] = useState([])
  const [current, setcurrent] = useState()

  const uniqueId = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4()



    );
  };
  const toast = useToast();
  useEffect(() => {

    database().ref('userRequest/' + auth().currentUser.uid).on('value', snapshot => {
      if (snapshot.toJSON() !== null) {
        setuserRequest(Object.values(snapshot.toJSON()))
        console.log(snapshot.val())

      }


    })
database().ref('users/'+auth().currentUser.uid).on('value',sna=>{
setcurrent(sna.val())
})

  }, [])

  const sendRq = async () => {
    const url = current.profile !='' ? current.profile:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    setdisable(true)
    const existed = userRequest.find(item => item.requester_id == data.uid)
    if (existed !== undefined) {
      database()
      .ref('allRequest/' + existed.parent_key)
      .update({
        request_status: 0,
      })
      database()
        .ref('userRequest/' + auth().currentUser.uid + '/' + existed.id)
        .update({
          request_status: 0,
        }).then((res) => {
          sendPushNotification(data.token,'New User request',+' ' +current.userName,url)
          setdisable(false)
          toast.show({
            render: () => {
              return <Box bg={"green.400"} px="2" py="1" rounded="sm" mb={5}>
                Request Send Successfully
              </Box>;
            },
            placement: "top"
          })
          trigger(false),
            clear('')
        }).catch((error) => {
          setdisable(false)
          toast.show({
            render: () => {
              return <Box bg={"red.400"} px="2" py="1" rounded="sm" mb={5}>
                Something Went Wrong
              </Box>;
            },
            placement: "top"
          })
          trigger(false),
            clear('')
        })
        

    } else {
      const newReference = database().ref('userRequest/' + auth().currentUser.uid).push();
      const allReq = database().ref('allRequest').push();
await allReq.set({
  senderId: auth().currentUser.uid,
        request_status: 0,
        created_at: moment().format(),
        requester_id: data.uid,
        id: allReq.key,
        parent_key: newReference.key,
        chatRoom:""
        
})
      await newReference.set({
        senderId: auth().currentUser.uid,
        request_status: 0,
        created_at: moment().format(),
        requester_id: data.uid,
        id: newReference.key,
        parent_key: allReq.key,
        chatRoom:""
      }).then((res) => {
sendPushNotification(data.token,'Follow Request',current.userName +' ' +'Send Follow Request',url)

        setdisable(false)
        toast.show({
          render: () => {
            return <Box bg={"green.400"} px="2" py="1" rounded="sm" mb={5}>
              Request Send Successfully
            </Box>;
          },
          placement: "top"
        })
        trigger(false),
          clear('')
      }).catch((error) => {
        setdisable(false)
        toast.show({
          render: () => {
            return <Box bg={"red.400"} px="2" py="1" rounded="sm" mb={5}>
              Something Went Wrong
            </Box>;
          },
          placement: "top"
        })
        trigger(false),
          clear('')
      })
    }



    

  }
// console.log('data',data)
  const cancelRef = React.useRef(null);
  return <Center>
    <AlertDialog isOpen={action} >
      <AlertDialog.Content>
        <AlertDialog.CloseButton onPress={() => trigger(false)} />
        <AlertDialog.Header>Send Chat Request</AlertDialog.Header>
        <AlertDialog.Body>
          Are your Sure make request to {data.userName}
        </AlertDialog.Body>
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

export default ReqestModel