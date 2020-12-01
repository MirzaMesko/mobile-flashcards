import React from 'react';
import  Constants  from 'expo-constants';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AppContainer from './AppContainer';
import { orange } from './utils/colors';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import {  setLocalNotification, clearLocalNotification } from './utils/api';

function FlashcardsStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
        <FlashcardsStatusBar  backgroundColor={orange} barStyle='light-content'/>
        <AppContainer />
      </View>
      </Provider>
      
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
