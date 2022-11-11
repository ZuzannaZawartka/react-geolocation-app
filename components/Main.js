import React, { Component, useState } from 'react';

import { View, Text, ActivityIndicator, KeyboardAvoidingView, TextInput, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import ButtonNew from "./MyButton"
import { ip, port } from './Settings';
import * as Font from "expo-font";
const Main = (props) => {


    const [login, setLogin] = useState('');
    const [fontloaded, setFont] = useState(false);
    const [password, setPassword] = useState('');


    const anyFunction = () => {
        console.log("SENDOWANIE")
        if (login.length > 0 && password.length > 0) {
            sendData()
        } else {
            alert("hasło lub login za krótki")
        }

    }

    const componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('./fonts/PoorStory-Regular.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
            'myfont2': require('./fonts/Montserrat-VariableFont_wght.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
            'myfont3': require('./fonts/Anton-Regular.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter

        });
        setFont(true)
    }

    componentDidMount()
    // console.log(fontloaded)
    return (

        <View style={{
            flex: 1, justifyContent: "center"
        }}>
            {
                fontloaded == false ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text onPress={() => props.navigation.navigate("List")} style={styles.text}>Geo App</Text>

                        <Text style={styles.text2}>find and save your position use google maps</Text>
                    </View>
            }
        </View >

    );
}







const styles = StyleSheet.create({
    text: {
        fontFamily: 'myfont3',
        fontSize: 100,
        textAlign: "center"
    },
    text2: {
        fontFamily: 'myfont2',
        fontSize: 30,
        textAlign: "center",
        padding: 5,
    },


});

export default Main;