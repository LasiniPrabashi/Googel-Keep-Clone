import { Ionicons, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from "expo-router";


const Tab = createBottomTabNavigator();

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                color: 'grey',
            },
            tabBarStyle: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                position: 'absolute',
                height: 70,
                borderTopWidth: 0,
                elevation: 10,
                paddingRight: 10,
            },
        }}>

            <Tabs.Screen name="Home"
                         options={{
                             tabBarIcon: ({focused}) => (
                                 <Ionicons name="home-outline" size={25} color={focused ? 'red' : 'grey'}  />
                             ),
                         }}/>

            <Tabs.Screen name="explore" options={{
                tabBarIcon: ({focused }) => (
                    <Ionicons name="search"  size={25} color={focused ? 'red' : 'grey'} />
                ),
            }} />

            <Tabs.Screen name="Profile" options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="person-outline" size={25} color={focused ? 'red' : 'grey'} />
                ),
            }} />

        </Tabs>

    );
}
