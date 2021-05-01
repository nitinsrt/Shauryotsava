import React from 'react';
import {View,Text,StyleSheet,Image, Dimensions, ActivityIndicator} from 'react-native';

import {Button} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector,useDispatch} from 'react-redux';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height; 


const EventDetails = props =>{
    
    const evntId = props.navigation.getParam('eventId');
    const selectedEvent = useSelector(state =>state.events.formalEvents.find(prod=>prod.id===evntId))
    const regArray = useSelector(state=>state.events.registrationData);
    const isthisSportRegistered = regArray.some(prod=>prod.sport === selectedEvent.title)
    
    
    

return (
    
    <LinearGradient colors = {['#ffd452','#544a7d']} style = {
       { position: 'absolute',
       left: 0,
       right: 0,
       top: 0,
       height: '100%'
    }
    }><View style= {styles.Screen} >
        <View style= {styles.imageContainer}>
       <Image source = {{uri: selectedEvent.imageUrl}} style= {{width : '100%', height: '100%'}} />
       </View>
       <View>
       <Text style= {styles.TextContainer}>{selectedEvent.title}</Text>
       <View>
       <Text style = {styles.evtext}>{selectedEvent.text}</Text>
       </View>
       <View style = {styles.buttonContainer}>
           <Button title= 'Download RuleBook' type = 'outline' buttonStyle = {{
               marginVertical: 5,
               borderColor: 'white',
               
           }} 
           titleStyle = {{
            color : 'white'
           }}/>

          {isthisSportRegistered && (<View style={styles.buttonContainer}>
              <Text style = {styles.success}>
                  Registration Successful !!
                  </Text>
                  <Text style = {styles.success}>
                      Click below to see registered events
                  </Text>
                     
           <Button title = 'Registered Events' type= 'outline' buttonStyle = {{
               borderColor: 'white',
           }}
           titleStyle = {{
               color : 'white'
           }} onPress = {()=>{
            props.navigation.navigate('RegisteredEvent')
           }}/>
                  </View>)}
            {!isthisSportRegistered &&
           (<Button title = 'Register' type= 'outline' buttonStyle = {{
               borderColor: 'white',
           }}
           titleStyle = {{
               color : 'white'
           }} onPress = {()=>{
            props.navigation.navigate('Registration', {
                eventTitle : selectedEvent.title,
                eventId: selectedEvent.id,
            } )
        }}/> )
           
        }
        
       </View>
       </View>
    </View>
    </LinearGradient>
    
    )
};

EventDetails.navigationOptions = (navigationData)=>{

    

    const selectedEvent =  navigationData.navigation.getParam('eventTitle');
    return {
        headerTitle : selectedEvent.title
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Screen :{
        flex : 1,
        alignItems: 'center',
        
    },
    imageContainer:{
        height: SCREEN_HEIGHT *0.36,
        width: SCREEN_WIDTH* 0.64,
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginVertical: 10
    },
    TextContainer: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: SCREEN_HEIGHT >750 ? 25: 20,
        textAlign: 'center',
        marginVertical: SCREEN_HEIGHT/60,
        color: 'white'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    topButton: {
        marginVertical: 10
    },
    evtext:{
        fontFamily: 'Open-Sans',
        fontSize: SCREEN_HEIGHT > 750 ? 15: 10,
        marginVertical: SCREEN_HEIGHT /40,
        marginHorizontal: 10,
        textAlign: 'center',
        color : 'white'
    },
    success: {
        textAlign: 'center',
        fontFamily: 'Open-Sans',
        fontSize: 15,
        color: 'black',
        marginVertical: 2
    }
});

export default EventDetails;
