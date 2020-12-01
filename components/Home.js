import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../utils/api';
import { connect } from 'react-redux';
import { getDecks } from '../actions';
import { gray } from '../utils/colors';

class Home extends React.Component {
    state = {
        decks: '',
    }
    componentDidMount () {
        const { dispatch } = this.props;

        fetchDecks()
        .then((results) => dispatch(getDecks(results)))
    }
    render() {
        const { decks } = this.props;
        return (
            <View style={styles.container}>
                
                    {Object.keys(decks).map((deck) => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {title: deck, array: decks[deck]} )}
                                style={styles.deck}
                                key={deck}>
                                        <Text style={{ fontSize: 40 }}>{deck}</Text>
                               <Text style={{ color: gray}}> {decks[deck].length} cards</Text>
                                   </TouchableOpacity>
                               )
                    }) }
                    
                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deck: {
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Home);