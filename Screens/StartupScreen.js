import React ,{useEffect}from 'react';
import {View,Text,ActivityIndicator,StyleSheet, AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../Store/Actions/authActions';


const StartupScreen = props =>{
    const dispatch = useDispatch();
 useEffect(()=>{
     const tryLogin = async () =>{
         const userData = await AsyncStorage.getItem('userData');
         if(!userData){
             props.navigation.navigate('Auth');
             return ;
         }
         const transformedData = JSON.parse(userData);
          const {token,userId,expiryTime} = transformedData;
          const expiryDate = new Date(expiryTime)
          if(expiryDate <= new Date() || !token || !userId){
            props.navigation.navigate('Auth');
            return ;
          }
         props.navigation.navigate('mainNav');
         dispatch(
             AuthActions.authenticate(token,userId)
         )
     }
     tryLogin();
 },[dispatch])
 return (
     <View style={styles.indicator}>
         <ActivityIndicator size='large' color= 'black' />
     </View>

 )
};

const styles = StyleSheet.create({
  indicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default StartupScreen;