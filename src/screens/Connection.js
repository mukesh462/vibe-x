import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Modal, Flex } from 'native-base'
import NetInfo from "@react-native-community/netinfo"


const Connection = () => {
    const [Info, setInfo] = useState(false)

    useEffect(() => {
        const unSubscripe = NetInfo.addEventListener(state => {
            console.log("isconnected", state.isConnected)
            console.log("type  ", state.type)
            setInfo(!state.isConnected)
        })
        return () => (
            unSubscripe()
        )
    }, [])

    return (
        <>
            {
                Info &&
                <Modal
                    height="100%"
                    backgroundColor="transparent"
                    isOpen={Info}
                    padding={8}
                >
                    <Flex
                        height="15%"
                        backgroundColor={"#fff"}
                        width="100%"
                        borderRadius={10}
                        alignItems="center"
                    >
                        <View style={{ justifyContent: 'center', alignSelf: 'center', height: '100%', width: '80%' }}>
                            <Text style={{ color: '#111', fontSize: 17, textAlign: 'center' }}> No Internet Connection ! </Text>
                        </View>
                    </Flex>
                </Modal>
            }
        </>

    )
}

export default Connection