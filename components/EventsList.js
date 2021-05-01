import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet,ScrollView,Dimensions} from 'react-native';
import {Image} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT =Dimensions.get('window').height;

const EventsList = props  => {
     return(
             <View style={styles.container}>
             <View style={styles.Lines}>
             <TouchableOpacity onPress={props.onSelect}>
                 <View style={styles.textAlign}>
             <View style ={styles.imageContainer}>
             <Image source={{uri : props.image}}
             style={styles.image}/>
             </View>
             <Text style={styles.text}>{props.title}</Text>
             </View>
             </TouchableOpacity>

             
             </View>
            
             </View>
     )
};

export default EventsList;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20
      },
   imageContainer :{
   overflow: 'hidden',
   width: SCREEN_WIDTH/4,
   height: SCREEN_WIDTH/4,
    backgroundColor: '#000',
    borderRadius: SCREEN_WIDTH/4,
    padding: '15%',
    marginHorizontal: SCREEN_WIDTH/40
},
image :{
    width : '100%',
    height: '100%',
},
text:{
       color: 'white',
       alignItems: 'center',
       justifyContent:'center',
       color:'#000'

},
Lines:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '5%'
},
textAlign: {
    alignItems: 'center',
},

})