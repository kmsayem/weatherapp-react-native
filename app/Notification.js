import React, {Component} from 'react'
import PushNotification from "react-native-push-notification";

class Notification extends  Component{

    componentDidMount(){
        PushNotification.configure({
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
            },
        });
    }

    render(){
        return null;
    }
}

export default Notification;