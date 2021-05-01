import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image, Dimensions, Platform} from 'react-native';

SCREEN_WIDTH = Dimensions.get('window').width;
SCREEN_HEIGHT = Dimensions.get("window").height;

const Informals = props =>{
    return (
          <View style={styles.screen}>
              <TouchableOpacity onPress = {props.onSelect}>
              <View style = {styles.card}>
              <View style= {styles.image}>
                  <Image source = {{uri: props.image}} style = {{width:'100%', height: '100%'}}/>
                  </View>
                  <View style= {styles.textView}>
                  <Text style= {styles.text}>{props.title}</Text>
                  </View>
                  
                  </View>
                  </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    screen : {
      alignItems: 'center',
    },
image : {
    height: SCREEN_HEIGHT/4,
    width: '100%',
      
},
card : {
    margin: SCREEN_WIDTH/60,
    borderRadius: 10,
    elevation: 5,
    width : SCREEN_WIDTH*0.8,
    overflow: 'hidden',
    height: SCREEN_HEIGHT/3
},
textView :{
    backgroundColor: 'white',
    alignItems: 'center',
    height: SCREEN_HEIGHT/3-SCREEN_HEIGHT/4,
    paddingVertical: 3 
},
text: {
    fontSize : SCREEN_HEIGHT>750? 25: 20,
    fontFamily: 'Open-Sans-Bold',
    color: 'black'

}

});

export default Informals ;