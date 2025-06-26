export const sendPushNotification = async (token,title,msg,url) => {
    const FIREBASE_API_KEY = "AAAAaSL6szo:APA91bEJa2emsZnB7s3apdaetOaPcm-Tpn1gql7_DzHOvk0eyvmLH8yLlYakXlCb5gMH453MNhQLJryjoZG4qQzzWqdlRO89bzEsAgDANaWu5azrBl-knWiMI1t0xIdi1YRbd6L5nOQJ"
    const message = {
      registration_ids: [
       token
      ],
      notification: {
        title: title,
        body: msg,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "high",
        content_available: true,
        
      },
      data: {
        largeIcon:url
      },
      
    }
  
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    })
  
    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    })
    response = await response.json()
    console.log(response)
  }