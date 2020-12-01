import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import TextButton from './TextButton';
import { orange, gray } from '../utils/colors';
import {  setLocalNotification, clearLocalNotification } from '../utils/api';

class Quiz extends React.Component {
    state = {
        counter: 0,
        correctAnswers: 0,
        showAnswer: false,
        opacity: new Animated.Value(0),
    }
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `${title} quiz`
        }
    }
    componentDidMount() {
        Animated.timing(this.state.opacity,{ toValue: 1, duration: 1000, useNativeDriver: true}).start();

        clearLocalNotification()
        .then(setLocalNotification())
    }
    evaluateAnswer = (correct) => {
        
        if (correct) {
            this.setState({ correctAnswers: this.state.correctAnswers + 1 })
        }
        setTimeout(() => {
            this.setState({ counter: this.state.counter + 1, showAnswer: false })
        }, 500)
        
        Animated.sequence([ 
            Animated.timing(this.state.opacity,{ toValue: 0, duration: 500, useNativeDriver: true}),
        Animated.timing(this.state.opacity,{ toValue: 1, duration: 1000, useNativeDriver: true}),
        ]).start();
        
    }
    render() {
        const { data } = this.props.navigation.state.params
        const { counter, correctAnswers, showAnswer } = this.state
        const score = correctAnswers / counter
        if (data.length === 0) {
            return (
            <View style={styles.container}>
                <Text style={{ fontSize: 35, marginTop: 20, textAlign: "center", color: orange}}>You can't do this quiz. Please add some questions first.</Text>
                <TextButton onPress={() => this.props.navigation.goBack()}>Back to Deck</TextButton>
                </View>
            )
        }
        if (counter === data.length) {
            return (
                <View style={styles.container}>
                    <View style={styles.deck}>
                        <Animated.Text style={{ color: gray, opacity: this.state.opacity}}>Your score: </Animated.Text>
                        <Animated.Text style={[styles.score, {opacity: this.state.opacity}]}>{(score * 100).toFixed(0)} %</Animated.Text>
                    </View>
                    <View>
                        <TextButton onPress={() => this.setState({ counter: 0, correctAnswers: 0, opacity: new Animated.Value(1) })}>Restart Quiz</TextButton>
                        <TextButton onPress={() => this.props.navigation.goBack()}>Back to Deck</TextButton>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={{ color: gray}}>Question {counter + 1} / {data.length}</Text>
                <View style={styles.deck}>
                <Animated.Text style={{ fontSize: 45, marginBottom: 40, textAlign: "center", opacity: this.state.opacity}}>{data[counter].question}</Animated.Text>
                { showAnswer 
                ? <Text style={{ fontSize: 35, marginTop: 20, textAlign: "center", color: orange}}>{data[counter].answer}</Text>
                : <TouchableOpacity onPress={() => this.setState({ showAnswer: true})}><Text style={{ color: gray}}>Show answer</Text></TouchableOpacity>}
                </View>
                
                <View>
                    <TextButton onPress={() => this.evaluateAnswer(data[counter].answer === 'Correct')}>Correct</TextButton>
                    <TextButton onPress={() => this.evaluateAnswer(data[counter].answer === 'Incorrect')}>Incorrect</TextButton>
                </View>

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
    },
    score: {
        fontSize: 95, 
        color: orange,
        padding: 35,
        borderColor: orange,
        borderRadius: 185,
        marginTop: 35,
    },

});

export default Quiz;
