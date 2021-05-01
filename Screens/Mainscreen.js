import React ,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions,ImageBackground,SafeAreaView,ScrollView,TouchableOpacity,ActivityIndicator} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import {Image,Button,Icon} from 'react-native-elements';
import HeaderButton from '../components/HeaderButton';
import * as Animatable from 'react-native-animatable';
import * as Actions from '../Store/Actions/EventsAction';
import {useDispatch} from 'react-redux';


import Intro from '../components/Intro';




const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_Image= require('../images/Background.jpg');

const Mainscreen = props => {
    
  const [introOverlay,setintroOverlay]= useState(false);
  const [isLoading,setisLoading] = useState(false);

const dispatch = useDispatch();

const loadingData = useCallback(async ()=>{
  await dispatch(Actions.fetchTeamData());
},[dispatch])

useEffect(()=>{
  setisLoading(true)
  loadingData().then(()=>{
    setisLoading(false)
  });
 
  },[loadingData]);

useEffect(()=>{
  const willFocusSub = props.navigation.addListener('WillFocus',loadingData)
  return ()=>{
    willFocusSub.remove();
  }
},[loadingData])

  const cancelButtonFunction = () => {
    setintroOverlay(false);
  };

  const eventsButtonHandler =()=>{
    return (
    props.navigation.navigate({routeName: 'events'})
    )
  }
    if(isLoading){
      return <View style= {styles.centered}>
        <ActivityIndicator size= 'large' color="black" />
      </View>
    }
  
  return(
    <ScrollView>
    <View style={styles.container}>
    <ImageBackground source={BG_Image}
    style={styles.mainText}>
    <SafeAreaView style={{flex:1, alignItems:'center'}}>
    <View style={styles.ImageContainer}>
    <Image source ={require('../images/holo.png')}
      style={styles.image}/>
    </View>
    <View style={styles.titleContainer}>
    <Text style={styles.Text}>
      SHAURYOTSAVA 
    </Text>
    </View>
    <View style={styles.subtitleContainer}>
    <Text style={styles.neecheText}>
      2K20
    </Text>
    <Text style={styles.neecheText}>
      Refuse to loose
    </Text>
    </View>
    <View style={styles.dateContainer}>
    <Text style={styles.dateText}>
      20th to 22nd March
    </Text>
    </View>
    <View style={styles.downArrowContainer}>
      <Animatable.View animation = 'bounce' easing = 'ease-in' iterationCount = 'infinite' >
        <TouchableOpacity onPress = {() =>{
          setintroOverlay(true)
        }}>
          <Icon name = 'angle-double-down' type = "font-awesome" size= {55} color= 'black' />
        </TouchableOpacity>
    
    </Animatable.View>
    </View>
    <Intro button={introOverlay} Back={cancelButtonFunction}
    onSelect = {eventsButtonHandler}/>
    </SafeAreaView>
    </ImageBackground>
    </View>
    </ScrollView>
  )
};

Mainscreen.navigationOptions = navData =>{
  return {
    headerLeft : () =>
      <HeaderButtons HeaderButtonComponent = {HeaderButton}>
      <Item iconName='md-menu' title= "MenuBar"
       onPress= {()=>{
        navData.navigation.toggleDrawer()}}/>
      </HeaderButtons>
    
  }
}

export default Mainscreen;

const styles= StyleSheet.create({
  centered : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   container: {
    flex: 1,
    alignItems: 'center'
  },
  ImageContainer:{
      alignItems: 'center', 
      marginTop: SCREEN_HEIGHT/50
    },
  titleContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT/100
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT/100
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: 20,
    height: '20%'
  },
  downArrowContainer: {
    alignItems: 'center', 
    marginBottom: SCREEN_HEIGHT/2
  },
    mainText:{
      width: SCREEN_WIDTH,
     height: SCREEN_HEIGHT
     
    },
    Text:{
      color: "#F5FFFA",
      fontSize: SCREEN_HEIGHT<700? 35:40,
      fontFamily: 'Open-Sans-Bold'  
    },
    neecheText:{
      color: "#F5FFFA",
      fontSize: SCREEN_HEIGHT<700? 40:50,
      fontWeight: '600',
      fontFamily: "Arizonia"
  },
  dateText: {
    color: "#000",
      fontSize: SCREEN_HEIGHT<700? 25:30,
      marginTop: SCREEN_HEIGHT/90,
      fontFamily: "Open-Sans-Bold"
  },
  image: {
    width: SCREEN_WIDTH/2, 
    height: SCREEN_WIDTH/2
  }
  });