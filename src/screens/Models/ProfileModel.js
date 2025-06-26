import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, Image } from "react-native";
  let { width, height } = Dimensions.get('screen');
  import im from '../././../asset/profile.jpg'
const ProfileModel = ({action,remove,img}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
  
      <Modal
    
        animationType="fade"
        transparent={true}
        visible={action}
        style={styles.mos}
        
        
      >
<Pressable style={{flex:1,width:'100%',backgroundColor:' rgba(0,0,0, 0.7)'}}  onPress={()=>remove(false)}>
     <Image style={styles.imp} resizeMode={'cover'} blurRadius={1} source={img}/>
</Pressable>


       
      </Modal>
     

  );
};
export default ProfileModel
const styles = StyleSheet.create({
mos:{ position:"relative",
backgroundColor: 'rgba(0,0,0,0.4)',
justifyContent: 'center',
alignSelf: 'center',


},imp:{
  width:'100%',
  height:height/2,
  alignSelf:'center',
  top:height/4,
  margin:2
}

});