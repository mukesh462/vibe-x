import notifee from '@notifee/react-native';


class NotificationService {

  static onDisplayNotification =async(title,body,data,img)=> {
    // Request permissions (required for iOS)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      
    });
  
    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();
  
    await notifee.displayNotification({
      title: title,
      body: body,
      data:data ? data:null,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        largeIcon:img
      },
    });
  }




}
export default NotificationService;