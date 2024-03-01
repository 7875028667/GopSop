import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import { LogLevel, OneSignal } from 'react-native-onesignal';


const Home = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const webviewRef = useRef(null);


    const requestPermissions = async () => {
        try {
            const locationPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            const cameraPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            const storagePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            // const notificationPermission = await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            // );

            if (
                locationPermission === PermissionsAndroid.RESULTS.GRANTED &&
                cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
                storagePermission === PermissionsAndroid.RESULTS.GRANTED 
            ) {
                console.log('All permissions granted');
                setPermissionsGranted(true);
            } else {
                console.log('Some permissions denied');
                setPermissionsGranted(false);
            }

        } catch (error) {
            console.log('Error requesting permissions:', error);
        }
    };

    useEffect(() => {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        // OneSignal Initialization
        OneSignal.initialize("32640119-37e1-43f0-8668-937283835d0c");

        // requestPermission will show the native iOS or Android notification permission prompt.
        // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
        OneSignal.Notifications.requestPermission(true);;''

        // Method for listening for notification clicks
        OneSignal.Notifications.addEventListener('click', (event) => {
            console.log('OneSignal: notification clicked:', event);
        });

        requestPermissions();
    }, []);

    // useEffect(() => {
    //     if (permissionsGranted) {
    //         registerPushNotifications();
    //     }
    // }, [permissionsGranted]);

    // function getTokenRegistrationJSChannel(token, deviceId, deviceName) {
    //     const payload = {
    //         deviceId,
    //         deviceToken: token,
    //         appVersion: 1,
    //         deviceName,
    //         mobileClientType: 'ANDROID',
    //     }
    //     const stringifiedPayload = JSON.stringify(payload);
    //     return `(function() { 
    //       window.sprChat('registerDevice', ${stringifiedPayload}); 
    //     })();`;
    // }

    // function registerPushNotifications() {
    //     webviewRef.current?.injectJavaScript(getTokenRegistrationJSChannel('1234', '123', 'android_device'));
    // }



    // function handleNotification(notification) {
    //     const stringifiedPayload = JSON.stringify(notification);
    //     const sdkFunction = `(function() { 
    //       window.sprChat('onNotification',${stringifiedPayload}); 
    //     })();`
    //     webviewRef.current?.injectJavaScript(sdkFunction);
    // }


    return (
        <WebView
            ref={webviewRef}
            source={{ uri: 'https://gopsop.com' }}
            javaScriptEnabled

        />
    );
};

export default Home;
