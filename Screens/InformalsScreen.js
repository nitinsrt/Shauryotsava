import React from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import {Image,Button} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import Informals from '../components/Informals';
import HeaderButton from '../components/HeaderButton';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

const InfromalsScreen = props =>{
    
    const InformalEvents = useSelector(state=>state.events.informalEvents);
    const renderItemHandler = itemData =>{
        return(
            <Informals image = {itemData.item.image} title = {itemData.item.title } onSelect = {()=>{
                props.navigation.navigate('Info',{
                    itemTitle : itemData.item.title,
                    itemId : itemData.item.id
                })
            }}/>
        )
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
        <View>
            <FlatList data = {InformalEvents} renderItem = {renderItemHandler}/>
        </View>
        </LinearGradient>
    );
};

InfromalsScreen.navigationOptions = navData =>{
  return { headerTitle : 'Informal Events',
     headerLeft : ()=><HeaderButtons HeaderButtonComponent = {HeaderButton}>
         <Item iconName = "ios-menu" iconSize = {23} onPress = {()=>{
             navData.navigation.toggleDrawer();
         }}/>
     </HeaderButtons>
}
}


export default InfromalsScreen;