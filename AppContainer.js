import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AddCard from './components/AddCard';
import Home from './components/Home';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { purple, white, pink, orange } from './utils/colors';
import { Ionicons } from '@expo/vector-icons';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
          title: 'Decks'
        }
    },
   Deck: {
       screen: Deck,
       navigationOptions: {
           headerTintColor: white,
          headerStyle: {
              backgroundColor: orange
          }
        }
   },
   AddCard: {
       screen: AddCard,
       navigationOptions: {
        title: 'Add new card',
        headerTintColor: white,
       headerStyle: {
           backgroundColor: orange
       }
       }
   },
   Quiz: {
       screen: Quiz,
       navigationOptions: {
           headerTintColor: white,
       headerStyle: {
           backgroundColor: orange
       }
       }
   }
});

const AddDeckStack = createStackNavigator({
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
          title: 'Add Deck',
        }
      }
})

/*
const LiveStack = createStackNavigator({
    Live: {
        screen: Live,
        navigationOptions: {
            title: 'Live'
        }
    }
})
*/

const AppNavigator = createBottomTabNavigator({
  Decks: HomeStack,
  AddDeck: AddDeckStack,
  //Live: LiveStack,
  }, { 
        initialRouteName: 'Decks',
       defaultNavigationOptions: ({ navigation }) => ({
         tabBarIcon: ({ tintColor }) => {
           const { routeName } = navigation.state;
     
           let iconName;
           if (routeName === 'Decks' ) {
             iconName = `${Platform.OS === 'ios' ? 'ios-home' : 'md-home'}`;
           } else if (routeName === 'AddDeck') {
             iconName = `${Platform.OS === 'ios' ? 'add-circle' : 'md-add-circle'}`;
           } 
           /*else if (routeName === 'Live') {
             iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-locate`;
           }*/
     
           
            return <Ionicons name={iconName} size={30} color={tintColor} />;
         },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? orange : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : orange,
        shadowColor: 'rgba(0, 0 , 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowradius: 6,
        shadowOpacity: 1
      } 
    }
    })
})

export default createAppContainer(AppNavigator);