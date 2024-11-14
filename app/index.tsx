import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LodingPage from '@/components/pages/lodingPage/LodingPage';
import LoginScreen from "@/components/pages/loginScreen/LoginScreen";
import Home from "@/app/pages/Home";

import * as Notifications from 'expo-notifications';
import NotificationHandler from "@/components/notification/NotificationHandler";

import {AudioProvider} from './context/Provider'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


const stack = createNativeStackNavigator()


export default function index() {
    return (
        <NavigationContainer independent={true}>
            <AudioProvider>
            <stack.Navigator initialRouteName="Loding-Page">
                <stack.Screen name='Loding-page' component={LodingPage}   options={{
                    headerShown: false,
                }}/>
                <stack.Screen name='Login-Page' component={LoginScreen} options={{
                    headerShown: false,
                }}/>
                <stack.Screen name='home' component={Home} options={{
                    headerShown: false,
                }}/>
            </stack.Navigator>
            </AudioProvider>

        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
    },

})



