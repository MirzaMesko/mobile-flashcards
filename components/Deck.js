import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import TextButton from './TextButton';
import { orange, gray } from '../utils/colors';
import { removeDeck } from '../utils/api';
import { removeDeckAction } from '../actions';
import { connect } from 'react-redux';

class Deck extends React.Component {
    state = {
        bounceValue: new Animated.Value(0.3),
        opacityValue: new Animated.Value(0.3),
    }
    static navigationOptions = ({navigation}) => {
        const { title } = navigation.state.params
        
        return {
            title: title
        }
    }

    componentDidMount() {
        Animated.timing(this.state.opacityValue,{ toValue: 1, duration: 1000, useNativeDriver: true}).start();
        Animated.sequence([
            Animated.timing(this.state.bounceValue, {duration: 1000, toValue: 1, useNativeDriver: true}),
            Animated.spring(this.state.bounceValue, { toValue: 1, friction: 1, useNativeDriver: true}), 
        ]).start()

    }
    shouldComponentUpdate() {
        if (!this.props.array ) {
            return false
        } else {
            return true
        }
        
    }
    deleteDeck = () => {
        const { title } = this.props.navigation.state.params
        

        removeDeck(title)
        .then(() => this.props.dispatch(removeDeckAction(title)))
        .then(() => this.props.navigation.navigate('Home'))
    }
    render () {
        const { title } = this.props.navigation.state.params
        const { array } = this.props;
        const { bounceValue } = this.state;
        
        if (!array) {
            return null
        }
        return (
            <View style={styles.container}>
                <View style={styles.deck}>
                <Text style={{ fontSize: 40 }}>{title}</Text>
                    <Text style={{ color: gray}}>{array.length} cards</Text>
                    
                </View>
                    <Animated.View style={[styles.buttons, { transform: [{ scale: bounceValue }], opacity: this.state.opacityValue} ]}>
                    <TextButton onPress={() => this.props.navigation.navigate('AddCard', {title: title})}>Add Card</TextButton>
                    <TextButton onPress={() => this.props.navigation.navigate('Quiz', {title: title, data: array})}>Start a Quiz</TextButton>
                    <TouchableOpacity onPress={() => this.deleteDeck()}>
                        <Text style={{ color: orange, fontSize: 15, marginTop: 20 }}>Delete Deck</Text>
                    </TouchableOpacity>
                    </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    deck: {
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

const mapStateToProps = (decks, {navigation}) => {
    const { title } = navigation.state.params
    const array = decks[title]
    return {
        array
    }
}

export default connect(mapStateToProps)(Deck);