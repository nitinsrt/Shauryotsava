import React,{useEffect} from "react";
import {View, StyleSheet, Dimensions, SafeAreaView, 
FlatList} from 'react-native';
import { Image } from "react-native-elements";
import EventsList from '../components/EventsList';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../Store/Actions/EventsAction'
import { AppLoading } from "expo";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get ('window').height;

const Events = props => {
    const dispatch = useDispatch();
    useEffect(()=>{
    
        dispatch(Actions.fetchTeamData())
    },[dispatch])

    const allEvents = useSelector(state =>state.events.formalEvents);
   

    const renderEventList = itemData =>{
        return (
            <EventsList 
            image= {itemData.item.imageUrl}
            title= {itemData.item.title}
            onSelect = {
                ()=> props.navigation.navigate({routeName: 'Details', 
            params : {
                eventId: itemData.item.id,
                eventTitle : itemData.item.title
            }})
            }/>
        )
    }
  
    

    return (

        
    
    <View style={styles.container}> 
    
    <SafeAreaView style={{flex:1}}>  
    
    <View style={styles.TopContainer}>

    <Image source={require('../images/croped.jpg')}
        style ={styles.image}/>
    </View>
    
        <FlatList data= {allEvents}
        renderItem={renderEventList} 
        numColumns={3} />
        </SafeAreaView>  
    </View>


    
    )
};

Events.navigationOptions = navData =>{
    return {
        headerTitle : 'Formal Events',
        headerLeft :()=>
            <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                <Item iconName = "md-menu" title ='menuBar'
                onPress = {()=>{
                    navData.navigation.toggleDrawer()
                }}
                    />
            </HeaderButtons>
        
    }
}

export default Events;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
      },
    image : {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT/5,    
    },
    TopContainer: {
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 5,
        backgroundColor: "#000",
        width:SCREEN_WIDTH,
        height: '25%'
    },
    bottomMargin:{
        marginTop: SCREEN_HEIGHT/10
    }
}) 