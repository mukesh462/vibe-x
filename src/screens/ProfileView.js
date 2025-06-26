import { StyleSheet, View, Dimensions, ActivityIndicator, Alert, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  View as ViewB, Text as TextB, Button, Box,Avatar } from 'native-base';
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import Ant from "react-native-vector-icons/AntDesign";
import TextBox from './TextBox';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useToast } from "native-base";
import ProfileModel from './Models/ProfileModel';
import Connection from './Connection';

// import {  } from '@ui-kitten/components';
let { width, height } = Dimensions.get('screen');
const ProfileView = () => {
  const toast = useToast();
  const navigation = useNavigation()
  const [currentUser, setcurrentUser] = useState('')
const [pop, setpop] = useState(false)

  useEffect(() => {
    database().ref('users/' + auth().currentUser.uid).on('value', snap => {
      setcurrentUser(snap.val())
      setname(snap.val().userName)
      setmail(snap.val().email)
      setabout(snap.val().about)

      // console.log('ergr',snap.val())
    })



  }, [])
const setPRO =(data)=>{
database().ref('users/'+ currentUser.uid).update({profile:data})
}
 
const Onsub =()=>{
const spl_s =5.1;
const err =1.5;

const userName = name.trim();
const userAbout = about.trim()
if (userName.length !=0 && userAbout.length !=0) {
  database().ref('users/'+ currentUser.uid).update({userName:userName,about:userAbout})

  setedit(false)

  if (!toast.isActive(spl_s)) {
    toast.show({
      render: () => {
        return <Box bg={"yellow.400"} px="2" py="1" rounded="sm" mb={5}>
       Uploaded Successfully
        </Box>;
      },
      placement: "top"
    })
  }

 
}else{
  if (!toast.isActive(err)) {

    toast.show({
    render: () => {
      return <Box bg={"red.400"} px="2" py="1" rounded="sm" mb={5}>
       Field cant be Empty 
      </Box>;
    },      
    placement: "top"
  })
  }

}


  
}


  const selectPhotoTapped = async() => {
   
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
   
  const Imp = await launchImageLibrary(options).then(res=>{
const name = res.assets[0].fileName;
const type = res.assets[0].type;
const uri = res.assets[0].uri;

setloader(true)

 const pf = {
  name,type,uri
 }
//  console.log('cd',pf)
    const data = new FormData()
    data.append('file', pf)
    data.append('upload_preset', 'vibex462')
    data.append("cloud_name", "de6tgyiqd")
    data.append("api_key", "526834184112617")

    fetch("https://api.cloudinary.com/v1_1/vibex462/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log('spd',data)
        setloader(false)
        setPRO(data.secure_url)
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })
  })
  
  }







  const [name, setname] = useState()
  const [about, setabout] = useState()
  const [mail, setmail] = useState()
  const [edit, setedit] = useState(false)
  const [loader, setloader] = useState(false)

const ViewersPro =()=>{
 setpop(true)
}
const Style ={
  left:loader == true? width /35+25:width /35+30,
  top:loader == true? height / 38*-7: height / 38*-6,
alignSelf:"center",
  padding: 5,
  backgroundColor: '#3c9dea',
  borderRadius:100,
  width:width /40 *3.6,
}

  return (
    <View style={styles.fullPage}>
      <Connection/>
      <ProfileModel action={pop} remove={setpop} img={currentUser.profile != '' ? { uri: currentUser.profile } : require('../asset/no_profile.jpg')}/>
      <ViewB style={styles.header} >
        <Ionicon name="arrow-back-outline" style={{ paddingLeft: 20 }} color={"#fff"} size={30} onPress={() => navigation.goBack()} />
        <TextB style={styles.top} bold color={"#FFF"}>My Profile</TextB>
      </ViewB>
      
      <ViewB style={styles.main}>
      <ViewB alignSelf={"center"} >
        <Pressable onPress={ViewersPro}>
            <Avatar
        size='2xl'
        
          style={styles.proImg}
          source={currentUser.profile != '' ? { uri: currentUser.profile } : require('../asset/no_profile.jpg')}
        >
          {currentUser.userName}
        </Avatar>
        </Pressable>
      
     {loader == true?
     <ActivityIndicator size={'large'} style={styles.load} color={'#3c9dea'}/>: null
    }  
          <Ionicon onPress={selectPhotoTapped}  name='camera-outline' style={Style} size={25} color={'#fff'} />
      
        
      </ViewB> 
        
        <ViewB style={styles.toper} >
          <TextBox Holder={Ionicon} icon={"ios-person-circle-outline"} setValue={name} only={edit} place={'Enter Your UserName'} value={setname} bottom={10} ></TextBox>
          <TextBox Holder={Ant} icon={"infocirlceo"}setValue={about} place={'Enter your About'} value={setabout} only={edit} bottom={10}></TextBox>
          <TextBox Holder={MaterialIcon} icon={"email"} setValue={mail} bottom={10} only={false} ></TextBox>
        </ViewB>
        {
          edit == false ?


            <Button
              onPress={() => setedit(true)}
              style={{

                justifyContent: "center",
                paddingHorizontal: 10,
                marginHorizontal: 35,
                backgroundColor: '#000',
                borderRadius: 25,
                height: 50,
                alignItems: "center",
                // marginTop: 50
              }}>

              Edit


            </Button>
            :
<>


            <Button
              onPress={Onsub}
              style={{

                justifyContent: "center",
                paddingHorizontal: 10,
                marginHorizontal: 35,
                backgroundColor: '#3c9dea',
                borderRadius: 25,
                height: 50,
                alignItems: "center",
                // marginTop: 50
              }}>

              Submit


            </Button>
            <Button
              onPress={() => setedit(false)}
              style={{

                justifyContent: "center",
                alignSelf:"center",
                paddingHorizontal: 5,
                marginHorizontal: 35,
                backgroundColor: '#000',
                borderRadius: 25,
                height: 50,
                alignItems: "center",
                marginTop: 13,
                width:width /3
              }}>

              Cancel


            </Button>
</>


        }


      </ViewB>
    </View>

  )
}

export default ProfileView

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: "#000"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: height /50 *3,
    justifyContent: "space-between",


  }, main: {
    top:height /6,
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,


  },
  proImg: {
        top: height /-10,
          // left:width % 2 *-20,
          alignSelf:"center"
        //  height:110,
        //  width:110,
          
   
    
  },
  top: {
    fontSize: 20,
    paddingRight: 150,
    fontWeight: "600"
  },
  
  load:{
    position:'relative',
    top:height /40 *-8,
    left:width %2 +2,
    zIndex:5
  },
  toper:{
    top:-height/10.5
  }
})