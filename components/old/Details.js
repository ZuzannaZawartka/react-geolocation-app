import React, { Component, useState } from 'react';

import { View, Button, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Screen2 = (props) => {

    const _onPressButton = () => {
        alert("kolor : " + props.color +
            "tekst :" + props.text)
    }


    let x = props.route.params.data
    console.log(x.toLocaleString())
    console.log(new Date().toLocaleString())
    return (


        <View style={{ alignItems: "center", flex: 1, backgroundColor: props.color }}>
            <Image

                source={{
                    uri: 'https://www.w3schools.com/howto/img_avatar2.png',
                }}
                style={{ height: 200, width: 200, resizeMode: "center", margin: 20 }}
            />
            <Text>login:</Text>
            <Text style={styles.style1}>{props.route.params.login}</Text>
            <Text>password:</Text>
            <Text style={styles.style1}>{props.route.params.password}</Text>
            <Text >registered:</Text>
            <Text style={styles.style1}>{(props.route.params.data)}</Text>


        </View>
    );
}


const styles = StyleSheet.create({
    style1: { fontSize: 25, color: "green", margin: 15 },

});

export default Screen2;