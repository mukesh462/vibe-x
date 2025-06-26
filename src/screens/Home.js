import { View, Text , TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { Center, Container, Heading, StatusBar } from 'native-base'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from './Header';
import { Divider } from '@ui-kitten/components';
import StatusBars from './StatusBar';
import ChatList from './ChatList';
import { Layout, ViewPager } from '@ui-kitten/components';
export default function Home({navigation}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <View >
      
       <StatusBar
        animated={true}
        backgroundColor="#000"
       />
       
       <ViewPager
       
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Layout
        style={styles.tab}
        level='2'>
      <ChatList navigation={navigation}/>
      </Layout>
      {/* <Layout
        style={styles.tab}
        level='2'>
        <Text category='h5'>ORDERS</Text>
      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
        <Text category='h5'>TRANSACTIONS</Text>
      </Layout> */}
    </ViewPager>
    </View>
   
    
  )
}



const styles = StyleSheet.create({
  tab: {
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#000"
  },
});
