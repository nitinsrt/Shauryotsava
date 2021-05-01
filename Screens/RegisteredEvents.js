import React from 'react';
import {StyleSheet,Text,View,FlatList} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector} from 'react-redux';
import Registered from '../components/Registered';
import {LinearGradient} from 'expo-linear-gradient';
import * as Actions from '../Store/Actions/EventsAction';
import  {useDispatch} from 'react-redux'


const RegisteredEvents = props=>{
   
    const regData = useSelector(state =>state.events.registrationData);
    const dispatch= useDispatch();
    

    if(regData == null){
        return <View style = {styles.screen}>
            <Text>No registered events !!</Text>
        </View>
    }
    
    return (
        <LinearGradient colors = {['#20002c','#cbb4d4']} style = {
        { position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
         }
         }>
        <View style = {styles.screen2}>
        <FlatList data = {regData} renderItem = {itemData => <Registered 
        title = {itemData.item.sport} teamMembers = {itemData.item.totalMembers}
        onSelect ={()=>{dispatch(Actions.deleteEvent(itemData.item.id))} }
        />}/>
        </View>
        </LinearGradient>
    )
}

RegisteredEvents.navigationOptions = navData =>{
    return {
        headerTitle : 'Registered Events',
        headerLeft: ()=><HeaderButtons HeaderButtonComponent = {HeaderButton}>
        <Item iconName = "ios-menu" iconSize = {23} onPress = {()=>{
            navData.navigation.toggleDrawer();
        }}/>
    </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    screen2: {
        flex: 1,
        alignItems: 'center'
    }
  
});

export default RegisteredEvents;