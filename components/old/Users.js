import React, { useEffect, Component, useState } from 'react';

import { View, Button, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';
import ButtonNew from "./MyButton"
import { ip, port } from './Settings';
const Screen2 = (props) => {

    const backToLogin = () => {
        props.navigation.navigate("Main")
    }

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch(ip + port + "/");
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);


    const del = async (id) => {

        fetch(ip + port + "/del", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        }).then(async (response) => {

            const json = await response.json();
            setData(json);
        })
            .catch((error) => {
                console.error(error);
            });;

        console.log("USUWANIE " + id)
    }

    return (


        <View style={{ flex: 1, padding: 24 }}>
            <ButtonNew function={() => props.navigation.navigate("Main")} text={"BACK TO LOGIN PAGE"}></ButtonNew>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <ListItem key={item.id} id={item.id} functionDel={() => del(item.id)} function={() => props.navigation.navigate("Details", { id: item.id, login: item.login, password: item.password, data: item.registered })} login={item.login} />
                    )}
                />
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    text: { fontSize: 48, },
    style1: {

        flex: 2,
        display: "flex",
        flexDirection: 'column',
    }
});

export default Screen2;