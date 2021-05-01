import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_WIDTH = SCREEN_WIDTH*0.7;

const GalleryScreen = props => {
     const galleryData = useSelector(state=> state.events.Gallery)
    
     const renderGalleryHandler = ({item})=>{
         return (<View style={styles.slider}>
              <View style={styles.imageContainer}>
              <Image source={{uri: item.image}} style={styles.image}/>
              </View>
              <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              </View>
          </View>)
     }

    return (
        <LinearGradient colors = {['#EB5757','#000000']} style = {
            { position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
         }
         }>
        <Carousel data={galleryData} renderItem={renderGalleryHandler}
        sliderWidth={SCREEN_WIDTH} layout="default" itemWidth={CAROUSEL_WIDTH}
        autoplay = {true}
        enableMomentum ={false}
        autoplayDelay={2000}
        autoplayInterval={5000}/>

         </LinearGradient>
    );
}

GalleryScreen.navigationOptions = navData=> {
    return {headerTitle: 'Gallery',
    headerLeft :()=>
            <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                <Item iconName = "md-menu" title ='menuBar'
                onPress = {()=>{
                    navData.navigation.toggleDrawer()
                }}
                    />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    slider: {
        
        borderRadius: 4,
        marginVertical: 40
       
    },
    imageContainer: {
      
        height: '70%'
    },
    image: {
       width: '100%',
       height: '100%'
    },
    titleContainer:{
        backgroundColor: 'rgba(189, 209, 235, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%'
    },
    titleText: {
        fontSize: 30,
        fontFamily: 'Wacamoler'
    }
});

export default GalleryScreen;