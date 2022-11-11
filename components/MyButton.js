import React, { Component, useState } from 'react';

import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ButtonNew = (props) => {


    let width;

    if (!props.width) {
        width;
    } else {
        width = props.width;
    }

    return (
        //<View></View>

        <TouchableOpacity
            style={{
                backgroundColor: "#b5b5b5",
                borderRadius: 15,
                fontSize: 48, width: 150,
                margin: 5
            }}
            onPress={props.function}
        >
            <Text style={{ textAlign: "center", color: 'white', padding: 10 }}>{props.text}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {

        borderRadius: 15,
        fontSize: 48,

    },

});

export default ButtonNew;