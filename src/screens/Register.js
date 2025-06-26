import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, View as ViewB, Text as TextB, Divider, ScrollView, Button, Icon,KeyboardAvoidingView,Toast, useToast, IconButton, CloseIcon, Alert, HStack, VStack, Center, Box, Stack } from 'native-base';
import Ionicon from "react-native-vector-icons/Ionicons"
import Ant from "react-native-vector-icons/AntDesign";
import TextBox from './TextBox';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { Spinner } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {
    const toast = useToast()
    const [Loading, setLoading] = useState(false)
    const [mail, setemail] = useState('')
    const [name, setname] = useState('')

    const [pass, setpass] = useState('')
useEffect(() => {

// console.log(auth().currentUser)

}, [])
const errorToast =(type)=>{
   return (    
   
   <Alert w="100%" status="warning">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
               {type} 
              </Text>
            </HStack>
            <IconButton onPress={()=> toast.closeAll()} variant="unstyled" _focus={{
          borderWidth: 0
        }} icon={<CloseIcon size="3"  />} _icon={{
          color: "coolGray.600"
        }} />
          </HStack>
        </VStack>
      </Alert>

)
}


    const navigation = useNavigation()
    const Onsub = ()=>{
        console.log(mail,pass)
        if(mail.length==0){
            
            toast.show({
              render:()=>errorToast('Email is Required'),
              placement:"top-right"
                
            })
        }else if( pass.length ==0){
           
             
            toast.show({
                render:()=>errorToast("Password is Required"),
                placement:"top-right"
                  
              })
        }else if(name.length==0){
              
            toast.show({
                render:()=>errorToast('User Name is Required'),
                placement:"top-right"
                  
              })
        }else{
            setLoading(true)
                    auth()
              .createUserWithEmailAndPassword(mail.trim(), pass.trim())
              .then((res) => {
                console.log('User account created & signed in!');
               navigation.navigate('Home')

                setLoading(false)

               
            database().ref('/users/'+ res.user.uid).set({
                userName: name,
                uid:res.user.uid,
                profile:"",
                email:res.user.email,
                chatRooms:"",
                liveStatus:1,
                about:"",
                token:''
            }).then((data)=>{
                // alert('userCreated with value')
            })
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.show({
                        render:()=>errorToast('That email address is already in use!'),
                        placement:"top-right"
                          
                      })

                  setLoading(false)
                }else if (error.code === 'auth/invalid-email') {
               
                  toast.show({
                    render:()=>errorToast('That email address is invalid!'),
                    placement:"top-right"
                      
                  })
                }
                toast.show({
                    render:()=>errorToast(error.code),
                    placement:"top-right"
                      
                  })
                
                setLoading(false)
                console.error(error);
              });
        }
    
        
        
    }
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@userAuth', jsonValue)
        } catch (e) {
          // saving error
        }
      }
    return (
        <View style={styles.full}>
            <View style={styles.header}>
                <Ionicon name="arrow-back-outline" color={"#fff"} size={30} style={{ width: "100%", margin: 10, padding: 10 }} onPress={() => navigation.goBack()} />
                <ViewB padding={5}>
                    <Text style={styles.TopText}>Register</Text>
                    <TextB color={"gray.100"}> Create your Vibe Account</TextB>
                </ViewB>

            </View>
            <ScrollView background={"#fff"}>
                <View style={styles.mainView}>
                    <View style={styles.field}>
                        <ViewB >
                            <TextB paddingLeft={10} paddingBottom={2} fontSize={20}>
                                Name
                            </TextB>
                            <TextBox Holder={Ionicon} place={"Enter your Username"} value={setname}  icon={"ios-person-circle-outline"} bottom={10} ></TextBox>
                        </ViewB>
                        <ViewB >
                            <TextB paddingLeft={10}  paddingBottom={2} fontSize={20}>
                                Email
                            </TextB>
                            <TextBox Holder={MaterialIcon} place={'Enter your Email'} value={setemail} icon={"email"} bottom={10} ></TextBox>
                        </ViewB>
                        <ViewB >
                            <TextB paddingLeft={10} paddingBottom={2} fontSize={20}>
                                Password
                            </TextB>
                            <TextBox Holder={Ionicon} value={setpass} place={'Enter your Password'} pass icon={"lock-closed-outline"} bottom={10} ></TextBox>
                        </ViewB>
                    </View>
                    <TouchableOpacity>
                        <ViewB >

                            { Loading ==false ? <Button style={{

                                justifyContent: "center",
                                paddingHorizontal: 10,
                                marginHorizontal: 35,
                                backgroundColor: '#3c9dea',
                                borderRadius: 25,
                                height: 50,
                                alignItems: "center",
                                marginTop: 15
                            }}
                                onPress={Onsub}
                                rightIcon={<Ant name='login' style={{ paddingLeft: 10 }} size={20} color={'#fff'} />}

                            > Sumbit
                            </Button> : <Pressable  style={{justifyContent:"center" ,alignItems:"center", marginTop:25}}>
<Spinner  size='large' status='warning' />
                            </Pressable>  
                          }
                        




                        </ViewB>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <ViewB background={"#fff"}>
                <Divider marginTop={10} />
                <ViewB flexDirection={"row"} marginTop={5} marginBottom={5} alignItems={"center"} justifyContent={"center"}>
                    <TextB bold fontSize={18} > Already you have Account ?</TextB>
                    <TextB style={styles.loginbtn} onPress={() => navigation.navigate('Login')} > Login In</TextB>
                </ViewB>

            </ViewB>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: "#000"
    },
    header: {

    },
    TopText: {
        fontSize: 25,
        fontWeight: "800",
        color: "#fff",
        marginBottom: 5
    },
    mainView: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1,
        padding: 5,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

    },
    field: {
        marginTop: 50
    },
    loginbtn: {
        color: "#3c9dea",
        fontSize: 18,
        fontWeight: "400"

    }
})