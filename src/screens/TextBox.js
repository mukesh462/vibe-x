import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'



const TextBox = ({Holder,bottom,icon,value,pass,place,only = true,setValue }) => {
 
  return (
    
      
    <View
      style={{
        borderWidth: 2,
        paddingHorizontal: 10,
        marginHorizontal: 35,
        borderColor: '#3c9dea',
        borderRadius: 25,
        height: 50,
        marginBottom:bottom
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
          <Holder
            name={icon}
            size={25}
            color="#3c9dea"
          />
        <TextInput
          placeholder={place}
          placeholderTextColor={'#000'}
          style={{paddingHorizontal: 10, color: '#375963', flex: 1}}
          onChangeText={(Text)=> value ? value(Text): null}
         secureTextEntry={pass ? true :false}
         editable={only}
         defaultValue={setValue ? setValue:null}
         
        />
      </View>
      
    </View>

  )
}

export default TextBox