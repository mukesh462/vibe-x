/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotificationService from './src/screens/NotificationService';


  messaging().setBackgroundMessageHandler(async remoteMessage => {
    NotificationService.onDisplayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.data,
        remoteMessage.data.largeIcon
    )
    console.log('dfwdfefwefs',remoteMessage.data)
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

AppRegistry.registerComponent(appName, () => App);
