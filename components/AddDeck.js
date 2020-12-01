import React from 'react';
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native';
import TextButton from './TextButton';
import { submitNewDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions';


class AddDeck extends React.Component {
    state = {
        value: '',
        opacity: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, { toValue: 1, duration: 2000, useNativeDriver: true }).start();
    }

    submit = () => {
        const { dispatch, decks } = this.props;
        const value = this.state.value;

        if (value === '') {
            return
        }

        let existingDecks = [];
        Object.keys(decks).map((deck) => {
            existingDecks.push(deck)
        })

        let nameTaken = existingDecks.includes(value)
        console.log(existingDecks, nameTaken)

       if (nameTaken) {
           alert('There is already a deck with this name. Please choose another name.')
           return
       }

        submitNewDeck(value)
                    .then(() => dispatch(addDeck(value)))
                    .then(() => this.props.navigation.navigate('Deck', { title: value }))
                    .then(() => this.setState({ value: '' }))

    }

    render() {
        return (
            <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
                <Text style={{ fontSize: 25, textAlign: "center" }}>What is the title of your new deck?</Text>
                <TextInput defaultValue={this.state.value}
                    placeholder='Enter deck title'
                    onChangeText={(text) => this.setState({ value: text })}
                    style={styles.input} />
                <TextButton onPress={this.submit}>Create Deck</TextButton>
            </Animated.View>
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
    }
});

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck);