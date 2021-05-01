import React,{useState, useCallback} from 'react';
import {View,StyleSheet,Text,TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import { Madoka} from 'react-native-textinput-effects';
import {Button} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import * as Actions from '../Store/Actions/EventsAction';

const MemberComponent = props =>{
    return(
        <View style= {styles.name}>
            <TouchableOpacity onPress = {props.onDelete.bind(this, props.id)}>
            <Text style = {styles.text}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const RegistrationScreen = props =>{
    
    const evId = props.navigation.getParam('eventId');
    const eventSlice = useSelector(state => state.events.formalEvents.find(prod=>prod.id===evId));
    
    const [isLoading,setisLoading] = useState(false);
    const [enteredName,setenteredName] = useState('');
    const [teamMembers,setteamMembers] = useState([]);
    const [captain,setcaptain] = useState('');
    const [viceCaptain,setviceCaptain] = useState('');
    const [phoneNo,setphoneNo] = useState('');
    const [totalMembers,settotalMembers] = useState('');
  

    const dispatch = useDispatch();
    

    const submitHandler = useCallback( async ()=>{
        if(teamMembers.length ===0||phoneNo.length===0||captain.length===0||viceCaptain.length===0)
        {
            Alert.alert('Form field empty','Please check if any form field is empty',[
                {text:'Okay', style: 'cancel' }
            ])
            return ;
        }else{
            setisLoading(true);
        await dispatch(Actions.registerEvents(

            captain,
            viceCaptain,
            teamMembers,
            phoneNo,
            totalMembers,
            eventSlice.title,

        ))
         }
         setisLoading(false);
        props.navigation.goBack();
    },[dispatch,captain,viceCaptain,teamMembers,eventSlice,phoneNo,totalMembers]
    );

   

    const inputNameHandler = enteredText => {
        setenteredName(enteredText.replace(/^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/g,''));
    }

    const teamMembersHandler = ()=>{ 
        if(enteredName.length == 0){
            Alert.alert('Please add a name','Team members field cannot be empty',[
                {text: 'Okay',style: 'cancel'}
            ])
            return;
        }
        if(teamMembers.length>eventSlice.size){
            Alert.alert('Maximium limit reached','No more members allowed',[{
                text: 'Okay', style:'cancel'
            }])
            setenteredName('')
            return;
        }
        setteamMembers(name => [...name,{id: Math.random().toString(),value: enteredName}]);
        setenteredName('');
    
    }

    const removeTeamMember = (memberId) =>{
        setteamMembers(name =>{ return name.filter(member=>member.id!==memberId)});
    }

    if(isLoading){
       return <View style= {styles.centered}>
            <ActivityIndicator size='large' color='black' />
        </View>
    }
  
   
    return (

        <LinearGradient colors = {['#FFEFBA','#FFFFFF']} style = {
            { position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
         }
         }>
            
             <ScrollView>
        <View style= {styles.screen}>
        <View style = {styles.inputContainer}>
            <Madoka label ={'Captain Name'}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText = {text=>setcaptain(text.replace(/^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/g,''))}
            value= {captain}/>
        </View>
        <View style = {styles.inputContainer}>
            <Madoka label ={'Registered Phone Number '}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText = {text=>setphoneNo(text.replace(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,''))}
            value= {phoneNo}
            keyboardType = 'number-pad' />
        </View>
        <View style = {styles.inputContainer}>
            <Madoka label ={'Vice-Captain'}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText= {text=>setviceCaptain(text.replace(/^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/g,''))}
            value = {viceCaptain}/>
        </View>
        <View style = {styles.inputContainer}>
             
            <Madoka label ={'Team Members'}
                 inputPadding= {16}
                 labelHeight= {20}
                 labelStyle= {{color: 'black',}}
                 borderColor = {'black'}
                 onChangeText= {inputNameHandler}
                 value= {enteredName}/>
                 <Button type='clear' title='Add members' onPress={teamMembersHandler}/>
        <FlatList data={teamMembers} renderItem = {itemData=><MemberComponent id={itemData.item.id}
        onDelete = {removeTeamMember} name ={itemData.item.value}/>}/>
        </View>
        <View style = {styles.inputContainer}>
            <Madoka label ={'Total Team Members'}
            inputPadding= {16}
            labelHeight= {20}
            labelStyle= {{color: 'black',}}
            borderColor = {'black'}
            onChangeText = {text=>settotalMembers(text.replace(/^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/g,''))}
            value= {totalMembers}
            keyboardType = 'number-pad' />
        </View>
        <Button type="solid" title='Submit' onPress= {submitHandler}
          />
        </View>
        </ScrollView>
  

        </LinearGradient>
       
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen : {
      marginHorizontal: 30,
      marginVertical: 20
    },
    inputContainer: {
        marginVertical: 10
    },
    name:{
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'black',
        padding: 5
    },
    text: {
        fontSize: 20,
        fontFamily: 'Open-Sans',
        color: 'black'
    },
    screen2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2:{
        fontSize: 20,
        fontFamily: 'Open-Sans-Bold'
    }
})

export default RegistrationScreen;