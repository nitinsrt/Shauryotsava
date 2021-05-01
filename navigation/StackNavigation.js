import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createDrawerNavigator,DrawerItems} from "react-navigation-drawer"
import React from 'react';
import {Ionicons} from '@expo/vector-icons'

import MainScreen from '../Screens/Mainscreen';
import Events from '../Screens/Events';
import EventDetails from '../Screens/EventDetails';
import InformalsScreen from '../Screens/InformalsScreen';
import InformalDetails from '../Screens/InformalDetails';
import RegistrationScreen from '../Screens/RegistrationScreen';
import StartupScreen from '../Screens/StartupScreen';
import RegisteredEvents from '../Screens/RegisteredEvents';
import AuthScreen from '../Screens/AuthScreen';
import GalleryScreen from '../Screens/GalleryScreen';
import { Platform,View,SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {useDispatch} from 'react-redux'
import { Button } from 'react-native-elements';
import * as Actions from '../Store/Actions/authActions';

const StackNavigation = createStackNavigator({
    Home : MainScreen,
   
},{
    defaultNavigationOptions:{
        headerStyle:{
        backgroundColor: '#20002c'
        },
        headerTintColor: 'white'
    }
});

const headerInformals = createStackNavigator({
    InformalEvents : InformalsScreen,
    Info : InformalDetails
},{
    defaultNavigationOptions:{
        headerStyle:{
        backgroundColor: '#20002c'
        },
        headerTintColor: 'white'
    }
    })

const headerEvent = createStackNavigator({
    Events: Events,
    Details : EventDetails,
    Registration : RegistrationScreen

},{
    defaultNavigationOptions:{
        headerStyle:{
        backgroundColor: '#20002c'
        },
        headerTintColor: 'white'
    }});

    const registered = createStackNavigator({
        RegisteredEvent: RegisteredEvents
    },{
        defaultNavigationOptions:{
            headerStyle:{
            backgroundColor: '#20002c'
            },
            headerTintColor: 'white'
        }
        })

    const EventsNavigation = Platform.OS === 'android'? createMaterialBottomTabNavigator({
        Formals : { 
            screen : headerEvent,
           navigationOptions: {
               tabBarIcon: tabInfo =>{
                   return <Ionicons name ="md-football" size = {30} color= {tabInfo.tintColor}/>
               }
           }},
        Informals: {
            screen : headerInformals,
           navigationOptions: {
               tabBarIcon : tabInfo =>{
                   return <Ionicons name = "md-calendar" size ={30} color = {tabInfo.tintColor}/>
               }
           }}
    },{
        activeColor: 'white',
        barStyle: {
            backgroundColor: 'black'
        }
    }
    ): createBottomTabNavigator({
         Formals : { 
             screen : headerEvent,
            navigationOptions: {
                tabBarIcon: tabInfo =>{
                    return <Ionicons name ="football-sharp" size = {30} color= {tabInfo.tintColor}/>
                }
            }},
         Informals: {
             screen : headerInformals,
            navigationOptions: {
                tabBarIcon : tabInfo =>{
                    return <Ionicons name = "calendar-sharp" size ={30} color = {tabInfo.tintColor}/>
                }
            }}
    },{
        tabBarOptions: {
            activeTintColor: 'white'
        }
    })

const GalleyHeader = createStackNavigator({
    pics: GalleryScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
        backgroundColor: '#20002c'
        },
        headerTintColor: 'white'
    }
    });

const menuTabNav = createDrawerNavigator({
    Home : 
    {screen: StackNavigation,
    navigationOptions: {
        drawerLabel: 'Home'
    }
},
   Events:{
       screen: EventsNavigation,
       navigationOptions:{
           drawerLabel: 'Events'
       }
},  RegisteredEvents : {
    screen: registered,
    navigationOptions: {
        drawerLabel: 'Registered Events'
    },
   
},  Gallery: {
    screen: GalleyHeader,
    navigationOptions:{
        drawerLabel: 'Gallery'
        }
}
},{
    contentOptions: {
        activeTintColor: 'purple'
    },
    contentComponent: props =>{
        const dispatch = useDispatch();
        return(
            <View style={{flex: 1,padding: 10}}>
                <SafeAreaView forceInset={{top: 'always',horizontal: 'never'}}>
                <DrawerItems {...props}/>
                <Button title="LOGOUT" type='solid' onPress={()=>{
                    dispatch(Actions.logout())
                    props.navigation.navigate('Auth')
                }} buttonStyle={{
                    backgroundColor: 'black'
                }} titleStyle={{color: 'white'}}/>
                </SafeAreaView>
            </View>
        )
    }
});

const auth = createStackNavigator({
    authen: AuthScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
        backgroundColor: '#20002c'
        },
        headerTintColor: 'white'
    }
    })

const authenNav = createSwitchNavigator({
       startup: StartupScreen,
       Auth: auth,
       mainNav: menuTabNav
})


export default createAppContainer(authenNav);