import React from 'react';
import {StyleSheet,View,Text, Image,Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector} from "react-redux"

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const InformalDetails = props =>{
    const eventId = props.navigation.getParam('itemId')
    const eventData = useSelector(state =>state.events.informalEvents.find(prod => prod.id===eventId))
    return (
        <LinearGradient colors = {['#ffd452','#544a7d']} style = {
            { position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
         }
         }>
        <View style = {styles.screen}>
            <View style = {styles.imageView}>
                <Image source = {{uri :eventData.image}} style= {{width: '100%', height: '100%'}}/>
            </View>
            <View style = {styles.titleContainer}>
            <Text style = {styles.title}>{eventData.title}</Text>
            </View>
            <View style= {styles.textView}>
        <Text style= {styles.text}>Venue : {eventData.Venue}</Text>
        <Text style= {styles.text}>Timings: {eventData.Time}</Text>
        </View>
        </View>
        </LinearGradient>
    )
};

InformalDetails.navigationOptions = navData =>{
    return {
        headerTitle: navData.navigation.getParam('itemTitle')
    }
}

const styles = StyleSheet.create({
  screen : {
      flex: 1,
      alignItems: 'center'
  },
  imageView: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT*0.40
    },
titleContainer : {
    marginVertical: SCREEN_HEIGHT/60,
    alignItems: 'center'
},
title : {
    fontSize: SCREEN_HEIGHT >750 ? 30: 25,
    fontFamily: 'Open-Sans-Bold',
    color: 'white'
},
text: {
    fontSize: SCREEN_HEIGHT> 750 ? 20: 15,
    fontFamily: 'Open-Sans',
    color: 'white',
    marginBottom: SCREEN_HEIGHT/65
},
  textView :{
      marginVertical: SCREEN_HEIGHT/60,
      alignItems: 'center'
  }
});

export default InformalDetails;