import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import {Overlay} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Intro=props =>{
    return(
        <Overlay windowBackgroundColor='rgba(0,0,0,0.9)'
        overlayBackgroundColor='#fbedea'
        isVisible={props.button}
        animationType='slide'>
    <View style={styles.screen}>
        <Text style={styles.heading}>
            Introduction 
        </Text>
        <Text style={styles.text}>
            SHAURYOTSAVA is a 35 years old legacy that we started in 
            1985 with the vision to make it the biggest sports festival
            of India. The journey towards excellence gets closer to 
            the goal this year as we have colaborated with Sports 
            Authority of India to find hidden athletic talents in colleges.
            So roll your sleeves up and 'Refuse to Loose'.
        </Text>
        
        <TouchableOpacity
         style={{marginTop:'15%', alignItems:'center'}} 
         onPress={props.Back}>
            <Icon 
                name='times'
                size={35}
                color='black'/>
        </TouchableOpacity>
    </View>
    </Overlay>
    )
};

export default Intro;


const styles= StyleSheet.create({
    screen : {
        flex:1,
        borderRadius: 20,
        opacity: 1,
        justifyContent: 'center',
    },
    text:{
    color: 'black',
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop:'2%',
    marginBottom: '5%',
    fontFamily: 'Open-Sans',
    paddingHorizontal: '5%'
    },
    heading :{
        color: 'black',
        fontSize: 35,
        backgroundColor: 'transparent',
        padding: '5%',
        fontFamily: 'Wacamoler'
    },
    buttonContainer : {
        alignItems: 'center',
        marginTop: '5%'
    }
})