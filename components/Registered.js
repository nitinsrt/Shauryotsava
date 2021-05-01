import React from 'react';
import {View,Text,StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Registered = props=>{

    
    return (
           <View>
               <View style= {styles.conatiner}>
                   <Text style = {styles.titleText}>
                       {props.title}
                   </Text>
                    <Text style = {styles.text}>Total Team Members : {props.teamMembers}</Text>
                    <View style = {styles.margin}>
                        <View style = {styles.flex}>
                    <Button title= "Delete " type = 'solid' onPress={props.onSelect} buttonStyle = {{
            backgroundColor: 'black'
        }} titleStyle = {{color: 'white'}}/>
        </View>
        </View>
               </View>
              
           </View>
    );
}

const styles = StyleSheet.create({
 
  conatiner: {
      padding: SCREEN_WIDTH/70,
      marginVertical: SCREEN_HEIGHT/60,
      backgroundColor: 'white',
      elevation: 5,
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 2,
      width: SCREEN_WIDTH*0.8,
      height: SCREEN_HEIGHT/6,
      alignItems: 'center'
  },
  titleText: {
      fontFamily: 'Open-Sans-Bold',
      fontSize: 20,
      marginVertical: 5
  },
  text: {
      fontSize: 15,
      fontFamily: 'Open-Sans',
      marginVertical: 5
  },
  margin : {
      marginVertical: 5
  },
  flex : {
     flex: 1
  }
});

export default Registered;
