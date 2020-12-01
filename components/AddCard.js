import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { submitNewCard, fetchDecks } from '../utils/api';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import { getDecks } from '../actions';

class AddCard extends React.Component {
    state = {
        question: '',
        answer: '',
    }
    addCard = () => {
        const  question = this.state.question;
        const  answer = this.state.answer;
        if (question === '' || answer === '') {
            return
        }
        if (answer !== 'Correct' && answer !== 'Incorrect') {
            alert('The only acceptable answers are Correct or Incorrect !')
        }
        const { title } = this.props.navigation.state.params;
        
        submitNewCard(title, question, answer)
        .then(() => fetchDecks())
        .then((results) => this.props.dispatch(getDecks(results)))
        .then(() => this.props.navigation.goBack())
       
        
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput defaultValue={this.state.question}
                        placeholder='Enter question'
                        onChangeText={(text) => this.setState({ question: text })}
                        style={styles.input} />
                    <TextInput defaultValue={this.state.answer}
                        placeholder='Enter correct answer'
                        onChangeText={(text) => this.setState({ answer: text })}
                        style={styles.input} />
                </View>
                <TextButton onPress={() => this.addCard()}>SUBMIT</TextButton>
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
    input: {
        minWidth: 350,
        height: 50,
        borderWidth: 2,
        padding: 10,
        margin: 15,
    },
});

export default connect()(AddCard);