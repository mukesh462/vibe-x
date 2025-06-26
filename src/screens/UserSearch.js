import { StyleSheet, View, TextInput, Dimensions, Image, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicon from "react-native-vector-icons/Ionicons";
import { Text as TextB, View as ViewB, Button as Buttons,Avatar } from "native-base";
import { useNavigation } from '@react-navigation/native';
import {   Button, List, ListItem } from '@ui-kitten/components';
import database from '@react-native-firebase/database';

import ReqestModel from './Model';
import auth from '@react-native-firebase/auth';
let { width, height } = Dimensions.get('screen');
const UserSearch = () => {

  const [data, setdata] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [sendDetail, setsendDetail] = useState('');
  const [userRequest, setuserRequest] = useState([])





  let list = [];
  useEffect(() => {

    database().ref('/users').once('value').then(snapshot => {
      // console.log('User data ', snapshot.toJSON());
      setdata(Object.values(snapshot.val()))

    })
    // console.log('d',auth().currentUser.uid)
    database().ref('userRequest/' + auth().currentUser.uid).on('value', snapshot => {
      if (snapshot.toJSON() !== null) {
        // setuserRequest(Object.values(snapshot.toJSON()))
        // console.log('userS',Object.values(snapshot.toJSON()))

      }
    })
    database().ref('allRequest').on('value', snapshot => {
      if (snapshot.toJSON() !== null) {
        console.log('datas', Object.values(snapshot.val()))
        let off = []
        snapshot.forEach((list) => {
          if (list.val().senderId == auth().currentUser.uid || list.val().requester_id == auth().currentUser.uid) {
            off.push(list.val())
            // console.log('dsws',list.val())
          }

        }

        )
        console.log('only user', off)
        setuserRequest(off)


      }
    })
  }, [])


  // console.log('useLeak',userRequest)




  function existed(value) {
    var Msval;
    if (userRequest.length > 0) {
      Msval = userRequest.find(item => {
        return item.requester_id == value || item.senderId == value;
      })
      if (Msval !== undefined) {
        if (Msval.request_status == 0) {
          return false
        } else if (Msval.request_status == 1) {
          return 'yes'
        } else {
          return true
        }
      } else {
        return true;
      }

    } else {
      return true;
    }

  }

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.userName} `}
      description={`${item.about}`}
      accessoryLeft={()=>(
        <Image  style={{width:40,height:40,borderRadius:50}} source={item.profile !=''?{
          uri:item.profile
        }: require('../asset/no_profile.jpg')}></Image>
      )}
      accessoryRight={() => {
        return (<>
          {auth().currentUser.uid == item.uid ? '' :



            <Button size='tiny' onPress={() => {
              if (existed(item.uid) !== 'yes' && existed(item.uid) !== false) {
                setShowModal(true), setsendDetail(item)

              } else {
                alert('wait')
              }


            }} status={
              existed(item.uid) == true ? "success" : existed(item.uid) == 'yes' ? "info" : "warning"

            }> <TextB bold={true} color={"#525751"}>
                {
                  existed(item.uid) == true ? "Follow" : existed(item.uid) == 'yes' ? "Message" : "Pending"

                }

              </TextB></Button>
          }

          {showModal ? <ReqestModel trigger={setShowModal} data={sendDetail} clear={setsendDetail} action={showModal} /> : ""}
        </>
        )
      }}
    />
  );
  const [text, settext] = useState('')
  const navigation = useNavigation();
  return (
    <View>
      <ViewB style={styles.top} backgroundColor={"black"}>
        <ViewB flexDirection={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Ionicon
            name="arrow-back-outline"
            size={30}
            style={styles.appSearch}
            color="#fff"
            onPress={() => navigation.goBack()}
          ></Ionicon>
          <TextInput style={styles.inp} placeholder={"Enter your User Name"} placeholderTextColor={"#000"} onChangeText={(t) => settext(t)} autoFocus />
          <Ionicon
            name="search-outline"
            size={30}
            style={styles.appSearch}
            color="#fff"
          ></Ionicon>
        </ViewB>

      </ViewB>
      <ViewB padding={3} >
        {text.length > 0 ?

          data.length != 0 &&
          
          data.filter((name) => {
            return name.userName.toLowerCase().includes(text.toLowerCase()) && name.uid != auth().currentUser.uid
          }).length !=0
          
          ? <List
            style={styles.container}
            data={data.filter((name) => {
              return name.userName.toLowerCase().includes(text.toLowerCase()) && name.uid != auth().currentUser.uid
            })}
            renderItem={renderItem}
          /> : <TextB alignSelf={'center'} fontSize={22} color={"#000"}>{text} user Not Found</TextB> :


          <ViewB marginTop={12} height={height / 1.6} >
            <Image alt='img' resizeMode='contain' style={{ width: '100%', height: height / 1.6 }} source={require('../asset/user.png')} />

          </ViewB>

        }
      




      </ViewB>

    </View>

  )
}

export default UserSearch
const styles = StyleSheet.create({
  inp: {

    borderWidth: 1,
    minWidth: 250,
    borderRadius: 50,
    marginHorizontal: 10,
    borderColor: "#3c9dea",
    backgroundColor: "#dfdfdf",
    color: "#000"


  }, top: {
    height: 100,
    padding: 1

  }, modal: {

    flex: 1,
    justifyContent: "center",
    marginTop: 22,



  }, modelView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }

})