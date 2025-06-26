import {  StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Center, HamburgerIcon, Pressable, VStack ,Text as TextB,Image, Avatar } from "native-base";
import Ionicon from "react-native-vector-icons/Ionicons";
import Ant from "react-native-vector-icons/AntDesign";

import { Menu } from 'native-base';
import { useNavigation } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
export default function Header() {

const [user, setUsers] = useState('')
useEffect(() => {
  
database().ref('users/'+ auth().currentUser.uid).on('value',snap=>{
  setUsers(snap.val())
  console.log(snap.val())
})
}, [])

  const navigation = useNavigation()
  const logout=()=>{
    navigation.navigate('Login');
    auth().signOut().then(() => console.log('User signed out!'));

  }


  return (
    <View backgroundColor="#000" style={styles.mainBar}>
      <View style={styles.appBar}>
<View style={{justifyContent:"center",alignItems:"center"}} >
  <Pressable onPress={()=> navigation.navigate('Profile')}>
    <Avatar  size="md" source={user.profile !=''? {uri:user.profile}: require('../asset/no_profile.jpg')}>

{/* <Avatar.Badge bg={"green.400"}></Avatar.Badge> */}

</Avatar>
  </Pressable>

  {/* <TextB color={'#fff'}>{user.userName}</TextB> */}
       

</View>

<TextB bold={true} fontSize={25} color={"#FFf"}>VibeX</TextB>
        <View style={styles.appIcon}>
          <Ionicon onPress={()=>navigation.navigate('Search')}
            name="search-outline"
            size={30}
            style={styles.appSearch}
            color="#fff"
          ></Ionicon>
           <Box  alignItems="center">
      <Menu w="190"  trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Ionicon
            name="menu-outline"
            size={30}
            style={styles.appSearch}
            color="#fff"
          ></Ionicon>
            </Pressable>;
    }}>
        <Menu.Item onPress={()=> navigation.navigate("Profile")}>
              
         
            <Ionicon
            name="ios-person-circle-outline"
            size={25}
            // style={styles.appSearch}
            color="#000"
          ></Ionicon>
    <TextB color={"#000"}>My Profile</TextB>
       
            
          
        
        </Menu.Item>
        <Menu.Item onPress={()=> navigation.navigate("UserRequest")}>
              
         
              <Ionicon
              name="ios-flash-outline"
              size={25}
              // style={styles.appSearch}
              color="#000"
            ></Ionicon>
      <TextB color={"#000"}>Connect Request</TextB>
         
              
            
          
          </Menu.Item>
        <Menu.Item onPress={logout}>
              
         
              <Ant
              name="logout"
              size={25}
              // style={styles.appSearch}
              color="#000"
            ></Ant>
      <TextB color={"#000"}>Logout</TextB>
         
              
            
          
          </Menu.Item>
      </Menu>
    </Box>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding:25,
    
  },
  appIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  appSearch: {
    padding: 5,
  },
  mainBar:{
    height:130,
   
  
 

  }
});
