package com.example.roadsense.service

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class FirebaseMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        remoteMessage.notification?.let {
            // Handle push notification, e.g., show in UI or local notification
        }
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // Send token to server if needed
    }
}
