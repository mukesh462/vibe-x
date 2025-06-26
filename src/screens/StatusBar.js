import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import { HStack, Avatar } from "native-base";

export default function StatusBars({navigation}) {
  const sts = [
    { id: 1, text: "Man" },
    { id: 2, text: "Man" },
    { id: 3, text: "Man" },
    { id: 4, text: "Man" },
    { id: 5, text: "Man" },
    { id: 6, text: "Man" },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.stsRound}>
        <Avatar
          bg="green.500"
          size="lg"
          source={require("../asset/profile.jpg")}
        >
          <Avatar.Badge bg="green.400"></Avatar.Badge>
        
        </Avatar>
      </View>
    );
  };

  return (
    <View style={styles.stsMain}>
      <FlatList
        data={sts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stsMain: {
    backgroundColor: "#fff",
    // height: 100,
 
   padding:10,  
    marginTop:10,
    // borderColor:"#000",
    // borderWidth:1,
    borderTopLeftRadius:50,
    borderTopRightRadius:50
    
  },
  stsRound: {
    // borderColor: "#000",
    // borderWidth: 5,
    // borderRadius: 50,
    padding: 5,
  },
});
