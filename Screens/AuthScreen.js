import React,{useState,useEffect,useCallback}from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,ScrollView,Dimensions,Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Madoka} from 'react-native-textinput-effects';
import { Button,Image } from 'react-native-elements';
import {useDispatch} from 'react-redux';
import * as Action from '../Store/Actions/authActions';
import { ActivityIndicator } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AuthScreen = props=>{
    const [Error,setError] = useState();
    const [isLoading,setisLoading] = useState(false)
    const [isSignup,setisSignup] = useState(false);
    const [email,setemail]= useState();
    const [password,setpassword] = useState();
    const [confirmPass,setconfirmPass] = useState();
    const [collegeName,setcollegeName] =useState()

    const dispatch = useDispatch();

    const authenHandler= async ()=>{
       
        if(isSignup){
            if(password!=confirmPass){
                Alert.alert("Couldn't sign up","Confirm password is not same as the password",[{
                    text: 'Okay'
                }])
                return
            }
            setError(null)
            setisLoading(true)
            try{
            await dispatch(Action.signUp(email,password,confirmPass,collegeName))
            props.navigation.navigate('mainNav')
            }catch(err){
                 setError(err.message)
                 setisLoading(false);
            }
            
            
        }else {
            setError(null)
            setisLoading(true);
            try{
            await dispatch(Action.login(email,password))
            props.navigation.navigate('mainNav')
            }catch(err){
                setError(err.message)
            setisLoading(false)
            }
        }
    }
    
    useEffect(()=>{
        if(Error){
            Alert.alert('An Error occured!!', Error,[{
                text: 'Okay'
            }])
        }
    })
    

    return(
        <LinearGradient colors = {['#1a2a6c','#b21f1f','#fdbb2d']} style = {
            { position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
         }
         }>
        <View style={styles.screen}>
            <ScrollView>
             <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.container}>
            
                 <View style={{alignItems: 'center'}}>
                 <View style={styles.imageContainer}>
             <Image source ={require('../images/holo.png')}
      style={styles.image}/>
      </View>
      </View>
     
            <View style={styles.input}>
            <Madoka label ={'Email-Address'}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText = {(text)=>{setemail(text)}}
            value= {email}
            keyboardType='email-address'
            autoCapitalize='none'/>
            </View>
             <View style={styles.input}>
             <Madoka label ={'Password'}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText = {(text)=>{setpassword(text)}}
            value= {password}
            secureTextEntry
            />
           </View>

           {isSignup &&  <View style={styles.input}>
             <Madoka label ={'Confirm Password'}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText = {(text)=>{setconfirmPass(text)}}
            value= {confirmPass}
            secureTextEntry
            />
             <Madoka label ={'College Name'}
           inputPadding= {16}
           labelHeight= {20}
           labelStyle= {{color: 'black',}}
           borderColor = {'black'}
           onChangeText = {(text)=>{setcollegeName(text)}}
           value= {collegeName}
           />
           </View>
           
           }
             <View style={styles.buttonContainer}>
                 {isLoading ? <ActivityIndicator size= 'small' color='black' />:
                <Button title={isSignup?'Sign Up':'Login'} type= 'solid' buttonStyle={{
                    backgroundColor: '#b21f1f'
                }} titleStyle={{color: 'white'}} 
                onPress={authenHandler}/>
            }
            </View>
            <View style={styles.buttonContainer}>
                <Button title={`Switch to ${isSignup?'Login':'Sign Up'}`} type='solid' buttonStyle={{
                    backgroundColor: '#b21f1f'
                }}
                titleStyle={{
                    color: "white"
                }} onPress={()=>{
                    setisSignup(prevState=>!prevState)
                }}/>
            </View>
              
             </KeyboardAvoidingView>
             </ScrollView>
        </View>
        </LinearGradient>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication'
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    container: {
        backgroundColor: '#D3CCE3',
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 1,
        elevation: 5,
        width: SCREEN_WIDTH*0.8,
        marginVertical: SCREEN_HEIGHT/8
    },
    imageContainer:{
        width: SCREEN_WIDTH/2,
        height:SCREEN_WIDTH/2,

    },
    image:{
        width: '100%',
        height: '100%'
    },
    input :{
        marginHorizontal: 10,
        paddingVertical: 3
        },
    buttonContainer: {
        padding: SCREEN_HEIGHT/60
    }
  
});

export default AuthScreen;