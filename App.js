import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux';

import EventReducer from './Store/Reducers/EventReducer';
import StackNavigation from './navigation/StackNavigation';
import ReduxThunk from 'redux-thunk';
import authReducer from './Store/Reducers/authReducer';

export default function App() {

  const rootReducer = combineReducers({
    events : EventReducer,
    auth: authReducer
  });

  const Store = createStore(rootReducer,applyMiddleware(ReduxThunk));
 
const [isReady, setisReady] = useState(false)

const fetchFonts = () => {
  return Font.loadAsync({
    'AlexBrush': require("./fonts/AlexBrush-Regular.ttf"),
     'Arizonia': require("./fonts/Arizonia-Regular.ttf"),
     'Wacamoler': require('./fonts/WacamolerCapsFFP.ttf'),
     'Open-Sans': require('./fonts/OpenSans-Regular.ttf'),
     'Open-Sans-Bold': require('./fonts/OpenSans-Bold.ttf'),
     'Samantha': require('./fonts/Samantha.ttf') ,
     'StrickenBrush': require('./fonts/StrickenBrush.ttf') ,
   });
 };

 if (!isReady) {
  return(
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setisReady(true)}
      onError={(err) => console.log(err)}
    />
  );
}

  return (
    <Provider store = {Store}>
      <StackNavigation/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
