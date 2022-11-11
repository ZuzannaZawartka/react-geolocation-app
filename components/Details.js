import React, { Component, useState } from 'react';

import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Screen2 = (props) => {

    const _onPressButton = () => {
        alert("kolor : " + props.color +
            "tekst :" + props.text)
    }





    return (


        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: props.color }}>
            <FlatList
                data={
                    [
                        { key: 'a' },
                        { key: 'b' },
                        { key: 'c' },
                    ]
                }

                renderItem={({ item }) => <Text>{item.key}</Text>}

            />
            <Button
                title="go to screen1"
                onPress={() => props.navigation.navigate("s1", { a: 1, b: 2 })}
            />

        </View>
    );
}


const styles = StyleSheet.create({
    text: { fontSize: 48, },

});

export default Screen2;