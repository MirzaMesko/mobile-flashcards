import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { orange } from '../utils/colors';

export default function TextButton ({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress} style={ styles.container }>
            <Text style={[styles.reset, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: "center",
        color: orange,
        fontSize: 24,
    },
    container: {
        padding: 20, 
        borderColor: orange, 
        borderWidth: 2,
        borderRadius: 5,
        margin: 10,
        minWidth: 250,
    }
})
